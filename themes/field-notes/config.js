/**
 * FIELD NOTES 主题配置
 */
const CONFIG = {
  THEME_NAME: 'field-notes',
  // Palette lives in style.js (:root tokens); these mirror it for reference
  COLOR_BG: '#f0eee9',
  COLOR_INK: '#17161a',
  COLOR_BLUE: '#6667ab',
  COLOR_ACID: '#f5df4d',
  COLOR_PINK: '#ff6f61',

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
