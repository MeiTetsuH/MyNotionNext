import { mapImgUrl } from '@/lib/db/notion/mapImage'
import { translations, edgeCopy, transitCopy } from './components/translations'
import { projects, photos as rawPhotos, heroPhotos, photoOrder } from './components/constants'

export {
  translations,
  edgeCopy,
  transitCopy,
  projects,
  heroPhotos,
  rawPhotos,
  photoOrder
}

/**
 * 解析 "中文 || English || 日本語" 格式的多语言文本
 */
export function parseMultiLang(str, lang = 'zh') {
  if (!str) return ''
  const raw = String(str)
  // 若包含 '@'，说明是照片的复合 summary: "地点(可三语) @ 参数 @ 描述(可三语)"
  if (raw.includes('@')) {
    const segments = raw.split('@').map(s => s.trim())
    // 优先提取描述（第三段），无描述时回退地点（第一段）
    if (segments.length >= 3 && segments[2]) {
      return parseMultiLang(segments[2], lang)
    }
    return parseMultiLang(segments[0] || '', lang)
  }
  const parts = raw.split('||').map(s => s.trim())
  if (parts.length === 1) return parts[0]
  if (lang === 'en') return parts[1] || parts[0]
  if (lang === 'ja') return parts[2] || parts[1] || parts[0]
  return parts[0]
}

/**
 * 结构化解析照片专用 summary："地点(可三语) @ 参数 @ 描述(可三语)"
 */
export function parsePhotoSummary(str, lang = 'zh') {
  if (!str) return { place: '', settings: '', description: '' }
  const raw = String(str).trim()
  if (!raw.includes('@')) {
    return {
      place: '',
      settings: '',
      description: parseMultiLang(raw, lang)
    }
  }
  const segments = raw.split('@').map(s => s.trim())
  const place = parseMultiLang(segments[0] || '', lang)
  const settings = segments[1] || ''
  const description = parseMultiLang(segments[2] || '', lang)
  return { place, settings, description }
}

const CATEGORY_I18N = {
  家庭架构: { zh: '家庭架构', en: 'Home Lab', ja: 'ホームラボ' },
  技术分享: { zh: '技术分享', en: 'Tech Notes', ja: '技術メモ' },
  生活: { zh: '生活', en: 'Life', ja: '暮らし' },
  随便聊聊: { zh: '随便聊聊', en: 'Casual', ja: '雑記' },
  做的东西: { zh: '做的东西', en: 'Projects', ja: 'つくったもの' },
  拍的照片: { zh: '拍的照片', en: 'Photos', ja: '写真' },
  随笔: { zh: '随笔', en: 'Notes', ja: 'ノート' }
}

const TAG_I18N = {
  推荐: { zh: '推荐', en: 'Featured', ja: 'おすすめ' },
  文字: { zh: '文字', en: 'Writing', ja: '文章' },
  思考: { zh: '思考', en: 'Thoughts', ja: '思考' },
  新闻: { zh: '新闻', en: 'News', ja: 'ニュース' },
  工具: { zh: '工具', en: 'Tools', ja: 'ツール' },
  开发: { zh: '开发', en: 'Dev', ja: '開発' },
  建站: { zh: '建站', en: 'Web', ja: 'サイト構築' },
  旅游: { zh: '旅游', en: 'Travel', ja: '旅' },
  自然: { zh: '自然', en: 'Nature', ja: '自然' },
  光与日常: { zh: '光与日常', en: 'Light & life', ja: '光と日常' }
}

export function localizeCategory(rawCat, lang = 'zh') {
  if (!rawCat) return ''
  const str = String(rawCat).trim()
  if (str.includes('||')) return parseMultiLang(str, lang)
  return CATEGORY_I18N[str]?.[lang] || str
}

export function localizeTag(rawTag, lang = 'zh') {
  if (!rawTag) return ''
  const str = typeof rawTag === 'string' ? rawTag.trim() : String(rawTag?.name || '').trim()
  if (!str) return ''
  if (str.includes('||')) return parseMultiLang(str, lang)
  return TAG_I18N[str]?.[lang] || str
}

// 系统控制类标签（不在文章卡片上作为普通视觉标签展示）
const SYSTEM_TAGS = new Set([
  'zh', 'en', 'ja',
  'homelab', 'home-lab', '家庭架构', '家庭实验室',
  'photo', 'photos', '拍的照片', '摄影',
  'project', 'projects', '做的东西', '开源项目'
])

