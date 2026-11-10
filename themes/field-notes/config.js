/**
 * FIELD NOTES 主题配置
 */
const CONFIG = {
  THEME_NAME: 'field-notes',
  // Palette lives in style.js (:root tokens); these mirror it for reference
  COLOR_BG: '#f0ece1',
  COLOR_INK: '#0c0c0d',
  COLOR_BLUE: '#2b3bff',
  COLOR_ACID: '#d9ff2f',
  COLOR_PINK: '#ff4d9d',

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
