/**
 * FIELD NOTES 主题配置
 */
const CONFIG = {
  THEME_NAME: 'field-notes',
  COLOR_BG: '#f5f2e9',
  COLOR_INK: '#20211e',
  COLOR_GREEN: '#d2fc4b',
  COLOR_PURPLE: '#b19aea',

  // 菜单配置
  MENU_CATEGORY: true,
  MENU_TAG: true,
  MENU_ARCHIVE: true,
  MENU_SEARCH: true,

  // 首页展示文章数量
  HOME_ARTICLE_COUNT: 6,

  // Hero copy that can be edited from the Notion config table.
  // Format: "中文 || English || 日本語"; empty falls back to the built-in translations
  FIELD_NOTES_STATUS: null,
  FIELD_NOTES_SCRIBBLE: null
}
export default CONFIG