export function filterDisplayTags(tags = []) {
  return (tags || []).filter(t => {
    const val = typeof t === 'string' ? t.trim().toLowerCase() : String(t?.name || '').trim().toLowerCase()
    return !SYSTEM_TAGS.has(val)
  })
}

/**
 * 核心四路分流器：根据 Notion 的 category 或 tags 决定该内容去哪个板块
 * 返回值: 'photo' | 'homelab' | 'work' | 'notes'
 */
export function getPostSection(post) {
  const cat = String(post?.category || '').trim().toLowerCase()
  const rawTags = Array.isArray(post?.tags)
    ? post.tags
    : Array.isArray(post?.tagItems)
    ? post.tagItems
    : []
  const tags = rawTags.map(t => {
    if (typeof t === 'string') return t.trim().toLowerCase()
    return String(t?.name || '').trim().toLowerCase()
  })

  // 1. 左侧拍立得挂绳
  if (
    ['拍的照片', 'photo', 'photos', '摄影'].includes(cat) ||
    tags.some(t => ['拍的照片', 'photo', 'photos', '摄影'].includes(t))
  ) {
    return 'photo'
  }

  // 2. 01 / 家庭架构 (HOME LAB / 2026)
  const titleLower = String(post?.title || '').toLowerCase()
  if (
    ['homelab', 'home-lab', '家庭架构', '家庭实验室'].includes(cat) ||
    tags.some(t => ['homelab', 'home-lab', '家庭架构', '家庭实验室', 'nas'].includes(t)) ||
    titleLower.includes('homelab') ||
    titleLower.includes('nas折腾')
  ) {
    return 'homelab'
  }

  // 3. 03 / 做的东西 (Projects)
  if (
    ['做的东西', 'project', 'projects', '项目', '开源项目'].includes(cat) ||
    tags.some(t => ['做的东西', 'project', 'projects', '项目', '开源项目'].includes(t))
  ) {
    return 'work'
  }

  // 4. 02 / 随笔笔记 (旅游、生活等日常文章)
  return 'notes'
}

export function formatNotionDate(post) {
  let raw = post?.date?.start_date || post?.publishDay || ''
  if (!raw && post?.publishDate) {
    const d = new Date(post.publishDate)
    if (!Number.isNaN(d.getTime())) {
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
    }
  }
  if (!raw) return ''
  const parts = String(raw).trim().split(/[-./]/)
  if (parts.length >= 3) {
    return `${parts[0]}.${String(parts[1]).padStart(2, '0')}.${String(parts[2]).slice(0, 2).padStart(2, '0')}`
  }
  return String(raw).replace(/-/g, '.')
}

const LOCAL_PHOTO_BY_FILE = new Map(
  photoOrder.map((rawId, orderIdx) => [
    rawPhotos[rawId].file,
    { rawId, orderIdx, meta: rawPhotos[rawId] }
  ])
)

/**
 * 构建完整拍立得照片列表（Notion 优先驱动，无照片时回退本地 17 张照片）
 */
