import { isMalformedSearchPath, shouldNoIndexPath } from '@/lib/search-index-policy'

describe('search indexing policy', () => {
  test.each(['/', '/about', '/archive', '/tag/建站', '/article/dev1', '/article/live2'])('keeps public content indexable: %s', path => {
    expect(shouldNoIndexPath(path)).toBe(false)
  })
  test.each(['/links', '/search?q=hello', '/rss/feed.xml', '/sign-in', '/api/user', '/dashboard/a', '/article/example-9', '/article/example-10/', '/article/1a11766b-a90a-8108-9a14-f61243f05d0a', '/1a11766ba90a81089a14f61243f05d0a'])('excludes templates and service pages: %s', path => {
    expect(shouldNoIndexPath(path)).toBe(true)
    expect(isMalformedSearchPath(path)).toBe(false)
  })
  test.each(['/https:/vedio.mingzhe.uk/', '/https://me.mingzhe.uk/about', '/[prefix]/[slug]', '/%5Bprefix%5D/%5Bslug%5D'])('recognizes invalid historical URLs: %s', path => {
    expect(isMalformedSearchPath(path)).toBe(true)
    expect(shouldNoIndexPath(path)).toBe(true)
  })
})
