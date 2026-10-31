const projects = [
  {name:'R2FileBox', url:'https://github.com/workHMZ/r2filebox', tags:['Cloudflare Workers','R2 + D1','Vue 3'], files:['r2-share','r2-admin']},
  {name:'EdgeKintai', url:'https://github.com/workHMZ/EdgeKintai', tags:['Cloudflare Workers','D1','Hono'], files:['edge-today','edge-calendar']},
  {name:'Tokyo Transit Monitor', url:'https://github.com/workHMZ/tokyo-transit-monitor', tags:['Python','GitHub Actions','GitHub Pages'], files:['transit-light','transit-dark']}
];
let currentProject = 0;
const photos = [
  {
    "file": "harbor",
    "date": "2026.07.04",
    "place": "placeChiba",
    "settings": "33mm · f/5.6 · 1/850s · ISO 160",
    "camera": "FUJIFILM X-S20",
    "category": "landscape"
  },
  {
    "file": "sky",
    "date": "2026.10.03",
    "place": "placeTokyo",
    "settings": "33mm · f/4 · 1/900s · ISO 160",
    "camera": "FUJIFILM X-S20",
    "category": "everyday"
  },
  {
    "file": "snow",
    "date": "2025.12.14",
    "place": "placeSapporo",
    "settings": "33mm · f/1.8 · 1/125s · ISO 320",
    "camera": "FUJIFILM X-S20",
    "category": "everyday"
  },
  {
    "file": "mountains",
    "date": "2026.07.04",
    "place": "placeChiba",
    "settings": "33mm · f/5 · 1/1000s · ISO 320",
    "camera": "FUJIFILM X-S20",
    "category": "landscape"
  },
  {
    "file": "sumida",
    "date": "2026.08.15",
    "place": "placeSumida",
    "settings": "33mm · f/1.4 · 1/60s · ISO 640",
    "camera": "FUJIFILM X-S20",
    "category": "everyday"
  },
  {
    "file": "tree",
    "date": "2026.07.19",
    "place": "placeTree",
    "settings": "33mm · f/1.8 · 1/80s · ISO 320",
    "camera": "FUJIFILM X-S20",
    "category": "landscape"
  },
  {
    "file": "bamboo",
    "date": "2026.07.19",
    "place": "placeTree",
    "settings": "33mm · f/2 · 1/170s · ISO 320",
    "camera": "FUJIFILM X-S20",
    "category": "landscape"
  },
  {
    "file": "meadow",
    "date": "2025.06.28",
    "place": "placeMeadow",
    "settings": "33mm · f/4.5 · 1/1100s · ISO 320",
    "camera": "FUJIFILM X-S20",
    "category": "landscape"
  },
  {
    "file": "fireworks-trails",
    "date": "2025.07.26",
    "place": "placeSummer",
    "settings": "33mm · ISO 160",
    "camera": "FUJIFILM X-S20",
    "category": "everyday"
  },
  {
    "file": "fireworks-bloom",
    "date": "2025.07.26",
    "place": "placeSummer",
    "settings": "33mm · ISO 160",
    "camera": "FUJIFILM X-S20",
    "category": "everyday"
  },
  {
    "file": "jellyfish",
    "date": "2025.10.12",
    "place": "placeAquarium",
    "settings": "33mm · f/1.4 · 1/140s · ISO 320",
    "camera": "FUJIFILM X-S20",
    "category": "everyday"
  },
  {
    "file": "jellyfish-drift",
    "date": "2025.10.12",
    "place": "placeAquarium",
    "settings": "33mm · f/1.4 · 1/140s · ISO 320",
    "camera": "FUJIFILM X-S20",
    "category": "everyday"
  },
  {
    "file": "north",
    "date": "2025.12.13",
    "place": "placeNorth",
    "settings": "33mm · f/3.2 · 1/420s · ISO 320",
    "camera": "FUJIFILM X-S20",
    "category": "landscape"
  },
  {
    "file": "sengen",
    "date": "2026.10.12",
    "place": "placeSengen",
    "category": "everyday",
    "camera": "FUJIFILM X-S20",
    "settings": "33mm · f/2.5 · 1/10500s · ISO 640"
  },
  {
    "file": "fuji-sea",
    "date": "2026.10.12",
    "place": "placeShizuokaSea",
    "category": "landscape",
    "camera": "FUJIFILM X-S20",
    "settings": "33mm · f/2.8 · 1/14000s · ISO 640"
  },
  {
    "file": "harumi-rain",
    "date": "2026.10.24",
    "place": "placeHarumi",
    "settings": "33mm · f/8 · 1.5s · ISO 160",
    "camera": "FUJIFILM X-S20",
    "category": "everyday",
    "description": "photoDesc15"
  },
  {
    "file": "harumi-cloud",
    "date": "2026.10.24",
    "place": "placeHarumi",
    "settings": "33mm · f/8 · 2s · ISO 160",
    "camera": "FUJIFILM X-S20",
    "category": "everyday",
    "description": "photoDesc16"
  }
];
// Phone snapshots belong only to the hero, separate from the camera timeline.
const heroPhotos = [
  {file:'phone-waterfall', key:'heroWaterfall', date:'2025.06.29', camera:'iPhone'},
  {file:'phone-crane', key:'heroCrane', date:'2024', camera:'iPhone'}
];
const photoOrder = [7, 8, 9, 10, 11, 12, 2, 0, 3, 6, 5, 4, 1, 13, 14, 15, 16];

export { projects, photos, heroPhotos, photoOrder };