export function getCombinedPhotos(allPages = [], lang = 'zh') {
  const t = key => translations[lang]?.[key] || translations.zh?.[key] || ''

  const notionPhotoPages = (allPages || []).filter(p => getPostSection(p) === 'photo')

  const notionPhotos = notionPhotoPages
    .map((p, idx) => {
      // summary 格式约定: "地点(可三语) @ 参数 @ 描述(可三语)"
      const {
        place: placeText,
        settings: settingsTextRaw,
        description: descText
      } = parsePhotoSummary(p.summary, lang)
      const settingsText = settingsTextRaw || '33mm'
      const formattedDate = formatNotionDate(p)
      const titleText = parseMultiLang(p.title, lang)

      const slugStr = String(p.slug || '').trim()
      const cleanSlug = slugStr.replace(/^\/?(?:en\/|ja\/)?(?:article\/)?/i, '')
      const fileSlug = cleanSlug.startsWith('photo-') ? cleanSlug.slice(6) : ''
      const matchedLocal = fileSlug ? LOCAL_PHOTO_BY_FILE.get(fileSlug) : null

      const rawCover = String(p.pageCover || p.pageCoverThumbnail || '')
      let decodedCover = rawCover
      try {
        decodedCover = decodeURIComponent(rawCover)
      } catch {}
      const usesCanonicalAsset =
        matchedLocal &&
        (!rawCover ||
          decodedCover.includes(`/assets/${matchedLocal.meta.file}.jpg`))

      const thumbSrc = usesCanonicalAsset
        ? `/themes/field-notes/assets/${matchedLocal.meta.file}-small.jpg`
        : p.pageCoverThumbnail || p.pageCover
      const fullSrc = usesCanonicalAsset
        ? `/themes/field-notes/assets/${matchedLocal.meta.file}.jpg`
        : p.pageCover || p.pageCoverThumbnail
      const altText = matchedLocal
        ? t(`photoAlt${matchedLocal.rawId}`) || titleText
        : titleText

      return {
        key: `notion-${p.id || cleanSlug || idx}`,
        isNotion: true,
        orderHint: matchedLocal ? matchedLocal.orderIdx : 900 + idx,
        thumbSrc,
        fullSrc,
        title: titleText,
        alt: altText,
        place: placeText,
        date: formattedDate || (matchedLocal ? matchedLocal.meta.date : ''),
        camera: matchedLocal ? matchedLocal.meta.camera : 'FUJIFILM X-S20',
        settings: settingsText,
        description: descText,
        slug: p.slug,
        href: p.href || (cleanSlug ? `/article/${cleanSlug}` : '')
      }
    })
    .filter(p => Boolean(p.fullSrc))

  if (notionPhotos.length > 0) {
    return notionPhotos.sort((a, b) => {
      if (a.date && b.date && a.date !== b.date) {
        return a.date < b.date ? -1 : 1
      }
      return (a.orderHint ?? 999) - (b.orderHint ?? 999)
    })
  }

  return photoOrder.map(id => {
    const p = rawPhotos[id]
    return {
      key: `local-${id}`,
      isNotion: false,
      thumbSrc: `/themes/field-notes/assets/${p.file}-small.jpg`,
      fullSrc: `/themes/field-notes/assets/${p.file}.jpg`,
      title: t(`photoTitle${id}`),
      alt: t(`photoAlt${id}`),
      place: t(p.place),
      date: p.date,
      camera: p.camera,
      settings: p.settings,
      description: p.description ? t(p.description) : ''
    }
  })
}

/**
 * 提取所有非照片类的 Notion 文章，支持多语言自动配对 (-en / -ja 或 || 内联)
 * 并附带 section 属性 ('homelab' | 'work' | 'notes')
 */
