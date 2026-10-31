import { getPublicPostBlockMap } from '@/lib/utils/publicPost'
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import {
  cleanPostSummaries,
  fetchGlobalAllData,
  getPostBlocks
} from '@/lib/db/SiteDataApi'
import { formatNotionBlock } from '@/lib/db/notion/getPostBlocks'
import { generateRobotsTxt } from '@/lib/utils/robots.txt'
import { generateRss, shouldGenerateRssForLocale } from '@/lib/utils/rss'
import { generateSitemapXml } from '@/lib/utils/sitemap.xml'
import { DynamicLayout } from '@/themes/theme'
import { generateRedirectJson } from '@/lib/utils/redirect'
import { checkDataFromAlgolia } from '@/lib/plugins/algolia'
import pLimit from 'p-limit'
import { adapterNotionBlockMap } from '@/lib/utils/notion.util'

/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const Index = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutIndex' {...props} />
}

/**
 * SSG 获取数据
 * @returns
 */
export async function getStaticProps(req) {
  const { locale } = req
  const from = 'index'
  const props = await fetchGlobalAllData({ from, locale })
  if (process.env.NODE_ENV === 'development') {
    const configTheme = BLOG.THEME
    const notionTheme = props?.NOTION_CONFIG?.THEME || null
    const finalTheme = siteConfig('THEME', BLOG.THEME, props?.NOTION_CONFIG)
    const source = notionTheme ? 'notion:config' : 'blog/env:config'
    console.log(
      '[ThemeResolver][server-static-props]',
      JSON.stringify({
        route: '/',
        configTheme,
        notionTheme,
        finalTheme,
        source
      })
    )
  }
  const POST_PREVIEW_LINES = siteConfig(
    'POST_PREVIEW_LINES',
    8,
    props?.NOTION_CONFIG
  )
  const POST_PREVIEW_MAX_COUNT = siteConfig(
    'POST_PREVIEW_MAX_COUNT',
    4,
    props?.NOTION_CONFIG
  )
  const POST_LIST_PREVIEW = siteConfig(
    'POST_LIST_PREVIEW',
    false,
    props?.NOTION_CONFIG
  )
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )

  // 处理分页（field-notes 为单页多板块布局，需要完整文章/项目/相册列表）
  const activeTheme = siteConfig('THEME', BLOG.THEME, props?.NOTION_CONFIG)
  const POST_LIST_STYLE = siteConfig(
    'POST_LIST_STYLE',
    'page',
    props?.NOTION_CONFIG
  )
  if (POST_LIST_STYLE === 'scroll' || activeTheme === 'field-notes') {
    // 滚动列表或 field-notes 主题默认给前端返回所有已发布数据
  } else if (POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(
      0,
      siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
    )
  }

  // 预览文章内容
  if (POST_LIST_PREVIEW) {
    const previewLimit = pLimit(
      siteConfig('POST_PREVIEW_CONCURRENCY', 5, props?.NOTION_CONFIG)
    )
    const previewTargets = props.posts.filter(
      post => !post.password || post.password === ''
    ).slice(0, POST_PREVIEW_MAX_COUNT)
    await Promise.all(
      previewTargets.map(post =>
        previewLimit(async () => {
          const rawBlockMap = await getPostBlocks(post.id, 'slug', POST_PREVIEW_LINES)
          post.blockMap = getPublicPostBlockMap(post, adapterNotionBlockMap(rawBlockMap), props.allPages)
          if (post.blockMap?.block) {
            post.blockMap.block = formatNotionBlock(post.blockMap.block)
          }
        })
      )
    )
  }
  // Prefetch Notion blocks for `field-notes` project showcase items (category/tag = 做的东西 / project)
  if (siteConfig('THEME', BLOG.THEME, props?.NOTION_CONFIG) === 'field-notes') {
    const workKeywords = new Set(['做的东西', 'project', 'projects', '项目', '开源项目'])
    const workCandidates = (props.allPages || []).filter(page => {
      if (page?.type !== 'Post' || page?.status !== 'Published') return false
      if (page?.password && page.password !== '') return false
      const cat = String(page?.category || '').trim().toLowerCase()
      if (workKeywords.has(cat)) return true
      const rawTags = Array.isArray(page?.tags)
        ? page.tags
        : Array.isArray(page?.tagItems)
        ? page.tagItems
        : []
      return rawTags.some(t =>
        workKeywords.has(
          typeof t === 'string' ? t.trim().toLowerCase() : String(t?.name || '').trim().toLowerCase()
        )
      )
    })

    if (workCandidates.length > 0) {
      const workLimit = pLimit(5)
      props.workProjectPages = await Promise.all(
        workCandidates.map(page =>
          workLimit(async () => {
            const cloned = { ...page }
            const rawBlockMap = await getPostBlocks(cloned.id, 'field-notes-work')
            cloned.blockMap = getPublicPostBlockMap(
              cloned,
              adapterNotionBlockMap(rawBlockMap),
              props.allPages
            )
            if (cloned.blockMap?.block) {
              cloned.blockMap.block = formatNotionBlock(cloned.blockMap.block)
            }
            return cloned
          })
        )
      )
    } else {
      props.workProjectPages = []
    }
  }

  const isBuildLifecycle = ['build', 'export'].includes(
    process.env.npm_lifecycle_event
  )
  if (isBuildLifecycle) {
    // 生成robotTxt
    generateRobotsTxt(props)
    // 生成Feed订阅
    if (shouldGenerateRssForLocale({ locale })) {
      await generateRss(props)
    }
    // 生成
    generateSitemapXml(props)
    // 检查数据是否需要从algolia删除
    await checkDataFromAlgolia(props)
    if (siteConfig('UUID_REDIRECT', false, props?.NOTION_CONFIG)) {
      // 生成重定向 JSON
      generateRedirectJson(props)
    }
  }

  // 生成全文索引 - 仅在 yarn build 时执行 && process.env.npm_lifecycle_event === 'build'

  if (!POST_LIST_PREVIEW) {
    props.posts = cleanPostSummaries(props.posts)
  }
  props.latestPosts = cleanPostSummaries(props.latestPosts)
  delete props.allPages

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export default Index
