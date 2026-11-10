/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'

/**
 * FIELD NOTES — "wall" look.
 * Neo-brutalist structure (thick ink rules, hard offset shadows, flat colour
 * fields) with the hand of the street on top (marker, spray, drips, tape).
 *
 * Order: tokens · base · shell · film rail · header · hero · tapes ·
 * section heads · notes · work · closing · footer · inner pages · viewer ·
 * carried-over scenes · responsive · motion.
 */
const Style = () => {
  return (
    <style jsx global>{`
/* ---------- tokens ---------- */
:root{
  /* Pantone references, sRGB approximations:
     bone  11-4201 Cloud Dancer   blue 17-3938 Very Peri
     acid  13-0647 Illuminating   pink 16-1546 Living Coral
     red   18-1750 Viva Magenta */
  --ink:#17161a;
  --bone:#f0eee9;
  --card:#fffdf8;
  --blue:#6667ab;
  --acid:#f5df4d;
  --pink:#ff6f61;
  --red:#bb2649;
  --muted:#5f5e68;
  --soft:#34333b;

  /* names the carried-over scene styles still ask for */
  --paper:var(--bone);
  --green:var(--acid);
  --purple:var(--pink);

  --bw:3px;
  --border:var(--bw) solid var(--ink);

  /* Type. Latin always comes from Archivo (display, UI, English body) and
     IBM Plex Mono (labels). CJK headings and UI use Source Han (Noto Sans
     SC / JP); CJK body stays on the system face. The hand is a hard pen in
     every language: LXGW WenKai, Klee One (its parent) and Caveat. */
  --font-fallback:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --font:"PingFang SC","Hiragino Sans GB","Microsoft YaHei",var(--font-fallback);
  --display:"Archivo","Noto Sans SC","PingFang SC","Microsoft YaHei",var(--font-fallback);
  --hand:"Caveat","LXGW WenKai TC","Kaiti SC","STKaiti",cursive;
  --hand-w:700;
  --spray:"Rubik Spray Paint","Archivo",var(--font-fallback);
  --mono:"IBM Plex Mono","SFMono-Regular",ui-monospace,Menlo,Consolas,"PingFang SC","Hiragino Sans","Microsoft YaHei",monospace;
}
:lang(ja){
  --font:"Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic","Meiryo",var(--font-fallback);
  --display:"Archivo","Noto Sans JP","Hiragino Sans","Yu Gothic",var(--font-fallback);
  --hand:"Caveat","Klee One","Klee","Hiragino Maru Gothic ProN",cursive;
  --hand-w:600;
}
:lang(en){
  --font:"Archivo",var(--font-fallback);
  --display:"Archivo",var(--font-fallback);
  --hand:"Caveat","Klee One","LXGW WenKai TC","Kaiti SC",cursive;
  --hand-w:700;
}

/* ---------- base ---------- */
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:24px;-webkit-text-size-adjust:100%;text-size-adjust:100%}
/* NotionNext may put html.dark on at night; this theme is light only */
html:has(#theme-field-notes){color-scheme:light!important;overflow-x:clip}
body:has(#theme-field-notes){background-color:var(--bone)!important;color:var(--ink)!important;overflow-x:clip}
.dark #theme-field-notes{background-color:var(--bone)!important;color:var(--ink)!important}
body{
  margin:0;color:var(--ink);background:var(--bone);
  font-family:var(--font);font-size:16px;line-height:1.65;
  -webkit-font-smoothing:antialiased;
  background-image:radial-gradient(#0c0c0d17 .7px,transparent .8px);background-size:8px 8px;
}
body:has(dialog[open]){overflow:hidden}
button,a{-webkit-tap-highlight-color:transparent}
:where(#theme-field-notes) a{color:inherit;text-decoration:none}
:where(#theme-field-notes) button{font:inherit;color:inherit;cursor:pointer;-webkit-appearance:none;appearance:none}
#theme-field-notes img{display:block;max-width:100%}
#theme-field-notes summary{cursor:pointer;list-style:none}
#theme-field-notes summary::-webkit-details-marker{display:none}
#theme-field-notes .details-icon{flex:none;font-size:24px;line-height:1;font-weight:400;transition:transform .2s cubic-bezier(.34,1.56,.64,1)}
#theme-field-notes details[open] .details-icon{transform:rotate(45deg)}
:lang(zh) #theme-field-notes,:lang(ja) #theme-field-notes{line-break:strict}
:where(#theme-field-notes) :where(h1,h2,h3,h4,p,figure){margin:0}
#theme-field-notes :is(a,button,summary):focus-visible{outline:3px solid var(--pink);outline-offset:3px}
#theme-field-notes ::selection{background:var(--acid);color:var(--ink)}
#theme-field-notes .mono{font-family:var(--mono);letter-spacing:.04em}
#theme-field-notes .skip{position:absolute;left:-999px;top:8px;z-index:100;background:var(--acid);border:var(--border);padding:8px 14px;font-weight:800}
#theme-field-notes .skip:focus{left:8px}
.fn-doodle{display:block;overflow:visible;pointer-events:none}
.fn-slap,.fn-print-label,.fn-collage-note,.fn-head-note,.fn-closing p,.fn-cans-hint,.fn-pola-cap strong,
#viewer .viewer-back,#viewer.is-polaroid #viewer-title,#theme-field-notes .film-frame-title{font-weight:var(--hand-w)}
:is(.fn-headline,.fn-head h2,.fn-bill-copy h3,.fn-poster-title,.fn-sheet-head h1,.fn-closing h2,.fn-proj-deck){text-wrap:balance}
:lang(zh) :is(.fn-headline,.fn-head h2,.fn-bill-copy h3,.fn-sheet-head h1,.fn-closing h2),
:lang(ja) :is(.fn-headline,.fn-head h2,.fn-bill-copy h3,.fn-sheet-head h1,.fn-closing h2){letter-spacing:-.01em;line-height:1.18}
:lang(ja) :is(.fn-headline,.fn-head h2,.fn-bill-copy h3,.fn-poster-title,.fn-sheet-head h1,.fn-closing h2,.fn-proj-deck){font-feature-settings:"palt";word-break:auto-phrase}

/* ---------- shell ---------- */
#theme-field-notes{
  --rail-w:112px;--maxw:1180px;--pad-l:48px;--pad-r:48px;--hdr:92px;
  --safe-t:env(safe-area-inset-top,0px);--safe-b:env(safe-area-inset-bottom,0px);
  --safe-l:env(safe-area-inset-left,0px);--safe-r:env(safe-area-inset-right,0px);
  position:relative;
}
.fn-shell{padding-left:var(--rail-w);min-height:100vh;min-height:100dvh;overflow-x:clip}
.fn-shell.is-home{--pad-l:164px}
#theme-field-notes .wrap{
  width:100%;max-width:none;margin-left:0;margin-right:0;
  padding-left:max(var(--pad-l),calc((100% - var(--maxw)) / 2),calc(var(--safe-l) + 12px));
  padding-right:max(var(--pad-r),calc((100% - var(--maxw)) / 2),calc(var(--safe-r) + 12px));
}

/* ---------- buttons, chips, tags ---------- */
.fn-btn{
  display:inline-flex;align-items:center;gap:12px;padding:13px 20px;
  background:var(--ink);color:var(--card)!important;border:var(--border);
  font-weight:800;font-size:14px;line-height:1.2;white-space:nowrap;
  box-shadow:5px 5px 0 var(--pink);
  transition:transform .14s ease,box-shadow .14s ease,background .14s ease;
}
.fn-btn:hover{transform:translate(-2px,-2px);box-shadow:8px 8px 0 var(--pink)}
.fn-btn:active{transform:translate(3px,3px);box-shadow:1px 1px 0 var(--pink)}
.fn-btn--acid{background:var(--acid);color:var(--ink)!important;box-shadow:5px 5px 0 var(--ink)}
.fn-btn--acid:hover{box-shadow:8px 8px 0 var(--ink)}
.fn-btn--acid:active{box-shadow:1px 1px 0 var(--ink)}
.fn-btn--paper{background:var(--card);color:var(--ink)!important;box-shadow:5px 5px 0 var(--ink)}
.fn-btn--paper:hover{background:var(--acid);box-shadow:8px 8px 0 var(--ink)}
.fn-btn--paper:active{box-shadow:1px 1px 0 var(--ink)}
.fn-btn--sm{padding:8px 13px;font-size:12px;gap:8px;box-shadow:3px 3px 0 var(--pink)}
.fn-btn--sm.fn-btn--paper{box-shadow:3px 3px 0 var(--ink)}
.fn-btn--sm:hover{box-shadow:5px 5px 0 var(--pink)}
.fn-btn--sm.fn-btn--paper:hover{box-shadow:5px 5px 0 var(--ink)}

.fn-btn,.fn-chip,.fn-chip-tag,.nav-dock-item,.nav-dropdown-item,.mobile-dock-btn,.mobile-dock-card strong,
.mobile-dock-link,.mobile-lang-btn,.fn-poster-foot,.fn-window-tabs button,.fn-proj-features li,.fn-footer a{font-family:var(--display)}
.fn-chips{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:30px}
.fn-chip{
  display:inline-flex;align-items:center;gap:8px;background:var(--card);color:var(--ink);
  border:var(--border);padding:7px 14px;font-weight:800;font-size:13px;line-height:1.4;
  box-shadow:3px 3px 0 var(--ink);
  transition:transform .12s ease,box-shadow .12s ease,background .12s ease;
}
.fn-chip b{font:700 11px/1.5 var(--mono);background:var(--ink);color:var(--card);padding:0 6px}
.fn-chip:hover{transform:translate(-1px,-1px);box-shadow:5px 5px 0 var(--ink);background:var(--acid)}
.fn-chip[aria-pressed=true]{background:var(--ink);color:var(--card);box-shadow:3px 3px 0 var(--pink)}
.fn-chip[aria-pressed=true] b{background:var(--acid);color:var(--ink)}
.fn-chip-tag{display:inline-block;background:var(--acid);color:var(--ink);border:2px solid var(--ink);padding:1px 8px;font-weight:800;font-size:12px;line-height:1.5}
a.fn-chip-tag:hover{background:var(--pink)}
.fn-tags{display:flex;flex-wrap:wrap;gap:4px 12px;font:700 12px/1.6 var(--mono)}
.fn-tags>*{color:var(--blue)}
.fn-tags a:hover{background:var(--acid);color:var(--ink)}
.fn-top{
  width:56px;height:56px;display:grid;place-items:center;background:var(--ink);color:var(--acid);
  border:var(--border);font-size:24px;font-weight:900;box-shadow:5px 5px 0 var(--pink);
  transition:transform .14s ease,box-shadow .14s ease;
}
.fn-top:hover{transform:translate(-2px,-4px);box-shadow:7px 9px 0 var(--pink)}

/* ---------- film rail (desktop photo roll) ---------- */
.fn-rail{
  position:fixed;top:0;bottom:0;left:0;width:var(--rail-w);z-index:45;
  background:var(--ink);border-right:var(--border);
  display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 0 12px;
  -webkit-user-select:none;user-select:none;
}
.fn-rail::before,.fn-rail::after{
  content:"";position:absolute;top:0;bottom:0;width:6px;pointer-events:none;
  background:repeating-linear-gradient(180deg,var(--bone) 0 9px,transparent 9px 23px);opacity:.85;
}
.fn-rail::before{left:7px}
.fn-rail::after{right:7px}
.fn-rail-count{
  position:relative;z-index:3;background:var(--acid);color:var(--ink)!important;border:2px solid var(--ink);
  font:700 11px/1.4 var(--mono);padding:3px 8px;transform:rotate(-4deg);box-shadow:3px 3px 0 var(--pink);
  transition:transform .15s ease;
}
.fn-rail-count:hover{transform:rotate(2deg) scale(1.06)}
.fn-rail-track{
  position:relative;flex:1;width:100%;min-height:0;
  display:flex;flex-direction:column;align-items:flex-start;justify-content:space-evenly;padding:10px 0 4px;
}
.fn-rail-track::before{content:"";position:absolute;top:-8px;bottom:-8px;left:calc(var(--rail-w) / 2 - 2.5px);width:2px;background:#f0ece14d}
.fn-clip{position:relative;margin-left:19px;z-index:2}
.fn-clip-jaw{
  position:absolute;z-index:5;top:-9px;left:26px;width:22px;height:15px;
  background:var(--pink);border:2px solid var(--ink);border-radius:3px 3px 1px 1px;pointer-events:none;
}
.fn-clip-jaw::before{content:"";position:absolute;left:3px;right:3px;top:-8px;height:8px;border:2px solid var(--bone);border-bottom:0;border-radius:6px 6px 0 0}
.fn-clip:nth-child(even) .fn-clip-jaw{background:var(--acid)}
.fn-clip:nth-child(3n) .fn-clip-jaw{background:var(--blue)}
.fn-pola{
  position:relative;display:block;width:74px;padding:5px 5px 0;text-align:left;
  background:var(--card);color:var(--ink)!important;border:2px solid var(--ink);
  transform:rotate(-4deg);transform-origin:37px 0;
  transition:width .36s cubic-bezier(.22,1,.36,1),padding .36s cubic-bezier(.22,1,.36,1),transform .36s cubic-bezier(.22,1,.36,1),box-shadow .3s ease;
}
.fn-clip:nth-child(even) .fn-pola{transform:rotate(3deg)}
.fn-pola-img{display:block;aspect-ratio:1.15;overflow:hidden;background:#181818;border:1.5px solid var(--ink)}
.fn-pola-img img{display:block;width:100%;height:100%;object-fit:cover}
.fn-pola-mini{display:flex;justify-content:space-between;padding:3px 1px 4px;font:700 9px/1.4 var(--mono);color:var(--muted)}
.fn-pola-mini b{color:var(--ink)}
.fn-pola-cap{display:none;padding:9px 2px 11px}
.fn-pola-cap strong{display:block;font-family:var(--hand);font-size:18px;line-height:1.25}
.fn-pola-cap .mono{display:flex;justify-content:space-between;gap:6px;margin-top:6px;font-size:10px;color:var(--muted)}
.fn-clip:not(.is-open) .fn-pola:hover{transform:rotate(0) scale(1.06)}
.fn-clip-date{
  position:absolute;z-index:6;left:-12px;top:26px;background:var(--acid);color:var(--ink);border:2px solid var(--ink);
  font:700 10px/1.5 var(--mono);padding:0 6px;box-shadow:2px 2px 0 var(--ink);
  opacity:0;transform:translateX(-6px) rotate(-6deg);transition:opacity .25s ease,transform .25s ease;pointer-events:none;
}
.fn-clip.is-open{z-index:15}
.fn-clip.is-open .fn-pola{
  width:208px;padding:9px 9px 0;border-width:3px;transform:rotate(-2deg);
  box-shadow:7px 7px 0 0 var(--acid),7px 7px 0 3px var(--ink);
}
.fn-clip.is-open .fn-pola-mini{display:none}
.fn-clip.is-open .fn-pola-cap{display:block}
.fn-clip.is-open .fn-clip-date{opacity:1;transform:translateX(0) rotate(-6deg)}
.fn-rail-more{
  position:relative;z-index:3;background:var(--ink);color:var(--acid)!important;border:2px solid var(--acid);
  font:700 10px/1.4 var(--mono);padding:4px 8px;white-space:nowrap;transition:background .15s ease,color .15s ease;
}
.fn-rail-more:hover{background:var(--acid);color:var(--ink)!important}
.fn-rail.is-attention .fn-rail-track{animation:fnWiggle .6s ease-in-out}

/* flat strip below the desktop breakpoint */
.fn-strip{display:none}

/* ---------- header ---------- */
.fn-header{position:relative;z-index:40;display:flex;align-items:center;gap:18px;height:calc(var(--hdr) + var(--safe-t));padding-top:var(--safe-t)}
.fn-logo{
  display:inline-grid;grid-auto-flow:column;place-items:center;height:50px;padding:0 12px;
  background:var(--acid);color:var(--ink)!important;border:var(--border);box-shadow:4px 4px 0 var(--ink);
  font:900 30px/1 var(--display);letter-spacing:-.04em;transform:rotate(-4deg);
  transition:transform .2s cubic-bezier(.2,.8,.2,1);
}
.fn-logo span{color:var(--pink);font-size:.72em;margin-left:2px;-webkit-text-stroke:1px var(--ink)}
.fn-logo:hover{transform:rotate(3deg) scale(1.06)}
.fn-header .brand-note{font:700 10px/1.55 var(--mono);letter-spacing:.14em}
.is-home .fn-header .brand-note{color:#fff}
.nav-dock{margin-left:auto;display:flex;align-items:stretch;background:var(--card);border:var(--border);box-shadow:5px 5px 0 var(--ink)}
#theme-field-notes .nav-dock-item{
  display:flex;align-items:center;gap:6px;height:42px;padding:0 15px;
  border:0;border-right:var(--border);background:transparent;color:var(--ink);
  font-weight:800;font-size:13px;white-space:nowrap;transition:background .14s ease;
}
#theme-field-notes .nav-dock>:last-child>.nav-dock-item{border-right:0}
#theme-field-notes .nav-dock-item:hover,
#theme-field-notes .nav-dock-dropdown.is-open>.nav-dock-item{background:var(--acid)}
.nav-dock-dropdown{position:relative;display:flex}
.nav-caret{font-size:10px}
.nav-dropdown-menu{
  display:none;position:absolute;top:calc(100% + 11px);left:-3px;min-width:230px;z-index:60;
  background:var(--card);border:var(--border);box-shadow:6px 6px 0 var(--ink);padding:6px;
}
.nav-dock-dropdown.is-open>.nav-dropdown-menu{display:block}
.nav-dropdown-right{left:auto;right:-3px;min-width:180px}
#theme-field-notes .nav-dropdown-item{
  display:flex;justify-content:space-between;align-items:center;gap:14px;width:100%;
  padding:9px 10px;border:0;background:transparent;color:var(--ink);font-size:13px;font-weight:700;text-align:left;
}
#theme-field-notes .nav-dropdown-item:hover,
#theme-field-notes .nav-dropdown-item.is-active{background:var(--acid)}
.nav-lang-chip{background:var(--acid);border:2px solid var(--ink);padding:0 6px;font-size:11px;font-weight:700;line-height:18px}
.mobile-dock-btn{display:none}
.mobile-dock-panel{
  position:absolute;top:calc(100% - 8px);left:var(--pad-l);right:var(--pad-r);z-index:70;
  background:var(--card);color:var(--ink);border:var(--border);box-shadow:7px 7px 0 var(--ink);padding:14px;
  max-height:calc(100dvh - 110px);overflow:auto;
}
.mobile-dock-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
#theme-field-notes .mobile-dock-card{
  display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:12px;text-align:left;
  background:var(--bone);border:var(--border);box-shadow:3px 3px 0 var(--ink);
}
.mobile-dock-card .mono{font-size:11px;color:var(--blue);font-weight:700}
.mobile-dock-card strong{font-weight:900;font-size:16px}
.mobile-dock-grid>:nth-child(1){background:var(--acid)!important}
.mobile-dock-grid>:nth-child(4){background:var(--pink)!important}
.mobile-dock-section{margin-top:14px;padding-top:12px;border-top:2px dashed var(--ink)}
.mobile-dock-label{font-size:11px;font-weight:700;letter-spacing:.12em;margin-bottom:6px}
.mobile-dock-links{display:grid}
.mobile-dock-link{display:flex;justify-content:space-between;gap:12px;padding:9px 2px;font-weight:700;font-size:14px;border-bottom:1px solid #0c0c0d26}
.mobile-lang-row{display:flex;gap:8px}
#theme-field-notes .mobile-lang-btn{flex:1;padding:9px 6px;background:var(--card);border:var(--border);font-weight:800;font-size:13px}
#theme-field-notes .mobile-lang-btn.is-active{background:var(--ink);color:var(--acid)}

/* ---------- hero ---------- */
.fn-hero{
  position:relative;margin-top:calc(-1 * (var(--hdr) + var(--safe-t)));padding:calc(var(--hdr) + var(--safe-t) + 20px) 0 104px;overflow:hidden;
  background:var(--blue);color:#fff;border-bottom:var(--border);
  background-image:radial-gradient(#ffffff1c 1.1px,transparent 1.2px);background-size:13px 13px;
}
.fn-issue{
  display:flex;justify-content:space-between;gap:16px;font-size:11px;letter-spacing:.16em;
  padding:9px 0;border-top:2px solid #fff;border-bottom:2px solid #fff;margin-bottom:30px;
}
.fn-hero-grid{display:grid;grid-template-columns:minmax(0,1.06fr) minmax(0,.94fr);gap:30px;align-items:center}
.fn-hero-copy{position:relative;z-index:3}
.fn-slap{
  display:inline-block;font-family:var(--hand);font-size:22px;line-height:1;
  background:var(--acid);color:var(--ink);border:var(--border);padding:9px 14px 7px;
  transform:rotate(-5deg);box-shadow:4px 4px 0 var(--ink);margin:0 0 2px -4px;
}
.fn-wordmark{
  font:900 min(clamp(104px,15.2vw,232px),27.5vw)/.86 var(--display);font-stretch:125%;letter-spacing:-.045em;
  color:var(--card);-webkit-text-stroke:6px var(--ink);paint-order:stroke fill;
  text-shadow:.04em .04em 0 var(--ink);white-space:nowrap;margin:0 0 .17em -.03em;
}
.fn-dripdot{
  display:inline-block;height:.5em;width:.2845em;vertical-align:-.267em;margin:0 0 0 .03em;
  fill:var(--acid);stroke:var(--ink);stroke-width:5.5;stroke-linejoin:round;
}
.fn-dripdot-shadow{fill:var(--ink)}
.fn-role{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;font-size:11px;letter-spacing:.14em;margin-bottom:22px}
.fn-role span:first-child{background:var(--ink);color:var(--acid);padding:3px 9px}
.fn-headline{
  display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin-bottom:24px;
  font:900 clamp(31px,4.1vw,56px)/1.14 var(--display);letter-spacing:-.02em;
}
.fn-swipe{
  display:inline-block;background:var(--acid);color:var(--ink);border:var(--border);
  padding:.02em .22em .07em;box-shadow:6px 6px 0 var(--ink);transform:rotate(-1.6deg);
}
.fn-intro{max-width:31em;font-size:16px;font-weight:500;line-height:1.85;margin-bottom:30px}
.fn-hero-cta{display:flex;flex-wrap:wrap;align-items:center;gap:18px 26px}
.fn-status{display:inline-flex;align-items:center;gap:9px;font-size:11px;letter-spacing:.06em}
.fn-status i{position:relative;width:11px;height:11px;border-radius:50%;background:var(--acid);border:2px solid var(--ink)}
.fn-status i::after{content:"";position:absolute;inset:-2px;border-radius:50%;background:var(--acid);animation:fnPulse 1.8s ease-out infinite}

.fn-collage{position:relative;height:clamp(430px,43vw,590px)}
.fn-blob{position:absolute;left:-13%;top:-5%;width:132%;fill:var(--pink)}
.fn-blob path:first-child{stroke:var(--ink);stroke-width:2.5px;paint-order:stroke fill}
.fn-print{
  position:absolute;display:block;padding:12px 12px 0;text-align:left;
  background:var(--card);color:var(--ink)!important;border:var(--border);box-shadow:10px 10px 0 var(--ink);
  transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s ease;
}
.fn-print img{display:block;width:100%;object-fit:cover;border:2px solid var(--ink);animation:fnDevelop 1.1s cubic-bezier(.25,.8,.3,1) both}
.fn-print--a{left:0;top:17%;width:75%;transform:rotate(-4deg);z-index:2}
.fn-print--a img{aspect-ratio:4 / 3}
.fn-print--b{right:0;bottom:1%;width:38%;transform:rotate(6deg);z-index:4}
.fn-print--b img{aspect-ratio:3 / 4}
.fn-print--b .fn-print-label{font-size:15px}
.fn-print:hover{transform:rotate(0) translate(-4px,-4px);box-shadow:15px 15px 0 var(--ink);z-index:6}
.fn-print-label{display:flex;justify-content:space-between;gap:8px;padding:10px 2px 12px;font-family:var(--hand);font-size:18px;line-height:1.2}
.fn-gaffer{
  position:absolute;z-index:3;top:-15px;left:50%;width:98px;height:27px;margin-left:-49px;
  background:var(--acid);border:2px solid var(--ink);transform:rotate(-3deg);
}
.fn-print--b .fn-gaffer{width:68px;height:22px;margin-left:-34px;top:-12px;background:var(--pink);transform:rotate(5deg)}
.fn-roundel{
  position:absolute;z-index:5;right:1%;top:1%;width:126px;height:126px;border-radius:50%;
  display:grid;place-content:center;text-align:center;
  background:var(--acid);color:var(--ink);border:var(--border);box-shadow:5px 5px 0 var(--ink);
  font:900 19px/1 var(--display);transform:rotate(12deg);
}
.fn-roundel span{display:block;font-size:24px;margin-top:2px}
.fn-collage-note{position:absolute;z-index:5;left:3%;top:1%;font-family:var(--hand);font-size:23px;line-height:1.2;white-space:nowrap;transform:rotate(-5deg)}
.fn-arrow{fill:none;stroke:currentColor;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.fn-collage-note .fn-arrow{position:absolute;left:100%;top:-2px;width:70px;margin-left:10px}
.fn-collage .fn-crosses{position:absolute;z-index:1;right:24%;top:9%;width:88px;fill:none;stroke:var(--ink);stroke-width:6;stroke-linecap:round}
.fn-collage .fn-crown{position:absolute;z-index:5;right:6%;bottom:55%;width:70px;fill:var(--acid);stroke:var(--ink);stroke-width:4;stroke-linejoin:round;transform:rotate(14deg)}
.fn-collage .fn-burst{position:absolute;z-index:3;left:1%;bottom:3%;width:66px;fill:var(--acid);stroke:var(--ink);stroke-width:4;stroke-linejoin:round;transform:rotate(-9deg)}
.fn-collage .fn-bolt{position:absolute;z-index:5;left:50%;bottom:-3%;width:30px;fill:var(--card);stroke:var(--ink);stroke-width:4;stroke-linejoin:round;transform:rotate(14deg)}
.fn-fig{position:absolute;left:0;bottom:-30px;font-size:10px;letter-spacing:.14em;white-space:nowrap}

/* ---------- barrier tapes ---------- */
.fn-tapes{position:relative;z-index:6;height:104px;margin:-56px 0 -14px;pointer-events:none}
.fn-tape{
  position:absolute;left:-4%;width:108%;overflow:hidden;white-space:nowrap;
  border-top:var(--border);border-bottom:var(--border);font:900 19px/1 var(--display);letter-spacing:.06em;
}
.fn-tape--ink{top:34px;background:var(--ink);color:var(--acid);transform:rotate(1.7deg)}
.fn-tape--acid{
  top:22px;color:var(--ink);transform:rotate(-1.5deg);box-shadow:0 5px 0 var(--ink);
  background:
    repeating-linear-gradient(-45deg,var(--ink) 0 7px,transparent 7px 15px) top / 100% 6px no-repeat,
    repeating-linear-gradient(-45deg,var(--ink) 0 7px,transparent 7px 15px) bottom / 100% 6px no-repeat,
    var(--acid);
}
.fn-tape-move{display:inline-flex;padding:15px 0;animation:fnTape 38s linear infinite;will-change:transform}
.fn-tapes.is-paused .fn-tape-move{animation-play-state:paused}
.fn-tape--ink .fn-tape-move{padding:11px 0;animation-direction:reverse;animation-duration:46s}
.fn-tape-run{display:inline-flex;align-items:center;gap:26px;padding-right:26px}
.fn-tape-run i{font-style:normal;color:var(--pink)}

/* ---------- section heads ---------- */
.fn-head{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:end;gap:10px 24px;margin-bottom:36px}
.fn-head-no{font:400 clamp(76px,9.5vw,136px)/.78 var(--spray);color:var(--blue);transform:rotate(-6deg);margin:0 0 -4px -6px}
.fn-eyebrow{display:block;font:700 11px/1.4 var(--mono);letter-spacing:.16em;margin-bottom:8px}
.fn-head h2{font:900 clamp(30px,4vw,54px)/1.1 var(--display);letter-spacing:-.025em;text-wrap:balance}
.fn-head-note{font-family:var(--hand);font-size:19px;line-height:1.3;color:var(--blue);max-width:15em;text-align:right;transform:rotate(-3deg);padding-bottom:10px}

/* ---------- notes ---------- */
.fn-notes{position:relative;padding:40px 0 108px}
.fn-anchor{display:block;position:relative;top:-20px}
.fn-empty{padding:30px 0;color:var(--muted)}
.fn-poster-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:12px}
.fn-poster-meta .mono{color:var(--muted)}

.fn-bill{
  display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);margin-bottom:58px;
  background:var(--card);border:var(--border);box-shadow:10px 10px 0 0 var(--blue),10px 10px 0 3px var(--ink);
}
.fn-bill-cover{position:relative;display:block;min-height:350px;overflow:hidden;background:var(--blue);border-right:var(--border)}
.fn-bill-cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.fn-bill:hover .fn-bill-cover img{transform:scale(1.04)}
.fn-bill-icon{position:absolute;inset:0;display:grid;place-items:center;font-size:76px;color:#fff}
.fn-bill-stamp{
  position:absolute;left:-8px;top:20px;background:var(--pink);color:var(--ink);border:var(--border);
  font:900 15px/1 var(--display);letter-spacing:.1em;padding:9px 14px 8px 20px;
  transform:rotate(-6deg);box-shadow:4px 4px 0 var(--ink);
}
.fn-bill-copy{display:flex;flex-direction:column;align-items:flex-start;gap:16px;padding:36px 38px 38px}
.fn-bill-copy h3{font:900 clamp(26px,2.9vw,40px)/1.2 var(--display);letter-spacing:-.015em}
.fn-bill-copy h3 a{background:linear-gradient(var(--acid),var(--acid)) 0 92% / 0 .34em no-repeat;transition:background-size .3s ease}
.fn-bill:hover h3 a{background-size:100% .34em}
.fn-bill-copy p{font-size:15px;line-height:1.8;color:var(--soft)}
.fn-bill-copy .fn-btn{margin-top:auto}

.fn-posters{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px 30px}
.fn-poster{
  --sh:var(--blue);--tilt:-.8deg;
  position:relative;display:flex;flex-direction:column;background:var(--card);color:var(--ink)!important;border:var(--border);
  box-shadow:7px 7px 0 0 var(--sh),7px 7px 0 3px var(--ink);transform:rotate(var(--tilt));
  transition:transform .22s cubic-bezier(.2,.8,.2,1),box-shadow .22s ease;
}
.fn-poster:nth-child(3n+2){--sh:var(--pink);--tilt:.7deg}
.fn-poster:nth-child(3n){--sh:var(--acid);--tilt:-.4deg}
.fn-poster:hover{transform:rotate(0) translate(-4px,-4px);box-shadow:12px 12px 0 0 var(--sh),12px 12px 0 3px var(--ink);z-index:2}
.fn-poster-no{position:absolute;z-index:2;right:14px;top:-13px;background:var(--ink);color:var(--card);font:italic 700 13px/1 var(--mono);letter-spacing:.04em;padding:5px 9px;transform:rotate(4deg)}
.fn-poster-cover{display:block;aspect-ratio:16 / 10;overflow:hidden;background:var(--blue);border-bottom:var(--border)}
.fn-poster-cover img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.fn-poster:hover .fn-poster-cover img{transform:scale(1.05)}
.fn-poster-body{display:flex;flex-direction:column;align-items:flex-start;gap:10px;flex:1;padding:18px 18px 16px}
.fn-poster.is-bare .fn-poster-body{padding-top:30px}
.fn-poster-title{font:900 20px/1.32 var(--display);letter-spacing:-.01em}
.fn-poster-desc{font-size:14px;line-height:1.7;color:var(--soft);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.fn-poster-foot{display:flex;justify-content:space-between;align-items:center;padding:10px 18px;border-top:var(--border);font-weight:800;font-size:13px;transition:background .15s ease,color .15s ease}
.fn-poster:hover .fn-poster-foot{background:var(--ink);color:var(--acid)}
.fn-more{display:flex;justify-content:center;margin-top:52px}

/* ---------- work ---------- */
.fn-work{
  position:relative;padding:92px 0 112px;background:var(--ink);color:var(--card);
  background-image:radial-gradient(#ffffff14 1px,transparent 1.1px);background-size:13px 13px;
}
.fn-work .fn-head-no,.fn-work .fn-head-note{color:var(--acid)}
.fn-proj-pick{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;margin-bottom:28px}
.fn-work .fn-chips{margin:0}
.fn-work .fn-chip{box-shadow:3px 3px 0 var(--acid)}
.fn-work .fn-chip b{background:var(--blue)}
.fn-work .fn-chip:hover{box-shadow:5px 5px 0 var(--acid)}
.fn-work .fn-chip[aria-pressed=true]{background:var(--acid);color:var(--ink);box-shadow:3px 3px 0 var(--pink)}
.fn-work .fn-chip[aria-pressed=true] b{background:var(--ink);color:var(--acid)}
.fn-proj-paging{display:flex;align-items:center;gap:8px}
.fn-proj-paging .mono{margin-right:8px;font-size:12px}
#theme-field-notes .fn-proj-paging button{width:44px;height:44px;background:var(--card);color:var(--ink);border:var(--border);font-size:20px;line-height:1;box-shadow:3px 3px 0 var(--acid);transition:background .14s ease,transform .14s ease}
#theme-field-notes .fn-proj-paging button:hover{background:var(--acid);transform:translate(-1px,-1px)}
.fn-proj{display:grid;grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr);background:var(--card);color:var(--ink);border:var(--border);box-shadow:12px 12px 0 var(--acid)}
.fn-proj-copy{display:flex;flex-direction:column;align-items:flex-start;gap:16px;padding:36px 36px 38px}
.fn-proj-top{display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;font-size:11px;letter-spacing:.1em}
.fn-proj-copy h3{font:900 clamp(32px,3.9vw,54px)/1 var(--display);font-stretch:112%;letter-spacing:-.035em;overflow-wrap:anywhere}
.fn-proj-deck{font:900 clamp(22px,2.3vw,30px)/1.25 var(--display);letter-spacing:-.01em}
.fn-proj-desc{white-space:pre-line;font-size:15px;line-height:1.8;color:var(--soft)}
.fn-proj .fn-tags{gap:6px 8px}
.fn-proj .fn-tags>*{color:var(--ink);background:var(--bone);border:2px solid var(--ink);padding:1px 8px}
.fn-proj-features{list-style:none;margin:0;padding:0;width:100%;border-top:var(--border)}
.fn-proj-features li{display:flex;gap:14px;align-items:baseline;padding:10px 0;border-bottom:2px dashed #0c0c0d59;font-weight:700;font-size:14px}
.fn-proj-features b{font:700 12px var(--mono);color:var(--blue)}
.fn-proj-copy .fn-btn{margin-top:6px}
.fn-proj-visual{
  display:flex;flex-direction:column;justify-content:center;gap:16px;padding:38px 34px 22px;
  background:var(--blue);border-left:var(--border);
  background-image:radial-gradient(#ffffff1c 1.1px,transparent 1.2px);background-size:13px 13px;
}
.fn-window{background:var(--card);border:var(--border);box-shadow:8px 8px 0 var(--ink);transform:rotate(1deg)}
.fn-window-bar{display:flex;justify-content:space-between;gap:10px;padding:8px 12px;background:var(--acid);border-bottom:var(--border);font-size:11px;font-weight:700}
.fn-window-tabs{display:flex;border-bottom:var(--border)}
#theme-field-notes .fn-window-tabs button{flex:1;min-height:40px;padding:8px 10px;border:0;border-right:var(--border);background:var(--card);font-weight:800;font-size:12px}
#theme-field-notes .fn-window-tabs button:last-child{border-right:0}
#theme-field-notes .fn-window-tabs button[aria-pressed=true]{background:var(--ink);color:var(--card)}
#theme-field-notes .fn-window-shot{position:relative;display:block;width:100%;padding:0;border:0;background:#fff;cursor:zoom-in}
.fn-window-shot img{display:block;width:100%;height:auto}
.fn-zoom{position:absolute;right:10px;bottom:10px;background:var(--ink);color:var(--card);font:700 11px var(--mono);padding:5px 9px;opacity:0;transition:opacity .2s ease}
.fn-window-shot:hover .fn-zoom,.fn-window-shot:focus-visible .fn-zoom{opacity:1}
.fn-proj-caption{display:flex;justify-content:space-between;gap:12px;color:#fff;font-size:11px;letter-spacing:.08em}

/* ---------- closing: a wall that takes paint ---------- */
.fn-closing{position:relative;overflow:hidden;min-height:470px;padding:100px 0 128px;background:var(--acid);border-bottom:var(--border)}
.fn-wall-canvas{position:absolute;inset:0;z-index:1;width:100%;height:100%;touch-action:pan-y;cursor:crosshair}
.fn-closing-inner{position:relative;z-index:2;pointer-events:none}
.fn-closing h2{position:relative;display:inline-block;max-width:min(13em,76%);margin:8px 0 26px;font:900 clamp(42px,7vw,108px)/1.04 var(--display);letter-spacing:-.035em}
.fn-closing .fn-scribble{position:absolute;left:0;bottom:-.2em;width:62%;height:.24em;fill:none;stroke:var(--pink);stroke-width:6;stroke-linecap:round}
.fn-closing p{max-width:24em;font-family:var(--hand);font-size:clamp(20px,2.2vw,28px);line-height:1.4;transform:rotate(-1.5deg);transform-origin:0 50%}
.fn-closing .fn-top{pointer-events:auto;margin-top:34px}
.fn-closing>.fn-crown{position:absolute;right:7%;top:56px;width:112px;fill:none;stroke:var(--ink);stroke-width:5;stroke-linejoin:round;transform:rotate(10deg)}
.fn-closing>.fn-burst{position:absolute;right:11%;top:184px;width:92px;fill:var(--pink);stroke:var(--ink);stroke-width:4;stroke-linejoin:round;transform:rotate(-12deg)}
.fn-cans{
  position:absolute;z-index:3;bottom:34px;right:max(var(--pad-r),calc((100% - var(--maxw)) / 2));
  display:flex;flex-direction:column;align-items:flex-end;gap:10px;pointer-events:none;
}
.fn-cans-hint{font-family:var(--hand);font-size:19px;line-height:1.2;transform:rotate(-2deg)}
.fn-cans-row{display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--card);border:var(--border);box-shadow:5px 5px 0 var(--ink);pointer-events:auto}
#theme-field-notes .fn-can{position:relative;width:30px;height:40px;padding:0;border:0;background:transparent;transition:transform .16s cubic-bezier(.2,.8,.2,1)}
.fn-can i{position:absolute;left:3px;right:3px;top:10px;bottom:0;background:var(--can);border:2px solid var(--ink);border-radius:4px 4px 2px 2px}
.fn-can i::before{content:"";position:absolute;left:50%;top:-9px;width:10px;height:7px;margin-left:-5px;background:var(--bone);border:2px solid var(--ink);border-radius:2px 2px 0 0}
#theme-field-notes .fn-can:hover{transform:translateY(-3px)}
#theme-field-notes .fn-can[aria-pressed=true]{transform:translateY(-7px) rotate(-9deg)}
#theme-field-notes .fn-can-wipe{margin-left:4px;padding:6px 10px;background:var(--bone);border:2px solid var(--ink);font-size:11px;font-weight:700}
#theme-field-notes .fn-can-wipe:hover:not(:disabled){background:var(--pink)}
#theme-field-notes .fn-can-wipe:disabled{opacity:.4;cursor:default}

/* ---------- footer ---------- */
.fn-footer{background:var(--ink);color:var(--bone);padding:24px 0 calc(28px + var(--safe-b));font-size:13px}
.fn-footer .wrap{display:flex;flex-wrap:wrap;align-items:center;gap:10px 28px}
.fn-footer-mark{font:900 28px/1 var(--display);font-stretch:125%;letter-spacing:-.045em;color:var(--acid)}
.fn-footer .mono{font-size:11px;letter-spacing:.12em}
.fn-footer a{margin-left:auto;font-weight:800;border-bottom:2px solid var(--acid)}
.fn-footer a:hover{color:var(--acid)}

/* ---------- inner pages ---------- */
.fn-page{padding-top:22px;padding-bottom:96px}
.fn-crumbs{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-bottom:38px;font-size:11px;letter-spacing:.1em}
.fn-page>.fn-head{margin-bottom:44px}
.fn-sheet{position:relative;background:var(--card);border:var(--border);box-shadow:10px 10px 0 var(--ink)}
.fn-sheet-head{display:grid;gap:36px;padding:46px 48px 40px;border-bottom:var(--border)}
.fn-sheet-head.has-cover{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);align-items:center}
.fn-sheet-title{display:flex;flex-direction:column;align-items:flex-start;gap:16px;min-width:0}
.fn-sheet-head h1{font:900 clamp(30px,4.2vw,56px)/1.14 var(--display);letter-spacing:-.025em;overflow-wrap:anywhere}
.fn-sheet-lede{font-size:17px;line-height:1.8;color:var(--soft);border-left:6px solid var(--acid);padding-left:14px}
.fn-sheet-exif{font-size:12px;background:var(--ink);color:var(--acid);padding:4px 10px}
.fn-sheet-cover{position:relative;background:#fff;border:var(--border);padding:10px 10px 0;transform:rotate(2deg);box-shadow:7px 7px 0 0 var(--pink),7px 7px 0 3px var(--ink)}
.fn-sheet-cover img{display:block;width:100%;aspect-ratio:4 / 3;object-fit:cover;border:2px solid var(--ink)}
.fn-sheet-cover figcaption{display:flex;justify-content:space-between;gap:8px;padding:9px 2px 10px;font-size:10px}
.fn-sheet-cover .fn-gaffer{width:84px;height:24px;margin-left:-42px;top:-14px}
.fn-sheet-body{padding:40px 48px 54px}
.fn-page-end{display:flex;justify-content:space-between;align-items:center;margin-top:40px}
.fn-lang-pills{display:inline-flex;border:2px solid var(--ink)}
#theme-field-notes .fn-lang-pills button{border:0;border-right:2px solid var(--ink);padding:1px 9px;background:var(--card);font:700 11px/1.6 var(--mono)}
#theme-field-notes .fn-lang-pills button:last-child{border-right:0}
#theme-field-notes .fn-lang-pills button[aria-pressed=true]{background:var(--ink);color:var(--acid)}
.fn-tagwall{display:flex;flex-wrap:wrap;gap:12px}
.fn-404{min-height:62vh;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:18px}
.fn-404 h1{font:400 clamp(130px,25vw,320px)/.8 var(--spray);color:var(--blue)}
.fn-404 p{color:var(--soft)}

/* ---------- print viewer ---------- */
#theme-field-notes dialog#viewer{
  --viewer-ratio:1.5;--print-height:calc(88dvh - 170px);
  width:min(92vw,calc(var(--print-height) * var(--viewer-ratio) + 38px));
  min-width:min(340px,92vw);max-width:1080px;max-height:94dvh;height:fit-content;
  padding:12px;background:var(--card);color:var(--ink);border:var(--border);box-shadow:12px 12px 0 var(--acid);
  overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;
}
#theme-field-notes dialog#viewer[open]{display:block}
#theme-field-notes dialog#viewer::backdrop{background:#17161af0}
#viewer.is-polaroid{padding:16px 16px 0}
#viewer .viewer-image-wrap{
  position:relative;display:block;width:100%;
  aspect-ratio:var(--viewer-ratio,1.5);background:var(--bone);
}
#viewer .viewer-image-wrap img{
  display:block;width:100%;height:100%;object-fit:cover;border:2px solid var(--ink);
}
#viewer:not(.is-polaroid) .viewer-image-wrap img{object-fit:contain;background:#fff}
#viewer #viewer-image.is-developing{animation:fnDevelop 1.1s cubic-bezier(.25,.8,.3,1) both}
#viewer .viewer-image-wrap.is-flipped #viewer-image.is-developing{animation:none;filter:none}
#viewer .viewer-image-wrap.is-flippable{perspective:1800px}
#viewer .viewer-image-wrap.is-flippable #viewer-image,
#viewer .viewer-back{
  -webkit-backface-visibility:hidden;backface-visibility:hidden;
  transform-style:preserve-3d;will-change:transform;
  transition:transform .72s cubic-bezier(.22,1,.36,1);
}
#viewer .viewer-image-wrap.is-flippable #viewer-image{transform:rotateY(0deg) translateZ(1px)}
#viewer .viewer-back{
  position:absolute;inset:0;transform:rotateY(-180deg);pointer-events:none;
  overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;
  display:flex;flex-direction:column;gap:clamp(8px,1.4dvh,14px);
  padding:clamp(18px,4.8%,36px) clamp(22px,6.5%,46px);
  background-color:var(--bone);
  background-image:repeating-linear-gradient(transparent 0 31px,color-mix(in srgb,var(--blue) 24%,transparent) 31px 33px);
  border:2px solid var(--ink);color:var(--ink);font-family:var(--hand);
}
#viewer .viewer-image-wrap.is-flipped #viewer-image{transform:rotateY(180deg);pointer-events:none}
#viewer .viewer-image-wrap.is-flipped .viewer-back{transform:rotateY(0deg) translateZ(1px);pointer-events:auto}
#viewer .viewer-back-title{padding-right:42px;font-size:clamp(21px,min(3.4vw,4dvh),34px);line-height:1.22;text-wrap:balance}
#viewer .viewer-back-desc{font-size:clamp(15px,min(2.1vw,2.5dvh),21px);line-height:1.55;color:var(--blue)}
#viewer .viewer-back-note{display:grid;gap:clamp(4px,.8dvh,8px)}
#viewer .viewer-back-note p{font-size:clamp(14px,min(1.8vw,2.2dvh),18px);line-height:1.58}
#viewer .viewer-back-note .is-bulleted_list::before,
#viewer .viewer-back-note .is-numbered_list::before{content:'· ';color:var(--pink)}
#viewer .viewer-back-note .is-quote{padding-left:.8em;border-left:3px solid var(--pink)}
#viewer .viewer-back-lines{list-style:none;margin:0;padding:0;display:grid;gap:clamp(5px,.9dvh,9px)}
#viewer .viewer-back-lines li{
  display:grid;grid-template-columns:clamp(48px,6.5vw,74px) minmax(0,1fr);
  align-items:baseline;gap:10px;font-size:clamp(14px,min(1.9vw,2.3dvh),19px);
}
#viewer .viewer-back-lines b{font:700 clamp(10px,1.3dvh,12px)/1.4 var(--mono);letter-spacing:.12em;color:var(--blue)}
#viewer .viewer-back-lines span{font-family:var(--mono);font-size:.82em;font-weight:700;letter-spacing:.02em;line-height:1.45}
#viewer .viewer-back-token{display:inline-block;white-space:nowrap}
#viewer .viewer-back-foot{
  margin-top:auto;padding-top:10px;
  display:flex;justify-content:space-between;align-items:flex-end;gap:12px;
}
#viewer .viewer-back-stamp{
  flex:none;padding:5px 10px;border:3px solid var(--red);color:var(--red);
  font:900 clamp(9px,1.3dvh,11.5px)/1.4 var(--display);letter-spacing:.14em;
  text-align:center;transform:rotate(-7deg);transform-origin:left bottom;
}
#viewer .viewer-back-sign{
  margin-left:auto;font-size:clamp(18px,min(2.6vw,2.8dvh),26px);line-height:1.1;
  transform:rotate(-4deg);white-space:nowrap;
}
#viewer .viewer-caption-bar{padding:14px 4px 6px}
#viewer.is-polaroid .viewer-caption-bar{padding:16px 6px 18px}
#viewer .viewer-title-row{display:flex;justify-content:space-between;align-items:center;gap:12px}
#viewer #viewer-title{min-width:0;overflow-wrap:break-word;font:900 20px/1.3 var(--display)}
#viewer.is-polaroid #viewer-title{font-family:var(--hand);font-size:clamp(21px,2.6vw,30px);line-height:1.25;transform:rotate(-.8deg)}
#viewer .viewer-action{flex:none}
#viewer #viewer-caption{white-space:pre-line;margin-top:8px;font-size:15px;line-height:1.6;color:var(--soft)}
#viewer .viewer-meta-row{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:10px;font-size:11px;letter-spacing:.06em;color:var(--muted)}
#viewer #viewer-index{flex:none}
#theme-field-notes #close-viewer{
  position:absolute;top:26px;right:26px;z-index:10;width:42px;height:42px;display:grid;place-items:center;
  background:var(--acid);border:var(--border);box-shadow:3px 3px 0 var(--ink);font-size:24px;line-height:1;
  transition:transform .15s ease;
}
#theme-field-notes #close-viewer:hover{transform:rotate(90deg) scale(1.06)}
#viewer .viewer-pager{display:inline-flex;align-items:center;gap:8px;flex:none}
#theme-field-notes #viewer .viewer-pager button{
  width:32px;height:28px;display:grid;place-items:center;background:var(--card);color:var(--ink);
  border:2px solid var(--ink);box-shadow:2px 2px 0 var(--ink);font-size:14px;line-height:1;
}
#theme-field-notes #viewer .viewer-pager button:hover{background:var(--acid)}
#theme-field-notes #viewer .viewer-pager button:active{transform:translate(2px,2px);box-shadow:none}
#viewer .viewer-flip-btn[aria-pressed=true]{background:var(--acid);color:var(--ink)!important;box-shadow:3px 3px 0 var(--ink)}
#theme-field-notes dialog#viewer[data-orientation=portrait]{
  --print-height:calc(82dvh - 165px);
  min-width:min(92vw,340px);max-width:min(92vw,460px);
}
#theme-field-notes dialog#viewer[data-orientation=portrait] .viewer-back{
  gap:clamp(6px,1.1dvh,11px);
  padding:clamp(16px,4.5%,26px) clamp(18px,6%,28px);
}
#theme-field-notes dialog#viewer[data-orientation=portrait] .viewer-back-title{
  font-size:clamp(19px,min(5vw,3dvh),25px);line-height:1.25;
}
#theme-field-notes dialog#viewer[data-orientation=portrait] .viewer-back-desc{
  font-size:clamp(14px,min(3.8vw,2.1dvh),17px);line-height:1.52;
}
#theme-field-notes dialog#viewer[data-orientation=portrait] .viewer-back-note p{
  font-size:clamp(13px,min(3.5vw,1.9dvh),15.5px);line-height:1.52;
}
#theme-field-notes dialog#viewer[data-orientation=portrait] .viewer-back-lines{
  gap:clamp(4px,.8dvh,7px);
}
#theme-field-notes dialog#viewer[data-orientation=portrait] .viewer-back-lines li{
  grid-template-columns:48px minmax(0,1fr);gap:8px;
  font-size:clamp(13px,min(3.6vw,2dvh),16px);
}
#theme-field-notes dialog#viewer[data-orientation=portrait] .viewer-back-stamp{
  padding:4px 8px;font-size:clamp(8.5px,1.2dvh,10.5px);
}
#theme-field-notes dialog#viewer[data-orientation=portrait] .viewer-back-sign{
  font-size:clamp(16px,2.2dvh,22px);
}

/* ---------- carried-over scenes, re-skinned ---------- */
#theme-field-notes #now.now-section{padding-top:64px;padding-bottom:96px}
#theme-field-notes #now .now-paper{border:var(--border);box-shadow:10px 10px 0 0 var(--pink),10px 10px 0 3px var(--ink);background:var(--card)}
#theme-field-notes .film-strip{border:var(--border);box-shadow:8px 8px 0 0 var(--acid),8px 8px 0 3px var(--ink)}
#theme-field-notes .contact-counter{border:var(--border);box-shadow:4px 4px 0 var(--pink)}
#theme-field-notes .film-frame-title{font-family:var(--hand)}
#theme-field-notes .grease-circle{stroke:var(--acid);stroke-width:4}
#theme-field-notes .article-toc-card{background:var(--bone);border:var(--border);box-shadow:5px 5px 0 var(--ink)}
#theme-field-notes .article-toc-tape{background:var(--pink);border:2px solid var(--ink);height:18px;top:-11px}
#theme-field-notes .article-toc li.is-active a{border-left-color:var(--pink);border-left-width:4px}
#theme-field-notes #notion-article figure.notion-asset-wrapper-image,
#theme-field-notes .article-body>img{border:var(--border);box-shadow:7px 7px 0 var(--ink)}
#theme-field-notes #notion-article .notion-callout,
#theme-field-notes #notion-article .notion-simple-table,
#theme-field-notes #notion-article .notion-bookmark{border:var(--border)!important;box-shadow:6px 6px 0 var(--ink)!important}
#theme-field-notes #notion-article .notion-callout{background:color-mix(in srgb,var(--acid) 42%,var(--card))!important}
#theme-field-notes #notion-article .notion-callout:nth-child(even){background:color-mix(in srgb,var(--pink) 20%,var(--card))!important}
#theme-field-notes #notion-article .notion-callout::after{display:none}
#theme-field-notes #notion-article .notion-callout::before,
#theme-field-notes #notion-article figure.notion-asset-wrapper-image::before{border:2px solid var(--ink);background:var(--pink)}
#theme-field-notes #notion-article .notion-callout:nth-child(even)::before{background:var(--acid)}
#theme-field-notes #notion-article .notion-inline-code{background:var(--acid)!important;border:2px solid var(--ink)}
#theme-field-notes #notion-article pre.notion-code{border:var(--border)!important;box-shadow:6px 6px 0 var(--pink)!important}
#theme-field-notes #notion-article .notion-h1 .notion-h-title,
#theme-field-notes #notion-article .notion-h2 .notion-h-title{font-family:var(--display);font-weight:900;letter-spacing:-.015em}
#theme-field-notes #notion-article .notion-h3 .notion-h-title{font-family:var(--display);font-weight:900;background:linear-gradient(transparent 68%,color-mix(in srgb,var(--pink) 55%,transparent) 68%)}
#theme-field-notes #notion-article a{color:var(--blue);font-weight:700;text-decoration-thickness:2px}
#theme-field-notes #notion-article a:hover{background:var(--acid);color:var(--ink)}
#theme-field-notes #notion-article .notion-quote{font-family:var(--hand)!important}

/* ---------- responsive ---------- */
@media(max-width:1280px){
  .fn-head-note{display:none}
  .fn-head{grid-template-columns:auto minmax(0,1fr)}
}
/* the rail has just appeared and the column is narrow */
@media(min-width:1100px) and (max-width:1279px){
  .fn-wordmark{font-size:12.6vw}
  .fn-header .brand-note{display:none}
}
@media(max-width:1099px){
  #theme-field-notes{--rail-w:0px;--pad-l:32px;--pad-r:32px}
  .fn-shell.is-home{--pad-l:32px}
  .fn-rail{display:none}

  .fn-strip{display:block;position:relative;z-index:5;background:var(--ink);color:var(--bone);border-bottom:var(--border);padding:22px 0 20px}
  .fn-strip-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:0 var(--pad-r) 0 var(--pad-l);font:700 11px/1.4 var(--mono);letter-spacing:.14em}
  #theme-field-notes .fn-strip-head button{background:var(--acid);color:var(--ink);border:2px solid var(--ink);padding:3px 8px;font:inherit}
  .fn-strip-row{position:relative;display:flex;gap:16px;overflow-x:auto;padding:26px var(--pad-r) 12px var(--pad-l);scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .fn-strip-row::-webkit-scrollbar{display:none}
  .fn-clip.is-flat{flex:0 0 auto;margin:0}
  .fn-clip.is-flat .fn-clip-jaw{left:50%;margin-left:-11px}
  .fn-clip.is-flat .fn-pola{width:134px;padding:7px 7px 0;transform-origin:50% 0}
  .fn-clip.is-flat .fn-pola-mini{font-size:10px;padding:5px 1px 6px}
}
@media(max-width:1000px){
  .fn-posters{grid-template-columns:repeat(2,minmax(0,1fr))}
  .fn-proj{grid-template-columns:1fr}
  .fn-proj-visual{border-left:0;border-top:var(--border)}
  .fn-sheet-head.has-cover{grid-template-columns:1fr}
  .fn-sheet-cover{max-width:420px}
}
@media(max-width:900px){
  .nav-dock,.fn-header .brand-note{display:none}
  #theme-field-notes .mobile-dock-btn{
    display:inline-flex;align-items:center;gap:9px;margin-left:auto;height:44px;padding:0 12px;
    background:var(--card);color:var(--ink);border:var(--border);box-shadow:4px 4px 0 var(--ink);font-weight:800;font-size:13px;
  }
  #theme-field-notes .mobile-dock-btn.is-open{background:var(--acid)}
  .fn-bill{grid-template-columns:1fr}
  .fn-bill-cover{min-height:0;aspect-ratio:16 / 10;border-right:0;border-bottom:var(--border)}
  .fn-closing>.fn-crown,.fn-closing>.fn-burst{display:none}
  .fn-closing h2{max-width:100%}
}
/* tablets and unfolded foldables keep the two-column hero; phones stack it */
@media(max-width:760px){
  .fn-hero{padding-bottom:86px}
  .fn-hero-grid{grid-template-columns:1fr;gap:44px}
  .fn-collage{height:clamp(380px,82vw,560px);max-width:560px}
}
@media(max-width:720px){
  #theme-field-notes{--pad-l:20px;--pad-r:20px}
  .fn-shell.is-home{--pad-l:20px}
  #theme-field-notes{--hdr:78px}
  .fn-logo{height:44px;font-size:26px}
  .fn-issue{font-size:9px;letter-spacing:.1em}
  .fn-wordmark{-webkit-text-stroke-width:4px}
  .fn-intro{font-size:15px}
  .fn-collage-note{font-size:19px}
  .fn-roundel{width:98px;height:98px;font-size:15px}
  .fn-roundel span{font-size:19px}
  .fn-print{padding:8px 8px 0;box-shadow:7px 7px 0 var(--ink)}
  .fn-print-label{font-size:15px;padding:7px 2px 9px}
  .fn-tape{font-size:15px}
  .fn-head{grid-template-columns:minmax(0,1fr);gap:10px;margin-bottom:28px}
  .fn-head-no{font-size:68px;justify-self:start;margin-left:0}
  .fn-posters{grid-template-columns:1fr;gap:38px}
  .fn-bill{box-shadow:7px 7px 0 0 var(--blue),7px 7px 0 3px var(--ink)}
  .fn-bill-copy,.fn-proj-copy{padding:24px 20px 26px}
  .fn-proj{box-shadow:8px 8px 0 var(--acid)}
  .fn-proj-visual{padding:26px 18px 18px}
  .fn-closing{padding:72px 0 190px}
  .fn-cans{left:var(--pad-l);right:var(--pad-r);align-items:flex-start}
  .fn-sheet{box-shadow:7px 7px 0 var(--ink)}
  .fn-sheet-head{padding:28px 20px 26px}
  .fn-sheet-body{padding:26px 20px 36px}
  .fn-crumbs>.mono{display:none}
  .fn-footer a{margin-left:0}
  #theme-field-notes dialog#viewer{--print-height:calc(84dvh - 150px);padding:8px;box-shadow:7px 7px 0 var(--acid);max-height:95dvh;min-width:min(94vw,290px);width:min(94vw,calc(var(--print-height) * var(--viewer-ratio) + 22px))}
  #theme-field-notes dialog#viewer[data-orientation=portrait]{--print-height:calc(78dvh - 150px);min-width:min(92vw,280px);max-width:min(92vw,380px)}
  #viewer.is-polaroid{padding:10px 10px 0}
  #viewer.is-polaroid .viewer-caption-bar{padding:12px 4px 12px}
  #viewer #viewer-caption{font-size:13px}
  #theme-field-notes #close-viewer{top:16px;right:16px;width:36px;height:36px;font-size:20px}
  #theme-field-notes #viewer .viewer-pager button{width:40px;height:34px}
  #viewer .viewer-back{padding:clamp(14px,4.5%,22px) clamp(16px,5.5%,24px)}
}

/* ---------- motion ---------- */
@keyframes fnTape{to{transform:translateX(-25%)}}
@keyframes fnPulse{0%{transform:scale(1);opacity:.6}70%,100%{transform:scale(2.5);opacity:0}}
@keyframes fnWiggle{0%,100%{transform:translateX(0)}25%{transform:translateX(6px) rotate(1deg)}75%{transform:translateX(-4px) rotate(-1deg)}}
@keyframes fnDevelop{
  0%{filter:brightness(1.85) contrast(.42) saturate(.15) sepia(.12)}
  45%{filter:brightness(1.28) contrast(.72) saturate(.55) sepia(.08)}
  100%{filter:none}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  #theme-field-notes *,#theme-field-notes *::before,#theme-field-notes *::after{transition:none!important;animation:none!important}
}

${themeConsoleStyle('field-notes', CONFIG)}
    `}</style>
  )
}

export { Style }