export function getLocalizedBlogPosts(allPages = [], lang = 'zh') {
  const rawPosts = (allPages || []).filter(p => getPostSection(p) !== 'photo')

  const detectPostLang = post => {
    const slug = String(post?.slug || '').toLowerCase()
    const rawTags = Array.isArray(post?.tags)
      ? post.tags
      : Array.isArray(post?.tagItems)
      ? post.tagItems
      : []
    const tags = rawTags.map(t => (typeof t === 'string' ? t.toLowerCase() : String(t?.name || '').toLowerCase()))
    if (slug.endsWith('-en') || slug.startsWith('en/') || tags.includes('en')) return 'en'
    if (slug.endsWith('-ja') || slug.startsWith('ja/') || tags.includes('ja')) return 'ja'
    return 'zh'
  }

  const getBaseSlug = post => {
    return String(post?.slug || '')
      .replace(/-(en|ja)$/i, '')
      .replace(/^(en|ja)\//i, '')
  }

  const groups = new Map()
  for (const post of rawPosts) {
    const base = getBaseSlug(post)
    const pLang = detectPostLang(post)
    if (!groups.has(base)) groups.set(base, {})
    groups.get(base)[pLang] = post
  }

  const result = []
  for (const [, variants] of groups.entries()) {
    const chosen = variants[lang] || variants.zh || variants.en || variants.ja
    if (!chosen) continue
    // 如果中文主文章打了 homelab 标签，确保英/日文变体也继承相同的板块归属
    const primaryRef = variants.zh || chosen
    const section = getPostSection(primaryRef)

    const formattedDate = formatNotionDate(chosen)
    const [year = '2026', month = '01', day = '01'] = formattedDate.split('.')

    result.push({
      ...chosen,
      section,
      baseSlug: getBaseSlug(chosen),
      displayTags: filterDisplayTags(chosen.tags || chosen.tagItems),
      localizedTitle: parseMultiLang(chosen.title, lang),
      localizedSummary: parseMultiLang(chosen.summary, lang),
      localizedCategory: localizeCategory(chosen.category || '随笔', lang),
      formattedDate,
      year,
      monthDay: `${month}.${day}`,
      variants
    })
  }

  return result.sort((a, b) => (b.formattedDate > a.formattedDate ? 1 : -1))
}

const normalizeNotionId = id => String(id || '').replace(/-/g, '').toLowerCase()

/**
 * Extract plain text from a Notion block property (e.g. 'title' or 'caption')
 */
export function getBlockPlainText(blockVal, propName = 'title') {
  const prop = blockVal?.properties?.[propName]
  if (!Array.isArray(prop)) return ''
  return prop.map(seg => (Array.isArray(seg) ? String(seg[0] || '') : '')).join('')
}

/**
 * Extract the first rich-text anchor { url, label } from a Notion block property
 */
function extractRichTextLink(blockVal, propName = 'title') {
  const prop = blockVal?.properties?.[propName]
  if (!Array.isArray(prop)) return null
  for (const seg of prop) {
    if (!Array.isArray(seg)) continue
    const label = String(seg[0] || '').trim()
    const formats = Array.isArray(seg[1]) ? seg[1] : []
    for (const fmt of formats) {
      if (Array.isArray(fmt) && fmt[0] === 'a' && fmt[1]) {
        return { url: String(fmt[1]).trim(), label }
      }
    }
  }
  return null
}

/**
 * Detect explicit language section markers such as `[ZH]`, `[EN]`, `[JA]`, `[中文]`, `[English]`, `[日本語]`.
 * When `allowBareLabel` is true (multiple sibling toggles), also accepts bare `中文` / `English` / `日本語`.
 */
export function detectLangMarker(rawText, allowBareLabel = false) {
  if (!rawText) return null
  const cleaned = String(rawText)
    .trim()
    .replace(/^(?:🇨🇳|🇺🇸|🇬🇧|🇯🇵|🌐)\s*/u, '')
    .trim()

  if (/^(?:\[|【)\s*(?:zh|zh-cn|cn|中文)\s*(?:\]|】)(?:\s|$|[:：·—-])/i.test(cleaned)) {
    return 'zh'
  }
  if (/^(?:\[|【)\s*(?:en|en-us|english|英文|英语)\s*(?:\]|】)(?:\s|$|[:：·—-])/i.test(cleaned)) {
    return 'en'
  }
  if (/^(?:\[|【)\s*(?:ja|jp|ja-jp|japanese|日本語|日文|日语)\s*(?:\]|】)(?:\s|$|[:：·—-])/i.test(cleaned)) {
    return 'ja'
  }

  if (allowBareLabel) {
    if (/^(?:zh|zh-cn|cn|中文|中文版)$/i.test(cleaned)) return 'zh'
    if (/^(?:en|en-us|english|英文|英文版)$/i.test(cleaned)) return 'en'
    if (/^(?:ja|jp|ja-jp|japanese|日本語|日本語版|日文|日文版)$/i.test(cleaned)) return 'ja'
  }

  return null
}

/**
 * Filter a Notion `blockMap` in-place (via shallow copy) for `[ZH]` / `[EN]` / `[JA]` sections.
 * Supports both Toggle/Callout container blocks (unwrapping child blocks onto the page root)
 * and flat section heading markers. Returns original `blockMap` untouched when no markers exist.
 */
export function resolveLocalizedBlockMap(blockMap, postId, lang = 'zh') {
  const blocks = blockMap?.block
  if (!blocks || typeof blocks !== 'object') {
    return {
      blockMap,
      hasMultiLangBlocks: false,
      availableLangs: [],
      activeLang: lang,
      titleOverride: '',
      summaryOverride: ''
    }
  }

  const idLookup = new Map()
  for (const key of Object.keys(blocks)) {
    idLookup.set(normalizeNotionId(key), key)
  }

  const getEntryById = id => {
    if (!id) return null
    if (blocks[id]) return { key: id, entry: blocks[id] }
    const mapped = idLookup.get(normalizeNotionId(id))
    return mapped ? { key: mapped, entry: blocks[mapped] } : null
  }

  let rootKey = postId ? idLookup.get(normalizeNotionId(postId)) : null
  if (!rootKey || blocks[rootKey]?.value?.type !== 'page') {
    rootKey = Object.keys(blocks).find(k => blocks[k]?.value?.type === 'page')
  }
  const rootEntry = rootKey ? blocks[rootKey] : null
  const rootVal = rootEntry?.value
  const rootContent = Array.isArray(rootVal?.content) ? rootVal.content : []
  if (!rootVal || rootContent.length === 0) {
    return {
      blockMap,
      hasMultiLangBlocks: false,
      availableLangs: [],
      activeLang: lang,
      titleOverride: '',
      summaryOverride: ''
    }
  }

  const nextBlocks = { ...blocks }
  const seenLangSet = new Set()
  const usedLangSet = new Set()
  let hasAnyMarker = false
  let titleOverride = ''
  let summaryOverride = ''

  const reparentBlock = (cid, parentId) => {
    const found = getEntryById(cid)
    if (found?.entry?.value) {
      nextBlocks[found.key] = {
        ...found.entry,
        value: {
          ...found.entry.value,
          parent_id: parentId,
          parent_table: 'block'
        }
      }
    }
  }

  const localizeSharedBlock = cid => {
    const found = getEntryById(cid)
    const bVal = found?.entry?.value
    if (!bVal) return
    if (bVal.type === 'image' && bVal.properties?.caption) {
      const rawCap = getBlockPlainText(bVal, 'caption')
      if (rawCap.includes('||')) {
        nextBlocks[found.key] = {
          ...found.entry,
          value: {
            ...bVal,
            properties: {
              ...bVal.properties,
              caption: [[parseMultiLang(rawCap, lang)]]
            }
          }
        }
      }
    }
  }

  /**
   * Transform a container's child ID list in document order:
   * - Unwraps consecutive `[ZH]`/`[EN]`/`[JA]` Toggle/Callout groups in-place (preserving interleaved images/columns)
   * - Recursively transforms `<columns>` (`column_list` -> `column`)
   * - Supports flat heading markers (`# [ZH]` ... `# [EN]`) when no Toggle/Callout containers exist
   */
  const transformChildList = (childIds, parentId, isRoot = false) => {
    if (!Array.isArray(childIds) || childIds.length === 0) return childIds

    let bareToggleMatches = 0
    let hasToggleMarkers = false
    for (const cid of childIds) {
      const bVal = getEntryById(cid)?.entry?.value
      if (bVal && (bVal.type === 'toggle' || bVal.type === 'callout')) {
        if (detectLangMarker(getBlockPlainText(bVal, 'title'), true)) {
          bareToggleMatches += 1
        }
        if (
          detectLangMarker(getBlockPlainText(bVal, 'title'), bareToggleMatches >= 2) &&
          Array.isArray(bVal.content) &&
          bVal.content.length > 0
        ) {
          hasToggleMarkers = true
        }
      }
    }
    const allowBare = bareToggleMatches >= 2
    if (!hasToggleMarkers && allowBare) {
      for (const cid of childIds) {
        const bVal = getEntryById(cid)?.entry?.value
        if (
          bVal &&
          (bVal.type === 'toggle' || bVal.type === 'callout') &&
          detectLangMarker(getBlockPlainText(bVal, 'title'), true) &&
          Array.isArray(bVal.content) &&
          bVal.content.length > 0
        ) {
          hasToggleMarkers = true
          break
        }
      }
    }

    if (hasToggleMarkers) {
      const outIds = []
      let toggleGroup = null
      let isFirstRootGroup = isRoot

      const flushToggleGroup = () => {
        if (!toggleGroup) return
        const groupLang =
          toggleGroup.map[lang]?.length > 0
            ? lang
            : toggleGroup.map.zh?.length > 0
            ? 'zh'
            : toggleGroup.map.en?.length > 0
            ? 'en'
            : toggleGroup.order[0]

        if (groupLang && toggleGroup.map[groupLang]) {
          usedLangSet.add(groupLang)
          toggleGroup.map[groupLang].forEach((cid, idx) => {
            const bVal = getEntryById(cid)?.entry?.value
            if (
              isFirstRootGroup &&
              idx < 3 &&
              bVal &&
              bVal.type === 'text' &&
              (!bVal.content || bVal.content.length === 0)
            ) {
              const txt = getBlockPlainText(bVal, 'title').trim()
              const titleMatch = txt.match(
                /^(?:\[|【)\s*(?:title|标题|タイトル)\s*(?:\]|】)\s*[:：]?\s*(.+)$/i
              )
              if (titleMatch) {
                titleOverride = titleMatch[1].trim()
                return
              }
              const sumMatch = txt.match(
                /^(?:\[|【)\s*(?:summary|摘要|要約)\s*(?:\]|】)\s*[:：]?\s*(.+)$/i
              )
              if (sumMatch) {
                summaryOverride = sumMatch[1].trim()
                return
              }
            }
            processNestedContainer(cid)
            reparentBlock(cid, parentId)
            outIds.push(cid)
          })
        }
        isFirstRootGroup = false
        toggleGroup = null
      }

      for (const cid of childIds) {
        const bVal = getEntryById(cid)?.entry?.value
        if (!bVal) continue

        const marker =
          bVal.type === 'toggle' || bVal.type === 'callout'
            ? detectLangMarker(getBlockPlainText(bVal, 'title'), allowBare)
            : null

        if (marker && Array.isArray(bVal.content) && bVal.content.length > 0) {
          hasAnyMarker = true
          seenLangSet.add(marker)
          if (!toggleGroup) {
            toggleGroup = { order: [], map: { zh: [], en: [], ja: [] } }
          }
          if (!toggleGroup.order.includes(marker)) {
            toggleGroup.order.push(marker)
          }
          toggleGroup.map[marker].push(...bVal.content)
          continue
        }

        flushToggleGroup()
        processNestedContainer(cid)
        localizeSharedBlock(cid)
        outIds.push(cid)
      }

      flushToggleGroup()
      return outIds
    }

    // Fallback: flat heading markers (`# [ZH]` ... `# [EN]` ... `# [JA]`)
    const sections = { zh: [], en: [], ja: [] }
    const sharedBefore = []
    let localHasFlat = false
    let currentFlatLang = null

    for (const cid of childIds) {
      const bVal = getEntryById(cid)?.entry?.value
      if (!bVal) continue
      const marker = detectLangMarker(getBlockPlainText(bVal, 'title'), false)
      if (marker) {
        localHasFlat = true
        hasAnyMarker = true
        seenLangSet.add(marker)
        currentFlatLang = marker
        continue
      }
      if (!localHasFlat) {
        processNestedContainer(cid)
        localizeSharedBlock(cid)
        sharedBefore.push(cid)
      } else if (currentFlatLang) {
        processNestedContainer(cid)
        sections[currentFlatLang].push(cid)
      }
    }

    if (!localHasFlat) return sharedBefore

    const flatActive =
      sections[lang]?.length > 0
        ? lang
        : sections.zh?.length > 0
        ? 'zh'
        : sections.en?.length > 0
        ? 'en'
        : 'ja'
    usedLangSet.add(flatActive)
    return [...sharedBefore, ...(sections[flatActive] || [])]
  }

  function processNestedContainer(cid) {
    const found = getEntryById(cid)
    const bVal = found?.entry?.value
    if (!bVal || !Array.isArray(bVal.content) || bVal.content.length === 0) return

    if (bVal.type === 'column_list') {
      for (const colId of bVal.content) {
        const colFound = getEntryById(colId)
        const colVal = colFound?.entry?.value
        if (colVal && Array.isArray(colVal.content) && colVal.content.length > 0) {
          const nextColContent = transformChildList(colVal.content, colVal.id, false)
          nextBlocks[colFound.key] = {
            ...colFound.entry,
            value: {
              ...colVal,
              content: nextColContent
            }
          }
        }
      }
    }
  }

  const nextRootContent = transformChildList(rootContent, rootVal.id, true)
  const availableLangs = ['zh', 'en', 'ja'].filter(l => seenLangSet.has(l))

  if (!hasAnyMarker || availableLangs.length === 0) {
    return {
      blockMap,
      hasMultiLangBlocks: false,
      availableLangs: [],
      activeLang: lang,
      titleOverride: '',
      summaryOverride: ''
    }
  }

  const activeLang = usedLangSet.has(lang)
    ? lang
    : availableLangs.includes(lang)
    ? lang
    : availableLangs.includes('zh')
    ? 'zh'
    : availableLangs.includes('en')
    ? 'en'
    : availableLangs[0]

  nextBlocks[rootKey] = {
    ...rootEntry,
    value: {
      ...rootVal,
      content: nextRootContent
    }
  }

  return {
    blockMap: {
      ...blockMap,
      block: nextBlocks
    },
    hasMultiLangBlocks: true,
    availableLangs,
    activeLang,
    titleOverride,
    summaryOverride
  }
}

/**
 * Parse a Notion `做的东西` (`work`) page (and its prefetched `blockMap`) into a rich
 * WorkSection project descriptor supporting `[ZH]`/`[EN]`/`[JA]` toggles, `||` strings,
 * quotes/headings, paragraphs, numbered/bulleted highlights, bookmarks/links, and multi-tab screenshots.
 */
export function parseNotionWorkProject(page, lang = 'zh', t = k => k) {
  const rawTitle = String(page?.title || '').trim()
  const orderMatch = rawTitle.match(/^0*(\d+)\s*(?:\/|\.|·|-|—)\s*(.+)$/)
  const sortOrder = orderMatch ? Number(orderMatch[1]) : 999
  const cleanRawTitle = orderMatch ? orderMatch[2] : rawTitle

  const localized = resolveLocalizedBlockMap(page?.blockMap, page?.id, lang)
  const effectiveBlockMap = localized.blockMap
  const blocks = effectiveBlockMap?.block || {}

  const idLookup = new Map()
  for (const key of Object.keys(blocks)) {
    idLookup.set(normalizeNotionId(key), key)
  }
  const getVal = id => {
    if (!id) return null
    if (blocks[id]?.value) return blocks[id].value
    const mapped = idLookup.get(normalizeNotionId(id))
    return mapped ? blocks[mapped]?.value : null
  }

  let rootVal = getVal(page?.id)
  if (!rootVal || rootVal.type !== 'page') {
    const rk = Object.keys(blocks).find(k => blocks[k]?.value?.type === 'page')
    rootVal = rk ? blocks[rk].value : null
  }

  // Flatten active content blocks (walking into layout columns so side-by-side screenshots work)
  const activeBlocks = []
  const collectBlocks = ids => {
    if (!Array.isArray(ids)) return
    for (const cid of ids) {
      const bVal = getVal(cid)
      if (!bVal) continue
      if (bVal.type === 'column_list' || bVal.type === 'column') {
        collectBlocks(bVal.content)
      } else {
        activeBlocks.push(bVal)
      }
    }
  }
  collectBlocks(rootVal?.content || [])

  let badge = 'OPEN SOURCE'
  let deckFromBlocks = ''
  const descParagraphs = []
  const featuresFromBlocks = []
  let linkUrlFromBlocks = ''
  let linkLabelFromBlocks = ''
  const imagesFromBlocks = []

  for (const bVal of activeBlocks) {
    const type = bVal.type
    const text = getBlockPlainText(bVal, 'title').trim()

    if (type === 'bookmark') {
      const bmUrl = bVal.properties?.link?.[0]?.[0] || text
      const bmCaption = parseMultiLang(getBlockPlainText(bVal, 'caption').trim(), lang)
      if (bmUrl && !linkUrlFromBlocks) {
        linkUrlFromBlocks = String(bmUrl).trim()
        if (bmCaption) linkLabelFromBlocks = bmCaption
      }
      continue
    }

    if (type === 'image') {
      const rawSrc =
        bVal.properties?.source?.[0]?.[0] || bVal.format?.display_source || ''
      const mappedSrc =
        mapImgUrl(rawSrc, bVal, 'block', false) ||
        effectiveBlockMap?.signed_urls?.[bVal.id] ||
        rawSrc
      if (mappedSrc) {
        const rawCaption = getBlockPlainText(bVal, 'caption').trim()
        imagesFromBlocks.push({
          src: mappedSrc,
          caption: rawCaption ? parseMultiLang(rawCaption, lang) : ''
        })
      }
      continue
    }

    if (!text) continue

    // Metadata directives `[BADGE] ...` or `[LINK] https://...`
    const badgeMatch = text.match(/^(?:\[|【)\s*(?:badge|角标|类型)\s*(?:\]|】)\s*[:：]?\s*(.+)$/i)
    if (badgeMatch) {
      badge = parseMultiLang(badgeMatch[1].trim(), lang)
      continue
    }
    const linkDirective = text.match(/^(?:\[|【)\s*(?:link|url|github|链接|源码)\s*(?:\]|】)\s*[:：]?\s*(.+)$/i)
    if (linkDirective) {
      const richLink = extractRichTextLink(bVal, 'title')
      if (richLink?.url) {
        linkUrlFromBlocks = richLink.url
        if (richLink.label && !/^https?:\/\//i.test(richLink.label)) {
          linkLabelFromBlocks = parseMultiLang(richLink.label, lang)
        }
      } else {
        const rest = linkDirective[1].trim()
        const urlToken = rest.match(/https?:\/\/\S+/i)
        if (urlToken) {
          linkUrlFromBlocks = urlToken[0]
          const customLbl = rest.replace(urlToken[0], '').replace(/^[|｜·—\-\s]+|[|｜·—\-\s]+$/g, '')
          if (customLbl) linkLabelFromBlocks = parseMultiLang(customLbl, lang)
        }
      }
      continue
    }

    if (
      type === 'quote' ||
      type === 'header' ||
      type === 'sub_header' ||
      type === 'sub_sub_header'
    ) {
      if (!deckFromBlocks) {
        deckFromBlocks = parseMultiLang(text, lang)
      } else {
        descParagraphs.push(parseMultiLang(text, lang))
      }
      continue
    }

    if (type === 'numbered_list' || type === 'bulleted_list') {
      featuresFromBlocks.push(parseMultiLang(text, lang))
      continue
    }

    if (type === 'text' || type === 'callout') {
      const richLink = extractRichTextLink(bVal, 'title')
      const isStandaloneUrl = /^https?:\/\/\S+$/i.test(text)
      if (!linkUrlFromBlocks && isStandaloneUrl) {
        linkUrlFromBlocks = text
        continue
      }
      if (!linkUrlFromBlocks && richLink?.url && richLink.label === text) {
        linkUrlFromBlocks = richLink.url
        linkLabelFromBlocks = parseMultiLang(richLink.label, lang)
        continue
      }
      descParagraphs.push(parseMultiLang(text, lang))
    }
  }

  // Legacy `@`-delimited summary support (`标语 @ 简介 @ 亮点1,亮点2 @ URL`)
  const rawSummary = localized.summaryOverride || String(page?.summary || '').trim()
  const atParts = rawSummary.includes('@')
    ? rawSummary.split('@').map(s => s.trim())
    : null

  const name =
    localized.titleOverride ||
    parseMultiLang(cleanRawTitle, lang) ||
    'Project'

  const deck =
    deckFromBlocks ||
    (atParts ? parseMultiLang(atParts[0], lang) : '') ||
    (descParagraphs.length > 0 && rawSummary
      ? parseMultiLang(rawSummary, lang)
      : name)

  const desc =
    descParagraphs.join('\n') ||
    (atParts && atParts[1] ? parseMultiLang(atParts[1], lang) : '') ||
    (!deckFromBlocks && rawSummary ? parseMultiLang(rawSummary, lang) : '')

  const features =
    featuresFromBlocks.length > 0
      ? featuresFromBlocks
      : atParts && atParts[2]
      ? atParts[2]
          .split(',')
          .map(f => parseMultiLang(f.trim(), lang))
          .filter(Boolean)
      : []

  const fallbackHref = page?.href || (page?.slug ? `/${page.slug}` : '#work')
  const url =
    linkUrlFromBlocks ||
    (atParts && atParts[3] ? atParts[3] : '') ||
    (typeof page?.ext?.url === 'string' ? page.ext.url : '') ||
    (/^https?:\/\//i.test(String(page?.slug || '')) ? page.slug : fallbackHref)

  const isExternal = /^https?:\/\//i.test(url)
  const isGithub = /github\.com/i.test(url)
  const linkLabel =
    linkLabelFromBlocks ||
    (isGithub ? t('viewCode') : isExternal ? t('openProject') : t('readMore'))

  const fallbackCover =
    page?.pageCover ||
    page?.pageCoverThumbnail ||
    '/themes/field-notes/assets/r2-share.jpg'

  const finalImages =
    imagesFromBlocks.length > 0
      ? imagesFromBlocks.map(img => img.src)
      : [fallbackCover]

  const finalScreens =
    imagesFromBlocks.length > 0
      ? imagesFromBlocks.map(
          (img, idx) =>
            img.caption ||
            `${t('screenPreview')} ${String(idx + 1).padStart(2, '0')}`
        )
      : [t('screenPreview')]

  const finalAlts =
    imagesFromBlocks.length > 0
      ? imagesFromBlocks.map((img, idx) => img.caption || `${name} ${idx + 1}`)
      : [name]

  const displayTags = filterDisplayTags(page?.tags || page?.tagItems).map(tg =>
    localizeTag(tg, lang)
  )

  const screenshotSuffix =
    lang === 'en'
      ? 'Project interface screenshot'
      : lang === 'ja'
      ? 'プロジェクトの画面'
      : '项目界面截图'

  return {
    id: page?.id || name,
    sortOrder,
    publishDate: page?.publishDate || 0,
    name,
    badge,
    url,
    linkLabel,
    isInternalNote: !isExternal,
    tags: displayTags,
    deck,
    desc,
    features,
    screens: finalScreens,
    alts: finalAlts,
    images: finalImages,
    caption: `${name} · ${screenshotSuffix}`
  }
}
