import { createFeed, createFeedFileUrl, createFeedItemUrl } from '@/lib/utils/rss'
import { getPostBlocks } from '@/lib/db/SiteDataApi'
import ReactDOMServer from 'react-dom/server'

const addItemMock = jest.fn()
const rss2Mock = jest.fn(() => '<rss>ok</rss>')
const atom1Mock = jest.fn(() => '<atom>ok</atom>')
const json1Mock = jest.fn(() => '{"ok":true}')
const feedCtorMock = jest.fn()

jest.mock('feed', () => ({
  Feed: jest.fn().mockImplementation(options => {
    feedCtorMock(options)
    return {
      addItem: addItemMock,
      rss2: rss2Mock,
      atom1: atom1Mock,
      json1: json1Mock
    }
  })
}))

jest.mock('react-dom/server', () => ({
  __esModule: true,
  default: {
    renderToString: jest.fn(() => '<div>rss-content</div>')
  }
}))

jest.mock('@/components/NotionPage', () => ({
  __esModule: true,
  default: () => null
}))

jest.mock('@/lib/db/SiteDataApi', () => ({
  getPostBlocks: jest.fn(() => Promise.resolve(null))
}))

jest.mock('@/lib/db/notion/getPostBlocks', () => ({
  formatNotionBlock: jest.fn(block => block)
}))

jest.mock('@/lib/utils/notion.util', () => ({
  adapterNotionBlockMap: jest.fn(blockMap => blockMap)
}))

jest.mock('@/lib/plugins/mailEncrypt', () => ({
  decryptEmail: jest.fn(() => 'a@example.com')
}))

const siteInfo = {
  title: 'Demo Site',
  description: 'Demo description',
  link: 'https://example.com/'
}

const NOTION_CONFIG = {
  AUTHOR: 'Tester',
  LANG: 'zh-CN',
  CONTACT_EMAIL: 'a@example.com'
}

describe('createFeedFileUrl', () => {
  it('never produces double slashes', () => {
    expect(createFeedFileUrl('https://example.com/', '', 'rss/feed.xml')).toBe(
      'https://example.com/rss/feed.xml'
    )
    expect(
      createFeedFileUrl('https://example.com', 'blog', 'rss/feed.xml')
    ).toBe('https://example.com/blog/rss/feed.xml')
    expect(
      createFeedFileUrl('https://example.com/', '/blog/', 'rss/feed.xml')
    ).toBe('https://example.com/blog/rss/feed.xml')
  })

  it('returns the site root when no file is given', () => {
    expect(createFeedFileUrl('https://example.com/', '')).toBe(
      'https://example.com'
    )
    expect(createFeedFileUrl('https://example.com/', 'blog', '')).toBe(
      'https://example.com/blog'
    )
  })
})

describe('createFeed', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders article content so fallback feeds are not title-only', async () => {
    await createFeed({
      siteInfo,
      NOTION_CONFIG,
      posts: [
        {
          id: 'post-1',
          title: 'Hello',
          slug: 'hello',
          summary: 'summary text',
          publishDay: '2024-01-02'
        }
      ],
      allPages: [],
      subPath: '',
      renderContent: post => Promise.resolve(`<p>${post.summary}</p>`)
    })

    expect(addItemMock).toHaveBeenCalledTimes(1)
    expect(addItemMock.mock.calls[0][0]).toMatchObject({
      title: 'Hello',
      link: 'https://example.com/hello',
      description: 'summary text',
      content: '<p>summary text</p>'
    })
  })

  it('falls back to publishDate when publishDay is missing', async () => {
    await createFeed({
      siteInfo,
      NOTION_CONFIG,
      posts: [
        {
          id: 'post-2',
          title: 'Dated',
          slug: 'dated',
          summary: 's',
          publishDate: '2023-05-06'
        }
      ],
      allPages: [],
      renderContent: () => Promise.resolve('content')
    })

    expect(addItemMock.mock.calls[0][0].date).toEqual(new Date('2023-05-06'))
  })

  it('declares a feed id and a slash-safe site link', async () => {
    await createFeed({
      siteInfo,
      NOTION_CONFIG,
      posts: [],
      allPages: [],
      subPath: 'blog'
    })

    expect(feedCtorMock).toHaveBeenCalledTimes(1)
    expect(feedCtorMock.mock.calls[0][0]).toMatchObject({
      id: 'https://example.com/blog/rss/feed.xml',
      link: 'https://example.com/blog',
      title: 'Demo Site',
      language: 'zh-CN'
    })
  })
})

