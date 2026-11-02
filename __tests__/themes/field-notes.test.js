import {
  parseMultiLang,
  parsePhotoSummary,
  formatNotionDate,
  getLocalizedBlogPosts
} from '@/themes/field-notes/data'
import { generateStructuredData } from '@/components/SEO'

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
})
