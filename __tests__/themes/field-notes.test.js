import {
  parseMultiLang,
  parsePhotoSummary,
  formatNotionDate,
  getLocalizedBlogPosts,
  createTranslator,
  parseNotionWorkProject,
  extractNoteLines
} from '@/themes/field-notes/data'
import { generateStructuredData, pickPrimaryLanguage } from '@/components/SEO'
import { labSchedule, formatClock } from '@/themes/field-notes/components/LabFigure'

describe('Field Notes Theme Validations & Bug Fixes', () => {
  describe('parseMultiLang & parsePhotoSummary', () => {
    test('does not truncate emails or mentions containing @', () => {
      const email = 'contact@example.com'
      expect(parseMultiLang(email, 'zh')).toBe('contact@example.com')
      expect(parseMultiLang(email, 'en')).toBe('contact@example.com')

      const handle = '@username in text'
      expect(parseMultiLang(handle, 'zh')).toBe('@username in text')

      const triLang = '你好 @author || Hello @author || こんにちは @author'
      expect(parseMultiLang(triLang, 'zh')).toBe('你好 @author')
      expect(parseMultiLang(triLang, 'en')).toBe('Hello @author')
      expect(parseMultiLang(triLang, 'ja')).toBe('こんにちは @author')
    })

    test('correctly parses structured 3-part photo summary', () => {
      const photoMeta = '东京 · 新宿 || Tokyo · Shinjuku || 東京 · 新宿 @ 33mm f/2.8 @ 秋雨 || Autumn Rain || 秋の雨'
      const parsedZh = parsePhotoSummary(photoMeta, 'zh')
      expect(parsedZh.place).toBe('东京 · 新宿')
      expect(parsedZh.settings).toBe('33mm f/2.8')
      expect(parsedZh.description).toBe('秋雨')

      const parsedEn = parsePhotoSummary(photoMeta, 'en')
      expect(parsedEn.place).toBe('Tokyo · Shinjuku')
      expect(parsedEn.description).toBe('Autumn Rain')

      const parsedJa = parsePhotoSummary(photoMeta, 'ja')
      expect(parsedJa.place).toBe('東京 · 新宿')
      expect(parsedJa.description).toBe('秋の雨')
    })
  })

  describe('formatNotionDate deterministic timezone formatting', () => {
    test('produces identical UTC date string regardless of server locale timezone', () => {
      // 2024-10-31 23:30:00 UTC (which would be Nov 1 in Tokyo)
      const post = { publishDate: 1730417400000 }
      const formatted = formatNotionDate(post)
      expect(formatted).toBe('2024.10.31')
    })
  })

  describe('getLocalizedBlogPosts without slug collapse and with stable sort', () => {
    test('preserves articles with empty or missing slug without collapsing them into one', () => {
      const posts = [
        { id: 'post-1', title: 'Post 1', slug: '', date: { start_date: '2024-10-01' } },
        { id: 'post-2', title: 'Post 2', slug: '', date: { start_date: '2024-10-01' } },
        { id: 'post-3', title: 'Post 3', slug: 'unique-slug', date: { start_date: '2024-10-02' } }
      ]

      const localized = getLocalizedBlogPosts(posts, 'zh')
      expect(localized.length).toBe(3)
      const ids = localized.map(p => p.id)
      expect(ids).toContain('post-1')
      expect(ids).toContain('post-2')
      expect(ids).toContain('post-3')
    })

    test('sorts stably when dates are identical', () => {
      const posts = [
        { id: 'b', title: 'B', slug: 'slug-b', date: { start_date: '2024-10-01' } },
        { id: 'a', title: 'A', slug: 'slug-a', date: { start_date: '2024-10-01' } }
      ]
      const sorted = getLocalizedBlogPosts(posts, 'zh')
      expect(sorted[0].id).toBe('b')
      expect(sorted[1].id).toBe('a')
    })
  })

  describe('SEO structured data & cover image safety', () => {
    test('escapes < in JSON-LD structured data', () => {
      const meta = {
        title: 'Article with </script><script>alert(1)</script>',
        description: 'Testing <tag> escaping',
        type: 'Post'
      }
      const data = generateStructuredData(meta, {}, 'https://example.com/p', '', 'Author', 'https://example.com')
      const json = JSON.stringify(data).replace(/</g, '\\u003c')
      expect(json).not.toContain('</script>')
      expect(json).toContain('\\u003c/script>')
    })
  })

  describe('SSR work project labels', () => {
    const page = {
      id: 'p1',
      title: '01 / R2FileBox',
      slug: 'https://github.com/example/r2filebox'
    }

    test('createTranslator resolves copy with zh fallback', () => {
      expect(createTranslator('en')('viewCode')).toBe('View on GitHub')
      expect(createTranslator('zh')('viewCode')).toBe('去 GitHub 看看')
      expect(createTranslator('xx')('viewCode')).toBe('去 GitHub 看看')
      expect(createTranslator('en')('no-such-key')).toBe('no-such-key')
    })

    test('parseNotionWorkProject with translator never leaks raw keys', () => {
      for (const lang of ['zh', 'en', 'ja']) {
        const parsed = parseNotionWorkProject(page, lang, createTranslator(lang))
        expect(parsed.linkLabel).not.toBe('viewCode')
        expect(parsed.linkLabel).toBe(createTranslator(lang)('viewCode'))
        expect(parsed.screens[0]).not.toBe('screenPreview')
      }
    })
  })

  describe('pickPrimaryLanguage for crawler-facing meta', () => {
    test('keeps the first language of inline multilingual text', () => {
      expect(
        pickPrimaryLanguage('Nas折腾合集 || Building Around a Home NAS || NAS を中心に')
      ).toBe('Nas折腾合集')
    })

    test('reduces each segment of a structured photo summary', () => {
      expect(
        pickPrimaryLanguage(
          '东京 · 新宿 || Tokyo · Shinjuku || 東京 · 新宿 @ 33mm f/2.8 @ 秋雨 || Autumn Rain || 秋の雨'
        )
      ).toBe('东京 · 新宿 · 33mm f/2.8 · 秋雨')
    })

    test('leaves plain text, emails and empty values untouched', () => {
      expect(pickPrimaryLanguage('Plain title')).toBe('Plain title')
      expect(pickPrimaryLanguage('mail me @ a@b.com')).toBe('mail me @ a@b.com')
      expect(pickPrimaryLanguage(undefined)).toBeUndefined()
      expect(pickPrimaryLanguage('')).toBe('')
    })
  })

  describe('labSchedule on the Tokyo day', () => {
    const at = (h, m, sec = 0) => h * 3600 + m * 60 + sec

    test('counts down to the next job to the second', () => {
      const s = labSchedule(at(18, 36, 1))
      expect(s.busy).toBeNull()
      expect(s.next.id).toBe('trend')
      expect(s.next.at).toBe('20:00')
      expect(formatClock(s.left)).toBe('01:23:59')
    })

    test('reports the job in progress and what it lights up', () => {
      const s = labSchedule(at(16, 40, 5))
      expect(s.busy.id).toBe('health')
      expect(formatClock(s.elapsed)).toBe('00:10:05')
      expect(s.links.has('tailscale')).toBe(true)
      expect(s.nodes.has('muse')).toBe(true)
    })

    test('heartbeat every 10 minutes and photo sync on the hour', () => {
      const s = labSchedule(at(13, 0, 30))
      expect(s.links.has('tunnel')).toBe(true)
      expect(s.links.has('photo')).toBe(true)
      const later = labSchedule(at(13, 7, 0))
      expect(later.links.has('tunnel')).toBe(false)
      expect(later.beatLeft).toBe(180)
      expect(later.photoLeft).toBe(53 * 60)
    })

    test('wraps to tomorrow morning after the last job', () => {
      const s = labSchedule(at(23, 0))
      expect(s.next.id).toBe('snapshot')
      expect(formatClock(s.left)).toBe('04:00:00')
    })
  })

  describe('extractNoteLines for the back of a photo', () => {
    const blockMap = {
      block: {
        p1: { value: { id: 'p1', type: 'page', content: ['t1', 'img', 't2'] } },
        t1: { value: { id: 't1', type: 'text', properties: { title: [['Blue sky, red shrine.']] } } },
        img: { value: { id: 'img', type: 'image', properties: { title: [['ignored']] } } },
        t2: { value: { id: 't2', type: 'bulleted_list', properties: { title: [['Place: Shizuoka']] }, content: ['t3'] } },
        t3: { value: { id: 't3', type: 'text', properties: { title: [['nested line']] } } }
      }
    }
    test('keeps text blocks in order, flattens children and skips media', () => {
      expect(extractNoteLines(blockMap, 'p1', 'en')).toEqual([
        { type: 'text', text: 'Blue sky, red shrine.' },
        { type: 'bulleted_list', text: 'Place: Shizuoka' },
        { type: 'text', text: 'nested line' }
      ])
    })
  })
})