describe('createFeed with field-notes multilingual posts', () => {
  const FIELD_NOTES_CONFIG = { ...NOTION_CONFIG, THEME: 'field-notes' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('keeps only the site language of inline trilingual titles and summaries', async () => {
    await createFeed({
      siteInfo,
      NOTION_CONFIG: FIELD_NOTES_CONFIG,
      posts: [
        {
          id: 'dev3',
          title: 'Nas折腾合集 || Building Around a Home NAS || NAS を中心に',
          slug: 'article/dev3',
          category: '家庭架构',
          summary: '从手搓一台家庭服务器开始。 || Starting from a home server. || 自宅サーバーから。',
          publishDay: '2025-01-02'
        },
        {
          id: 'photo-sengen',
          title: '蓝天下的一抹朱红 || A Dash of Vermilion || 青空に、ひとさじの朱色',
          slug: 'article/photo-sengen',
          category: '拍的照片',
          summary: '静冈·浅间大社 || Shizuoka · Sengen Taisha || 静岡・浅間大社 @ 33mm · f/2.5 · 1/10500s · ISO 640',
          publishDay: '2025-01-03'
        }
      ],
      allPages: [],
      renderContent: () => Promise.resolve('content')
    })

    expect(addItemMock.mock.calls[0][0]).toMatchObject({
      title: 'Nas折腾合集',
      description: '从手搓一台家庭服务器开始。'
    })
    expect(addItemMock.mock.calls[1][0]).toMatchObject({
      title: '蓝天下的一抹朱红',
      description: '静冈·浅间大社 · 33mm · f/2.5 · 1/10500s · ISO 640'
    })
  })

  it('renders only the site language section of the body', async () => {
    getPostBlocks.mockResolvedValueOnce({
      block: {
        p1: { value: { id: 'p1', type: 'page', content: ['tz', 'te'] } },
        tz: { value: { id: 'tz', type: 'toggle', properties: { title: [['[ZH]']] }, content: ['pz'] } },
        pz: { value: { id: 'pz', type: 'text', properties: { title: [['中文正文']] } } },
        te: { value: { id: 'te', type: 'toggle', properties: { title: [['[EN]']] }, content: ['pe'] } },
        pe: { value: { id: 'pe', type: 'text', properties: { title: [['English body']] } } }
      }
    })

    const sourcePost = { id: 'p1', title: '中文 || English', slug: 'p1', summary: 's' }
    await createFeed({
      siteInfo,
      NOTION_CONFIG: FIELD_NOTES_CONFIG,
      posts: [sourcePost],
      allPages: []
    })

    const renderedPost =
      ReactDOMServer.renderToString.mock.calls[0][0].props.post
    expect(renderedPost.blockMap.block.p1.value.content).toEqual(['pz'])
    expect(addItemMock.mock.calls[0][0].title).toBe('中文')
    expect(sourcePost.blockMap).toBeUndefined()
  })

  it('leaves posts untouched for other themes', async () => {
    await createFeed({
      siteInfo,
      NOTION_CONFIG: { ...NOTION_CONFIG, THEME: 'simple' },
      posts: [{ id: 'x', title: 'A || B', slug: 'x', summary: 'a || b' }],
      allPages: [],
      renderContent: () => Promise.resolve('content')
    })

    expect(addItemMock.mock.calls[0][0]).toMatchObject({
      title: 'A || B',
      description: 'a || b'
    })
  })

  it('preserves external URL slugs, normalizes leading slashes, and skips password/noindex items', async () => {
    expect(
      createFeedItemUrl('https://me.mingzhe.uk/', '', {
        slug: 'https://github.com/MeiTetsuH/R2FileBox'
      })
    ).toBe('https://github.com/MeiTetsuH/R2FileBox')

    expect(
      createFeedItemUrl('https://me.mingzhe.uk/', '', {
        slug: '/article/dev5'
      })
    ).toBe('https://me.mingzhe.uk/article/dev5')

    expect(
      createFeedItemUrl('https://me.mingzhe.uk/', '', {
        slug: 'article/example-9'
      })
    ).toBe('')

    await createFeed({
      siteInfo: { ...siteInfo, link: 'https://me.mingzhe.uk/' },
      NOTION_CONFIG: FIELD_NOTES_CONFIG,
      posts: [
        {
          id: 'ext-1',
          title: 'R2FileBox',
          slug: 'https://github.com/MeiTetsuH/R2FileBox',
          summary: 'External project',
          publishDay: '2025-02-01'
        },
        {
          id: 'secret-1',
          title: 'Locked',
          slug: 'article/secret',
          password: '123',
          summary: 'Hidden',
          publishDay: '2025-02-02'
        },
        {
          id: 'noindex-1',
          title: 'Template post',
          slug: 'article/example-9',
          summary: 'Template',
          publishDay: '2025-02-03'
        }
      ],
      allPages: [],
      renderContent: () => Promise.resolve('content')
    })

    expect(addItemMock).toHaveBeenCalledTimes(1)
    expect(addItemMock.mock.calls[0][0]).toMatchObject({
      title: 'R2FileBox',
      link: 'https://github.com/MeiTetsuH/R2FileBox'
    })
  })
})
