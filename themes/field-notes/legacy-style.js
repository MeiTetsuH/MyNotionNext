/* eslint-disable react/no-unknown-property */
/**
 * Styles carried over from the previous field-notes look for the parts whose
 * markup did not change: the home lab scene, Notion article blocks and the
 * contact sheet. Colours resolve through the tokens in style.js.
 * Loaded before <Style />, so anything in style.js wins.
 */
export const LegacyStyle = () => (
  <style jsx global>{`
/* ===== Home lab scene (LabFigure, StackStickers, NowSection) ===== */
.now-section {
    padding: 7px 0 84px
}
.now-paper {
    display: grid;
    grid-template-columns: 35% 65%;
    position: relative;
    border: var(--border);
    background: var(--green);
    box-shadow: 6px 6px var(--ink);
    transform: rotate(.65deg)
}
.now-art {
    position: relative;
    min-height: 340px;
    border-right: 2px dashed #20211e60;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 51px;
    overflow: hidden
}
.now-copy {
    padding: 40px 85px 35px 42px
}
.now-copy .eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 9px
}
.now-copy .status-dot {
    background: var(--ink);
    width: 6px;
    height: 6px
}
.now-copy h2 {
    font-size: 29px;
    font-weight: 900;
    letter-spacing: -1px;
    margin-bottom: 18px
}
.now-copy>p {
    max-width: 500px;
    font-size: 13px;
    line-height: 1.9
}
.now-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 17px 0 23px
}
.now-tags span {
    font-size: 10px;
    border: 1px solid #20211e70;
    padding: 2px 9px
}
html[lang=en] .now-copy h2,html[lang=ja] .now-copy h2 {
    font-size: 26px
}
@media(max-width:1050px) {
    .now-copy {
        padding: 36px 58px 28px 29px
    }
    .now-copy h2 {
        font-size: 25px
    }
    .now-art {
        min-height: 330px
    }
    .now-copy .eyebrow {
        font-size: 8px
    }
    .now-copy>p {
        font-size: 12px
    }
}
@media(max-width:720px) {
    .now-section {
        padding: 6px 0 53px
    }
    .now-paper {
        grid-template-columns: 1fr;
        transform: rotate(.4deg);
        box-shadow: 5px 5px var(--ink)
    }
    .now-art {
        display: none
    }
    .now-copy {
        padding: 29px 25px
    }
    .now-copy h2 {
        font-size: 26px;
        padding-right: 8px
    }
    .now-copy .eyebrow {
        font-size: 7px;
        margin-bottom: 18px;
        gap: 6px
    }
    .now-copy>p {
        font-size: 12px
    }
    .now-tags span {
        font-size: 9px
    }
    .now-tags {
        gap: 6px
    }
    html[lang=en] .now-copy h2,html[lang=ja] .now-copy h2 {
        font-size: 25px
    }
}
.now-tags>.openclaw-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--purple);
    border: 1px solid var(--ink);
    box-shadow: 2px 2px var(--ink);
    transform: rotate(-3deg);
    font-weight: 700;
    padding: 2px 10px
}
.now-art {
    padding: 52px 15px 20px;
    justify-content: center;
    min-height: 565px
}
.now-copy {
    align-self: center;
    padding-top: 42px;
    padding-bottom: 38px
}
.now-tags {
    margin-top: 22px
}
@media(max-width:720px) {
    .now-art {
        display: flex;
        min-height: 0;
        padding: 45px 14px 12px;
        border-right: 0;
        border-bottom: 2px dashed #20211e60
    }
    .now-copy {
        padding: 26px 25px 28px
    }
    .now-copy .eyebrow {
        margin-bottom: 13px
    }
}
.intro,.project-copy>p:not(.project-deck),.now-copy>p {
    font-size: 16px
}
@media(max-width:720px) {
    .intro,.project-copy>p:not(.project-deck),.now-copy>p,.studio-notes p,.notes {
        font-size: 16px;
        line-height: 1.8
    }
    .tags span,.now-tags span {
        font-size: 12px
    }
}
#now.now-section {
    padding: 58px 0 80px
}
@media(max-width:720px) {
    #now.now-section {
        padding: 36px 0 54px
    }
}
#now .now-paper {
    grid-template-columns: minmax(0,.93fr) minmax(0,1.07fr);
    background: var(--paper);
    transform: none;
    box-shadow: 7px 7px var(--ink);
    align-items: stretch
}
#now .lab-art {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    align-self: start;
    position: relative;
    min-width: 0;
    background: var(--green);
    padding: 36px 24px 32px;
    border-right: 2px solid var(--ink);
    width: 100%;
    height: 100%;
    gap: 24px;
    container-type: inline-size;
    container-name: labart
}
#now .lab-art-label {
    align-self: flex-start;
    font-size: 12px;
    letter-spacing: 1.2px;
    line-height: 1.5;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 7px
}
#now .lab-devices {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1197 / 1314;
    object-fit: contain;
    margin: 0
}
#now .lab-handwritten {
    font: italic clamp(18px,2vw,25px)/1.4 Georgia,serif;
    align-self: flex-start;
    padding: 0 8px;
    transform: rotate(-3deg)
}
#now .lab-copy {
    padding: 44px clamp(28px,3.4vw,50px) 34px;
    align-self: start;
    min-width: 0
}
#now .lab-copy .eyebrow {
    font-size: 11px;
    letter-spacing: 1.2px;
    line-height: 1.6;
    margin-bottom: 25px
}
#now .lab-copy h2 {
    font-size: clamp(30px,3.4vw,47px);
    line-height: 1.25;
    letter-spacing: -1.2px;
    margin: 0 0 24px;
    padding: 0;
    text-wrap: balance
}
#now .lab-intro {
    font-size: 16px;
    line-height: 1.85;
    max-width: none;
    color: #45463f
}
#now .lab-chapters {
    list-style: none;
    margin: 30px 0 28px;
    padding: 0;
    display: grid;
    gap: 23px
}
#now .lab-chapters li {
    display: grid;
    grid-template-columns: 34px minmax(0,1fr);
    gap: 15px;
    align-items: start
}
#now .lab-number {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    color: #7551b5;
    letter-spacing: .5px
}
#now .lab-chapters h3 {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 750;
    margin: 0 0 3px
}
#now .lab-chapters p {
    font-size: 14px;
    line-height: 1.65;
    color: #4c4d46;
    overflow-wrap: break-word
}
#now .lab-notebook {
    border-top: 2px solid var(--ink);
    margin-top: 14px;
    font-size: 16px
}
#now .lab-notebook summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 52px;
    gap: 18px;
    padding: 13px 6px;
    line-height: 1.6;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    outline: none;
    transition: background .15s,box-shadow .15s,padding .15s
}
#now .lab-notebook summary:hover {
    background: #dfd2fb22
}
#now .lab-notebook[open] summary {
    background: #dfd2fb30;
    border: 2px solid var(--purple);
    box-shadow: 3px 3px var(--ink);
    padding: 11px 14px;
    margin-bottom: 18px
}
#now .lab-notebook summary::-webkit-details-marker {
    display: none
}
#now .lab-notebook[open] .details-icon {
    transform: rotate(45deg)
}
#now .lab-note-content {
    padding: 10px 0 21px;
    display: grid;
    gap: 23px
}
#now .lab-note-content h3 {
    font-size: 16px;
    line-height: 1.6;
    margin: 0 0 6px
}
#now .lab-note-content p {
    font-size: 14px;
    line-height: 1.85;
    color: #4c4d46;
    margin: 0
}
#now .lab-photo-flow {
    margin-top: 12px;
    padding-left: 15px;
    border-left: 2px solid var(--purple);
    display: grid;
    gap: 8px
}
#now .lab-topics {
    font-size: 12px;
    line-height: 1.8;
    letter-spacing: .3px;
    color: var(--muted);
    max-width: none;
    margin-top: 8px
}
@media(min-width:721px) and (max-width:1000px) {
    #now .now-paper {
        grid-template-columns: minmax(0,.85fr) minmax(0,1.15fr)
    }
    #now .lab-art {
        padding: 26px 15px;
        gap: 26px
    }
    #now .lab-copy {
        padding: 30px 24px 25px
    }
    #now .lab-copy h2 {
        font-size: 32px
    }
    #now .lab-chapters {
        gap: 20px;
        margin: 25px 0
    }
    #now .lab-chapters li {
        gap: 10px;
        grid-template-columns: 28px minmax(0,1fr)
    }
    #now .lab-chapters h3 {
        font-size: 17px
    }
    #now .lab-handwritten {
        font-size: 18px
    }
}
@media(max-width:720px) {
    #now .now-paper {
        grid-template-columns: minmax(0,1fr);
        box-shadow: 5px 5px var(--ink)
    }
    #now .lab-art {
        padding: 23px 21px 25px;
        border-right: 0;
        border-bottom: 2px solid var(--ink);
        height: auto;
        gap: 14px
    }
    #now .lab-art-label {
        font-size: 11px
    }
    #now .lab-devices {
        width: min(100%,390px);
        margin: 0 auto
    }
    #now .lab-handwritten {
        font-size: 20px;
        align-self: center
    }
    #now .lab-copy {
        padding: 29px 24px 24px
    }
    #now .lab-copy .eyebrow {
        font-size: 10px;
        letter-spacing: 1px;
        margin-bottom: 18px
    }
    #now .lab-copy h2 {
        font-size: clamp(28px,7.3vw,40px);
        letter-spacing: -.8px;
        margin-bottom: 20px
    }
    #now .lab-intro {
        font-size: 16px;
        line-height: 1.85
    }
    #now .lab-chapters {
        gap: 23px;
        margin: 27px 0
    }
    #now .lab-chapters li {
        grid-template-columns: 26px minmax(0,1fr);
        gap: 12px
    }
    #now .lab-number {
        font-size: 17px
    }
    #now .lab-chapters h3 {
        font-size: 17px
    }
    #now .lab-chapters p,#now .lab-note-content p {
        font-size: 16px;
        line-height: 1.75
    }
    #now .lab-notebook summary {
        font-size: 16px;
        min-height: 52px
    }
    #now .lab-topics {
        font-size: 12px;
        line-height: 1.8
    }
}
#now .lab-stack-board {
    --u: 50px;
    --note-fs: 12px;
    display: none;
    width: 100%;
    position: relative;
    background-color: #fffef8;
    background-image: radial-gradient(#20211e22 1.1px,transparent 1.1px);
    background-size: 13px 13px;
    border: var(--border);
    box-shadow: 6px 6px var(--ink);
    padding: 34px 14px 22px;
    transform: rotate(-.5deg);
    animation: labStickersReveal .24s cubic-bezier(.22,1,.36,1);
    box-sizing: border-box;
    margin-top: 14px;
}
@supports (width:1cqi) {
    #now .lab-stack-board {
        --u: clamp(32px,14cqi,50px);
        --note-fs: clamp(10px,3.6cqi,12px);
    }
}
@media(min-width:1280px) {
    #now .now-paper.is-notebook-open .lab-art {
        align-self: stretch;
        height: 100%;
    }
}
#now .now-paper.is-notebook-open .lab-stack-art,
#now .now-paper:has(.lab-notebook[open]) .lab-stack-art {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 560px;
}
#now .lab-stack-inline {
    display: none;
}
@media(max-width:1279px) {
    #now .now-paper.is-notebook-open .lab-stack-art,
  #now .now-paper:has(.lab-notebook[open]) .lab-stack-art {
        display: none!important
    }
    #now .lab-notebook[open] .lab-stack-inline {
        display: flex;
        flex-direction: column;
        margin-top: 24px;
    }
}
#now .lab-stack-tag {
    position: absolute;
    top: -12px;
    left: 14px;
    transform: rotate(-2deg);
    background: var(--pink)d9;
    border-left: 1px dashed #5d417345;
    border-right: 1px dashed #5d417345;
    padding: 3px 12px;
    font: 800 10px/1.3 ui-monospace,Menlo,monospace;
    letter-spacing: .8px;
    color: var(--ink);
    box-shadow: 2px 2px var(--ink);
    z-index: 6;
    white-space: nowrap;
}
#now .lab-stack-wall {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 4px;
}
#now .lab-row {
    list-style: none;
    margin: 0;
    padding: 0 var(--ind,0);
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
    align-items: center;
    gap: 6px 4px;
    position: relative;
}
#now .lab-row+.lab-row {
    margin-top: calc(var(--u)*-.14)
}
#now .lab-row.is-start {
    justify-content: flex-start
}
#now .lab-row.is-end {
    justify-content: flex-end
}
#now .lab-row.is-center {
    justify-content: center
}
#now .lab-row.is-spread {
    justify-content: space-between
}
#now .lab-row>li {
    --r: 0deg;
    --s: 1;
    --y: 0px;
    flex: none;
    position: relative;
    transform: translateY(var(--y)) rotate(var(--r));
    transition: transform .18s cubic-bezier(.34,1.56,.64,1),z-index .18s;
}
@media (hover:hover) and (pointer:fine) {
    #now .lab-row>li:hover {
        transform: translateY(calc(var(--y) - 5px)) rotate(calc(var(--r) + 3deg)) scale(1.1);
        z-index: 10;
    }
    #now .lab-sticker:hover::after {
        opacity: 1
    }
}
#now .lab-sticker {
    width: calc(var(--u)*var(--s));
    aspect-ratio: 1;
    margin: 0 -2px;
    cursor: pointer;
}
#now .lab-sticker svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    stroke: var(--ink);
    stroke-width: 2.8;
    stroke-linejoin: round;
    stroke-linecap: round;
    filter: drop-shadow(calc(var(--s)*2.5px) calc(var(--s)*3.2px) 0 var(--ink));
}
#now .lab-sticker::after {
    content: attr(data-name);
    position: absolute;
    left: 50%;
    bottom: -24px;
    transform: translateX(-50%) rotate(calc(var(--r)*-1));
    background: var(--ink);
    color: #fffef8;
    font: 800 9px/1 ui-monospace,Menlo,monospace;
    padding: 3px 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity .15s;
    box-shadow: 2px 2px var(--purple);
    z-index: 12;
}
#now .lab-note {
    background: #fff3a8;
    border: 1.5px solid var(--ink);
    box-shadow: 2.5px 3px 0 var(--ink);
    padding: 6px 10px;
    margin: 0 4px;
    font: italic var(--note-fs)/1.2 Georgia,"Noto Serif SC","Source Han Serif SC","Songti SC",STSong,serif;
    color: var(--ink);
    white-space: nowrap;
    cursor: default;
    position: relative;
}
#now .lab-note::before {
    content: "";
    position: absolute;
    top: -7px;
    left: 50%;
    width: 30px;
    height: 11px;
    transform: translateX(-50%) rotate(-2.5deg);
    background: var(--pink)d9;
    border-left: 1px dashed #5d417345;
    border-right: 1px dashed #5d417345;
    box-shadow: 0 1px 2px rgba(0,0,0,.06);
    pointer-events: none;
}
#now .lab-tape {
    padding: 5px 14px;
    margin: 0 3px;
    font: 800 calc(var(--note-fs) - 2px)/1.2 ui-monospace,Menlo,monospace;
    color: var(--ink);
    white-space: nowrap;
    cursor: default;
    border: 1px solid rgba(32,33,30,.2);
    filter: drop-shadow(1.5px 2px 0 var(--ink));
    clip-path: polygon(0 0,100% 0,97% 25%,100% 50%,97% 75%,100% 100%,0 100%,3% 75%,0 50%,3% 25%);
}
#now .lab-tape-blue {
    background: repeating-linear-gradient(135deg,#bfe0ff 0 6px,#d9eeff 6px 12px)
}
#now .lab-tape-yellow {
    background: repeating-linear-gradient(135deg,#e3fb96 0 6px,#f2fdc5 6px 12px)
}
#now .lab-tape-purple {
    background: repeating-linear-gradient(135deg,#e0d4fc 0 6px,#f0eaff 6px 12px)
}
#now .lab-stamp {
    --c: #d9402f;
    width: calc(var(--u)*1.35);
    aspect-ratio: 1;
    color: var(--c);
    opacity: .88;
    mix-blend-mode: multiply;
    cursor: default;
    user-select: none;
}
#now .lab-stamp svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible
}
#now .lab-stamp text {
    font-family: ui-monospace,Menlo,monospace;
    font-weight: 800
}
#now .lab-stamp .lab-stamp-big {
    font-weight: 900;
    letter-spacing: .5px
}
#now .lab-stamp-red {
    --c: #d9402f
}
#now .lab-stamp-green {
    --c: #1e9e54
}
#now .lab-stamp-blue {
    --c: #2a69ac
}
#now .lab-doodle {
    margin: 0 2px;
    opacity: .85
}
#now .lab-doodle svg {
    display: block;
    width: calc(var(--u)*.55);
    height: auto;
    stroke: var(--ink);
    stroke-width: 2.4;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round
}
@media(max-width:720px) {
    #now .now-paper.is-notebook-open .lab-stack-art,
  #now .now-paper:has(.lab-notebook[open]) .lab-stack-art {
        display: none!important
    }
    #now .lab-notebook[open] .lab-stack-inline {
        display: flex;
        flex-direction: column;
        margin-top: 24px;
    }
    #now .lab-stack-board {
        --u: 42px;
        --note-fs: 11px;
        padding: 26px 8px 18px;
        margin-top: 16px;
    }
    #now .lab-row {
        justify-content: center!important;
        gap: 5px 3px;
    }
    #now .lab-row+.lab-row {
        margin-top: calc(var(--u)*-.08);
    }
    #now .lab-stack-wall .is-minor {
        display: none!important;
    }
    #now .lab-note {
        padding: 5px 7px;
        margin: 0 2px;
    }
    #now .lab-note::before {
        width: 22px;
        height: 9px;
        top: -6px;
    }
    #now .lab-tape {
        padding: 4px 9px;
        margin: 0 2px;
    }
}
@media(max-width:520px) {
    #now .lab-stack-board {
        --u: 38px;
        --note-fs: 10.5px;
        padding: 24px 6px 16px;
    }
    #now .lab-row {
        padding: 0;
        gap: 4px 2px;
    }
    #now .lab-sticker {
        margin: 0 -3px;
    }
}
@media(prefers-reduced-motion:reduce) {
    #now .lab-stack-board {
        animation: none
    }
    #now .lab-row>li,#now .lab-sticker::after {
        transition: none
    }
}
.lab-notion-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 12px;
    margin-bottom: 20px;
}
.lab-notion-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fffdf5;
    border: var(--border);
    padding: 11px 16px;
    box-shadow: 3px 3px var(--ink);
    transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
    text-decoration: none;
    color: var(--ink);
}
.lab-notion-card:hover {
    transform: translate(2px, -2px);
    box-shadow: 5px 5px var(--purple);
    background: var(--paper);
}
.small-tag,
      .article-card-category,
      .note-cat,
      .project-top,
      .project-caption,
      .window-bar .mono,
      .tags span,
      .filters button,
      .eyebrow,
      .now-copy .eyebrow,
      .closing .eyebrow,
      .article-window-bar,
      .article-cover-caption,
      .article-lang-pills button,
      .article-lang-fallback,
      .zoom-hint,
      .hero-foot,
      .brand-subline,
      .photo-label,
      .sky-photo .photo-label,
      #viewer-index,
      footer,
      footer .mono,
      .rope-header-tag,
      .rope-more-pendant,
      .rope-active-date,
      .rope-full-caption .rope-sub {
    font-size: 11px;
}
#now .lab-figure {
    position: relative;
    width: 100%;
    margin: 0;
}
#now .lab-figure .lab-devices {
    width: 100%;
    margin: 0;
}
#now .lab-figure-ink {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
}
#now .lab-cloud {
    fill: #ffe4c4;
    stroke: var(--ink);
    stroke-width: 2.2;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
}
#now .lab-tunnel {
    fill: none;
    stroke: #2b2c27;
    stroke-width: 2;
    stroke-dasharray: 2 7;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    opacity: .75
}
#now .lab-tunnel-head {
    fill: none;
    stroke: #2b2c27;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
    opacity: .75
}
#now .lab-leader path {
    fill: none;
    stroke: var(--ink);
    stroke-width: 1.4;
    stroke-dasharray: 4 3;
    vector-effect: non-scaling-stroke;
}
#now .lab-leader circle {
    fill: var(--ink);
}
#now .lab-led-pulse {
    fill: none;
    stroke: #22c065;
    stroke-width: 2;
    vector-effect: non-scaling-stroke;
    transform-box: fill-box;
    transform-origin: center;
    animation: labLedPulse 2.4s ease-out infinite;
}
#now .lab-led-pulse.is-late {
    animation-delay: 1.2s;
}
#now .lab-callout {
    position: absolute;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 5px 9px 6px;
    background: #fffef8;
    border: 1.5px solid var(--ink);
    box-shadow: 2px 2px var(--ink);
    transform: rotate(var(--r));
    font-size: 11px;
    line-height: 1.35;
    white-space: nowrap;
}
#now .lab-callout strong {
    font-weight: 800;
}
#now .lab-callout span {
    font-size: 11px;
    color: #4c4d46;
}
#now .lab-art {
    justify-content: space-between;
}
#now .lab-callout-cloud {
    background: #fff1e0;
}
#now .lab-callout-muse {
    background: #f3e8ff;
}
#now .lab-callout-cable {
    background: #fff3a8;
}
#now .lab-callout-claw strong {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
}
#now .lab-art-strip {
    --u: 40px;
    list-style: none;
    margin: 26px 0 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px 8px;
}
#now .lab-art-strip > li {
    position: relative;
    transform: translateY(var(--y)) rotate(var(--r));
    transition: transform 0.2s ease;
}
#now .lab-art-strip > li:hover {
    transform: translateY(calc(var(--y) - 3px)) rotate(0deg) scale(1.08);
}
#now .now-paper.is-notebook-open .lab-art-strip,
      #now .now-paper:has(.lab-notebook[open]) .lab-art-strip {
    display: none;
}
@media (max-width: 720px) {
    #now .lab-figure {
        width: min(100%, 390px);
        margin: 0 auto;
    }
}
@media (prefers-reduced-motion: reduce) {
    #now .lab-led-pulse {
        animation: none;
        opacity: 0;
    }
    #now .lab-art-strip > li {
        transition: none;
    }
}
@media (max-width: 720px) {
    #now .lab-strip-wrap {
        flex-wrap: wrap;
        gap: 10px;
    }
    #now .lab-strip-label {
        flex-basis: 100%;
    }
}
#now button.lab-callout {
    font: inherit;
    font-size: 11px;
    color: var(--ink);
    text-align: left;
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
#now button.lab-callout:hover,
    #now button.lab-callout:focus-visible {
    transform: rotate(0deg) translateY(-2px);
    box-shadow: 3px 4px var(--ink);
    outline: none;
}
#now button.lab-callout.is-active {
    background: var(--ink);
    color: var(--green);
    transform: rotate(0deg) scale(1.04);
    z-index: 5;
}
#now button.lab-callout.is-active span {
    color: var(--bone);
}
#now .lab-figure.has-active button.lab-callout:not(.is-active) {
    opacity: 0.55;
}
#now .lab-leader.is-active path {
    stroke-dasharray: none;
    stroke-width: 2.4;
}
#now .lab-art {
    justify-content: space-between;
}
#now .lab-stage {
    width: 100%;
    display: grid;
    gap: 14px;
}
#now .lab-figure {
    position: relative;
    width: 100%;
    margin: 0;
}
#now .lab-art-img {
    display: block;
    width: 100%;
    height: auto;
}
#now .lab-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
}
#now .lab-overlay text,
    #now .lab-ruler text {
    font-family: 'SFMono-Regular', Menlo, Consolas, 'PingFang SC', 'Hiragino Sans', monospace;
}
#now .lab-ruler {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
}
#now .lab-term text {
    fill: var(--bone);
}
#now .lab-term .lab-term-clock {
    font-size: 24px;
    font-weight: 700;
    fill: var(--green);
    letter-spacing: 0.5px;
}
#now .lab-term .lab-term-line {
    font-size: 19px;
    fill: #d9dad2;
}
#now .lab-term .lab-term-count {
    font-size: 66px;
    font-weight: 800;
    letter-spacing: 1px;
}
#now .lab-term .lab-term-count.is-busy {
    fill: var(--green);
}
#now .lab-term .lab-term-cursor {
    fill: var(--green);
    animation: labCursor 1s steps(1) infinite;
}
#now .lab-term .lab-term-foot {
    font-size: 20px;
    fill: #a9aaa2;
}
#now .lab-led-ring {
    fill: none;
    stroke: #3ddc97;
    stroke-width: 4;
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    animation: labLedGlow 3.2s ease-in-out infinite;
}
#now .lab-led-ring.is-beating {
    animation: labLedBeat 1s ease-out infinite;
}
#now .lab-muse-bubble {
    position: absolute;
    /* empty band above Muse's head, clear of the washi tape */
    left: 12.5%;
    top: 0.4%;
    z-index: 3;
    max-width: 25%;
    padding: 0.35em 0.8em;
    background: #fffdf5;
    border: 2px solid var(--ink);
    border-radius: 12px 12px 12px 2px;
    box-shadow: 2px 2px var(--ink);
    font-size: clamp(9px, 2.3cqi, 12px);
    line-height: 1.35;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: rotate(-3deg);
    pointer-events: none;
}
#now .lab-muse-bubble.is-busy {
    background: var(--ink);
    color: var(--green);
}
#now .lab-hotspot {
    position: absolute;
    z-index: 2;
    padding: 0;
    background: transparent;
    border: 2px dashed transparent;
    border-radius: 16px;
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease;
}
#now .lab-hotspot:hover,
    #now .lab-hotspot:focus-visible {
    border-color: rgba(32, 33, 30, 0.55);
    background: rgba(255, 253, 245, 0.18);
    outline: none;
}
#now .lab-hotspot.is-selected {
    border: 2.5px solid var(--ink);
    background: rgba(255, 253, 245, 0.22);
}
#now .lab-hotspot.is-on::after {
    content: '';
    position: absolute;
    top: 6%;
    right: 8%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--blue);
    border: 2px solid var(--ink);
    animation: labBusyDot 1.2s ease-in-out infinite;
}
#now .lab-ruler-title {
    font-size: 12px;
    letter-spacing: 1.5px;
    fill: #2f3a12;
}
#now .lab-ruler-base {
    stroke: rgba(32, 33, 30, 0.22);
    stroke-width: 4;
    stroke-linecap: round;
}
#now .lab-ruler-past {
    stroke: var(--ink);
    stroke-width: 4;
    stroke-linecap: round;
}
#now .lab-ruler-tick {
    stroke: var(--ink);
    stroke-width: 1.2;
    opacity: 0.45;
}
#now .lab-ruler-tick.is-major {
    opacity: 0.9;
    stroke-width: 1.8;
}
#now .lab-ruler-hour {
    font-size: 11.5px;
    fill: #2f3a12;
}
#now .lab-ruler-trend {
    fill: #fffdf5;
    stroke: var(--ink);
    stroke-width: 1.6;
}
#now .lab-ruler-trend.is-past {
    fill: #8f9187;
    stroke: #8f9187;
}
#now .lab-ruler-group rect {
    fill: #fffdf5;
    stroke: var(--ink);
    stroke-width: 2.2;
}
#now .lab-ruler-group.is-muse rect {
    fill: #b19aea;
}
#now .lab-ruler-leader {
    stroke: var(--ink);
    stroke-width: 1.4;
    stroke-dasharray: 2 3;
}
#now .lab-ruler-label {
    font-size: 12.5px;
    font-weight: 700;
    fill: var(--ink);
}
#now .lab-ruler-group.is-past rect {
    fill: #d8d9cf;
    stroke: #8f9187;
}
#now .lab-ruler-group.is-past .lab-ruler-label {
    fill: #5d6b2a;
    font-weight: 500;
}
#now .lab-ruler-group.is-past .lab-ruler-leader {
    stroke: #8f9187;
}
#now .lab-ruler-group.is-busy rect {
    fill: #fffdf5;
    stroke-width: 3;
    animation: labBusy 1.2s ease-in-out infinite;
}
#now .lab-ruler-now line {
    stroke: #d9402f;
    stroke-width: 3;
    stroke-linecap: round;
}
#now .lab-ruler-now rect {
    fill: #d9402f;
}
#now .lab-ruler-now text {
    font-size: 10px;
    font-weight: 700;
    fill: #fffdf5;
}
@media (min-width: 1280px) {
    #now .lab-art {
        align-self: stretch;
        height: auto;
    }
}
@media (min-width: 721px) and (max-width: 1279px) {
    #now .now-paper {
        grid-template-columns: minmax(0, 1fr);
    }
    #now .lab-art {
        border-right: 0;
        border-bottom: 2px solid var(--ink);
        padding: 30px 36px 26px;
        height: auto;
        gap: 18px;
    }
    #now .lab-stage {
        max-width: 660px;
        margin: 0 auto;
    }
    #now .lab-handwritten {
        align-self: center;
    }
}
@media (max-width: 720px) {
    #now .lab-figure {
        width: 100%;
    }
}
#now .lab-note-card {
    position: relative;
    margin: 26px 0 0;
    padding: 18px 18px 16px;
    background: #fffef8;
    border: 2px dashed rgba(32, 33, 30, 0.45);
    transform: rotate(-0.4deg);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
#now .lab-note-card.is-art {
    display: none;
}
@media (max-width: 1279px) {
    #now .lab-note-card.is-art {
        display: block;
        width: 100%;
        max-width: 660px;
        margin: 8px auto 0;
        box-sizing: border-box;
    }
    #now .lab-note-card.is-copy {
        display: none;
    }
}
#now .lab-note-card.is-open {
    border: 2px solid var(--ink);
    box-shadow: 5px 5px var(--ink);
    animation: labNoteIn 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
#now .lab-note-tape {
    position: absolute;
    top: -11px;
    left: 50%;
    width: 86px;
    height: 20px;
    margin-left: -43px;
    background: rgba(255, 77, 157, 0.85);
    transform: rotate(-3deg);
}
#now .lab-note-card strong {
    display: block;
    font-size: 16px;
    margin-bottom: 6px;
}
#now .lab-note-card p {
    margin: 0;
    font-size: 14px;
    line-height: 1.8;
    color: #3b3c36;
}
#now .lab-note-card .lab-note-hint {
    font-family: var(--hand);
    font-size: 16px;
    color: var(--blue);
}
#now .lab-note-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
}
#now .lab-note-link {
    font-size: 11px;
    font-weight: 700;
    color: var(--ink);
    background: var(--green);
    border: 1.5px solid var(--ink);
    padding: 4px 10px;
    box-shadow: 2px 2px var(--ink);
    text-decoration: none;
}
#now .lab-note-close {
    font-size: 11px;
    background: transparent;
    border: 0;
    color: var(--muted);
    cursor: pointer;
}
#now .lab-strip-wrap {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 26px 0 6px;
}
#now .lab-strip-label {
    flex: 0 0 auto;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--muted);
    writing-mode: horizontal-tb;
}
#now .lab-strip-wrap .lab-art-strip {
    margin: 0;
    width: auto;
    flex: 1 1 auto;
    justify-content: flex-start;
}
#now .now-paper.is-notebook-open .lab-strip-wrap,
    #now .now-paper:has(.lab-notebook[open]) .lab-strip-wrap {
    display: none;
}
#now .lab-art {
    justify-content: flex-start;
}
@media (prefers-reduced-motion: reduce) {
    #now .lab-note-card.is-open,
      #now .lab-term .lab-term-cursor,
      #now .lab-led-ring,
      #now .lab-hotspot.is-on::after,
      #now .lab-ruler-group.is-busy rect {
        animation: none;
    }
}

/* ===== Notion article blocks, reading column and table of contents ===== */
#theme-field-notes,
      html.dark #theme-field-notes,
      html.dark #theme-field-notes .notion {
    --fg-color: var(--ink) !important;
    --fg-color-0: rgba(32, 33, 30, 0.09) !important;
    --fg-color-1: rgba(32, 33, 30, 0.16) !important;
    --fg-color-2: rgba(32, 33, 30, 0.42) !important;
    --fg-color-3: rgba(32, 33, 30, 0.68) !important;
    --fg-color-4: var(--ink) !important;
    --fg-color-6: rgba(32, 33, 30, 0.85) !important;
    --fg-color-icon: var(--ink) !important;
    --bg-color: #fffdf5 !important;
    --bg-color-0: rgba(135, 131, 120, 0.14) !important;
    --bg-color-1: var(--bone) !important;
    --bg-color-2: rgba(135, 131, 120, 0.15) !important;
    color: var(--ink) !important;
}
html.dark #theme-field-notes .notion,
      html.dark #theme-field-notes .notion-text,
      html.dark #theme-field-notes .notion-h,
      html.dark #theme-field-notes .notion-list,
      html.dark #theme-field-notes .notion-to-do,
      html.dark #theme-field-notes .notion-page-title-text,
      html.dark #theme-field-notes .notion-table-of-contents-item,
      html.dark #theme-field-notes .notion-bookmark .notion-bookmark-title,
      html.dark #theme-field-notes .notion-bookmark .notion-bookmark-link div {
    color: var(--ink) !important;
}
html.dark #theme-field-notes .notion-asset-caption,
      html.dark #theme-field-notes .notion-bookmark .notion-bookmark-description {
    color: #616259 !important;
}
html.dark #theme-field-notes .notion-table-of-contents {
    background: var(--bone) !important;
    border: 1.5px solid var(--ink);
}
.article-body {
    font-size: 16px;
    line-height: 1.85;
    color: var(--ink);
    min-width: 0;
}
#theme-field-notes #notion-article .notion-page-content-has-aside {
    width: 100% !important;
    max-width: 100% !important;
    gap: 28px;
}
#theme-field-notes #notion-article .notion-page-content-has-aside .notion-page-content-inner {
    flex: 1 1 auto;
    min-width: 0;
    width: auto !important;
    max-width: 100% !important;
}
#theme-field-notes #notion-article .notion-aside {
    max-width: 220px;
}
#theme-field-notes #notion-article figure.notion-asset-wrapper-image {
    background: #fff;
    padding: 10px 10px 20px;
    border: var(--border);
    box-shadow: 5px 5px var(--ink);
    margin: 26px auto !important;
    max-width: 100%;
}
#theme-field-notes #notion-article figure.notion-asset-wrapper-image > div {
    border: 1px solid var(--ink);
}
#theme-field-notes #notion-article figure.notion-asset-wrapper-image .notion-asset-caption {
    padding: 10px 4px 0;
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 11px;
    color: var(--muted);
}
.article-body > img {
    background: #fff;
    padding: 8px 8px 22px;
    border: var(--border);
    box-shadow: 5px 5px var(--ink);
    margin: 22px auto;
}
#theme-field-notes #notion-article .notion-callout {
    background: #fbf7da !important;
    border: var(--border) !important;
    box-shadow: 4px 4px var(--ink) !important;
    border-radius: 0 !important;
    color: var(--ink) !important;
}
#theme-field-notes #notion-article .notion-code {
    background: var(--ink) !important;
    color: var(--bone) !important;
    border: var(--border) !important;
    box-shadow: 4px 4px var(--ink) !important;
    border-radius: 0 !important;
}
#theme-field-notes #notion-article blockquote,
      #theme-field-notes #notion-article .notion-quote {
    border: 0 !important;
    border-left: 4px solid var(--purple) !important;
    border-radius: 0 !important;
    background: #f6f2e8 !important;
    color: var(--ink) !important;
    padding: 12px 18px !important;
    margin: 18px 0 !important;
}
#theme-field-notes #notion-article .notion-bookmark {
    border: var(--border) !important;
    border-radius: 0 !important;
    background: #fff !important;
    box-shadow: 4px 4px var(--ink);
    margin: 16px 0;
}
#theme-field-notes #notion-article a {
    color: var(--blue);
    text-decoration: underline;
    text-underline-offset: 4px;
}
#theme-field-notes #notion-article a:hover {
    background: var(--green);
}
#theme-field-notes #notion-article .notion-table,
      #theme-field-notes #notion-article .notion-simple-table {
    max-width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
}
.article-reading {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 56px;
    align-items: start;
}
.article-reading-main {
    min-width: 0;
    width: 100%;
    max-width: 720px;
}
.article-reading-main #notion-article,
      .article-reading-main .notion-page {
    width: 100%;
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
}
.article-comments {
    margin-top: 36px;
}
.article-toc {
    display: none;
}
@media (min-width: 1280px) {
    .article-reading.has-toc {
        grid-template-columns: minmax(0, 720px) minmax(200px, 240px);
        justify-content: space-between;
    }
    .article-toc {
        display: block;
        position: sticky;
        top: 28px;
        align-self: start;
    }
}
.article-toc-card {
    position: relative;
    background: var(--paper);
    border: var(--border);
    box-shadow: 4px 4px var(--ink);
    padding: 22px 18px 16px;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
    overscroll-behavior: contain;
}
.article-toc-tape {
    position: absolute;
    top: -11px;
    left: calc(50% - 40px);
    width: 80px;
    height: 20px;
    background: var(--acid);
    transform: rotate(-2deg);
}
.article-toc-title {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
}
.article-toc ol {
    list-style: none;
    margin: 0;
    padding: 0;
    border-left: 2px solid #20211e1f;
}
.article-toc li a {
    display: block;
    margin-left: -2px;
    padding: 5px 0 5px 12px;
    border-left: 2px solid transparent;
    font-size: 13px;
    line-height: 1.5;
    color: var(--muted);
    transition: color 0.2s, border-color 0.2s;
}
.article-toc li a span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.article-toc li.toc-level-2 a {
    padding-left: 22px;
    font-size: 12.5px;
}
.article-toc li.toc-level-3 a {
    padding-left: 32px;
    font-size: 12px;
}
.article-toc li a:hover {
    color: var(--ink);
}
.article-toc li.is-active a {
    color: var(--ink);
    font-weight: 700;
    border-left-color: var(--blue);
}
#theme-field-notes .article-reading:not(.has-toc) .article-reading-main {
    margin-left: auto;
    margin-right: auto;
}
#theme-field-notes
      .article-reading:not(.has-toc)
      .article-reading-main:has(.notion-row) {
    max-width: 940px;
}
#theme-field-notes #notion-article .notion-blank {
    min-height: 0 !important;
    height: 6px !important;
    padding: 0 !important;
}
#theme-field-notes #notion-article .notion-text {
    line-height: 1.9;
}
#theme-field-notes #notion-article .notion-list li::marker {
    color: var(--blue);
    font-weight: 700;
}
#theme-field-notes #notion-article .notion-inline-code {
    background: #efffc2 !important;
    color: var(--ink) !important;
    border: 1px solid var(--ink);
    border-radius: 0 !important;
    padding: 0.08em 0.38em !important;
    font-size: 0.86em;
}
#theme-field-notes #notion-article .notion-h {
    scroll-margin-top: 24px;
}
#theme-field-notes #notion-article .notion-h1,
    #theme-field-notes #notion-article .notion-h2 {
    margin-top: 2.2em !important;
}
#theme-field-notes #notion-article .notion-h1 .notion-h-title,
    #theme-field-notes #notion-article .notion-h2 .notion-h-title {
    background: linear-gradient(
        transparent 62%,
        var(--green) 62%,
        var(--green) 92%,
        transparent 92%
      );
    padding: 0 0.12em;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}
#theme-field-notes #notion-article .notion-h3 .notion-h-title {
    background: linear-gradient(
        transparent 70%,
        rgba(255, 77, 157, 0.55) 70%
      );
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}
#theme-field-notes #notion-article .notion-h4 .notion-h-title::before {
    content: '↳ ';
    color: var(--blue);
    font-family: 'SFMono-Regular', Consolas, monospace;
}
#theme-field-notes #notion-article .notion-callout {
    position: relative;
    background: #fff7b0 !important;
    border: 2px solid var(--ink) !important;
    box-shadow: 5px 5px var(--ink) !important;
    padding: 22px 22px 20px 18px !important;
    margin: 30px 0 26px !important;
    overflow: visible !important;
}
#theme-field-notes #notion-article .notion-callout::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    width: 104px;
    height: 22px;
    margin-left: -52px;
    background: rgba(255, 77, 157, 0.78);
    border-left: 1px dashed rgba(32, 33, 30, 0.25);
    border-right: 1px dashed rgba(32, 33, 30, 0.25);
    transform: rotate(-2.5deg);
}
#theme-field-notes #notion-article .notion-callout::after {
    /* folded corner */
    content: '';
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 22px;
    height: 22px;
    background: linear-gradient(
        135deg,
        #f1e486 0 50%,
        #fffdf5 50%
      );
    border-left: 2px solid var(--ink);
    border-top: 2px solid var(--ink);
}
#theme-field-notes #notion-article .notion-callout:nth-child(even) {
    background: #f0e9ff !important;
}
#theme-field-notes #notion-article .notion-callout:nth-child(even)::before {
    background: rgba(217, 255, 47, 0.85);
    transform: rotate(2deg);
}
#theme-field-notes #notion-article .notion-callout:nth-child(even)::after {
    background: linear-gradient(135deg, #d9cdf5 0 50%, #fffdf5 50%);
}
#theme-field-notes #notion-article .notion-callout .notion-page-icon-inline {
    flex: 0 0 auto;
    align-self: flex-start;
    transform: rotate(-8deg);
}
#theme-field-notes #notion-article .notion-callout .notion-page-icon {
    margin: 0 !important;
    font-size: 20px !important;
    line-height: 1 !important;
}
#theme-field-notes #notion-article .notion-callout-text {
    margin-left: 14px !important;
}
#theme-field-notes #notion-article .notion-callout-text > b:first-child,
    #theme-field-notes #notion-article .notion-callout-text > strong:first-child {
    display: inline-block;
    margin-bottom: 4px;
    font-size: 1.04em;
}
#theme-field-notes #notion-article blockquote,
    #theme-field-notes #notion-article .notion-quote {
    position: relative;
    background: transparent !important;
    border-left: 0 !important;
    padding: 6px 0 6px 34px !important;
    margin: 22px 0 22px 6px !important;
    font-family: var(--hand) !important;
    font-size: 1.12em !important;
    line-height: 1.7 !important;
    color: var(--blue) !important;
    transform: rotate(-0.6deg);
}
#theme-field-notes #notion-article .notion-quote::before {
    content: '✎';
    position: absolute;
    left: 2px;
    top: 4px;
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 18px;
    color: var(--ink);
}
#theme-field-notes #notion-article .notion-quote::after {
    content: '';
    position: absolute;
    left: 34px;
    right: 18%;
    bottom: 0;
    height: 2px;
    background: repeating-linear-gradient(
        90deg,
        rgba(43, 59, 255, 0.55) 0 7px,
        transparent 7px 11px
      );
}
#theme-field-notes #notion-article pre.notion-code {
    position: relative;
    padding: 46px 18px 18px !important;
    margin: 24px 0 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
}
#theme-field-notes #notion-article pre.notion-code::before {
    content: '● ● ●   ~/field-notes';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 30px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    background: var(--green);
    color: var(--ink);
    border-bottom: 2px solid var(--ink);
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    white-space: pre;
}
#theme-field-notes #notion-article .notion-code-copy {
    top: 38px !important;
}
#theme-field-notes #notion-article .notion-simple-table {
    border-collapse: separate !important;
    border-spacing: 0;
    border: 2px solid var(--ink) !important;
    box-shadow: 5px 5px var(--ink);
    background: #fffdf5;
    margin: 26px 0 30px !important;
    font-size: 13.5px;
    display: block;
    overflow-x: auto;
}
#theme-field-notes #notion-article .notion-simple-table td {
    border: 0 !important;
    border-right: 1px solid rgba(32, 33, 30, 0.55) !important;
    border-bottom: 1px solid rgba(32, 33, 30, 0.55) !important;
    padding: 12px 14px !important;
    vertical-align: top;
    min-width: 150px;
    line-height: 1.7;
}
#theme-field-notes #notion-article .notion-simple-table td:last-child {
    border-right: 0 !important;
}
#theme-field-notes #notion-article .notion-simple-table tr:last-child td {
    border-bottom: 0 !important;
}
#theme-field-notes #notion-article .notion-simple-table-header-row td,
    #theme-field-notes
      #notion-article
      .notion-simple-table
      tr:first-child
      td {
    background: var(--green) !important;
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    border-bottom: 2px solid var(--ink) !important;
}
#theme-field-notes #notion-article .notion-simple-table tr td:first-child {
    font-weight: 700;
    white-space: nowrap;
    min-width: 120px;
}
#theme-field-notes
      #notion-article
      .notion-simple-table
      tr:nth-child(even)
      td {
    background: rgba(245, 242, 233, 0.7);
}
#theme-field-notes #notion-article figure.notion-asset-wrapper-image {
    position: relative;
    overflow: visible !important;
}
#theme-field-notes #notion-article figure.notion-asset-wrapper-image::before {
    content: '';
    position: absolute;
    z-index: 2;
    top: -11px;
    left: 50%;
    width: 88px;
    height: 20px;
    margin-left: -44px;
    background: rgba(217, 255, 47, 0.78);
    border-left: 1px dashed rgba(32, 33, 30, 0.22);
    border-right: 1px dashed rgba(32, 33, 30, 0.22);
    transform: rotate(-3deg);
    pointer-events: none;
}
#theme-field-notes #notion-article .notion-row {
    gap: 26px;
    align-items: flex-start;
    margin: 18px 0;
}
#theme-field-notes #notion-article .notion-spacer {
    display: none !important;
}
#theme-field-notes #notion-article .notion-row,
    #theme-field-notes #notion-article .notion-column {
    overflow: visible !important;
}
#theme-field-notes #notion-article .notion-column {
    padding: 0 !important;
    flex-grow: 1;
}
#theme-field-notes #notion-article .notion-row {
    padding: 0 14px;
}
#theme-field-notes #notion-article .notion-row figure.notion-asset-wrapper-image {
    width: auto !important;
    min-width: 0 !important;
    max-width: 340px !important;
}
#theme-field-notes
      #notion-article
      .notion-row
      figure.notion-asset-wrapper-image
      > div {
    width: 100% !important;
}
#theme-field-notes #notion-article .notion-row figure.notion-asset-wrapper-image {
    padding: 10px 10px 34px !important;
    margin: 14px auto !important;
    transform: rotate(-1.6deg);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}
#theme-field-notes
      #notion-article
      .notion-row
      .notion-spacer
      + .notion-column
      figure.notion-asset-wrapper-image {
    transform: rotate(1.4deg) translateY(14px);
}
#theme-field-notes
      #notion-article
      .notion-row
      .notion-spacer
      + .notion-column
      figure.notion-asset-wrapper-image::before {
    background: rgba(255, 77, 157, 0.8);
    transform: rotate(4deg);
}
#theme-field-notes
      #notion-article
      .notion-row
      .notion-spacer
      + .notion-column
      + .notion-spacer
      + .notion-column
      figure.notion-asset-wrapper-image {
    transform: rotate(-0.8deg) translateY(-6px);
}
#theme-field-notes
      #notion-article
      .notion-row
      figure.notion-asset-wrapper-image:hover {
    transform: rotate(0deg) scale(1.02);
    box-shadow: 8px 8px var(--ink);
    z-index: 3;
}
#theme-field-notes #notion-article .notion-row + .notion-text,
    #theme-field-notes #notion-article .notion-row .notion-text {
    font-family: var(--hand);
    font-size: 1.08em;
}
@media (max-width: 720px) {
    #theme-field-notes #notion-article .notion-row {
        gap: 12px;
    }
    #theme-field-notes #notion-article .notion-simple-table {
        font-size: 13px;
    }
    #theme-field-notes #notion-article .notion-callout {
        padding: 20px 14px 18px 12px !important;
    }
}
@media (prefers-reduced-motion: reduce) {
    #theme-field-notes .riso-cover > img,
      #theme-field-notes #notion-article .notion-row figure.notion-asset-wrapper-image {
        transition: none;
    }
}

/* ===== Contact sheet (photo category page) ===== */
#theme-field-notes .contact-counter {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 4px 0 28px;
    padding: 6px 12px;
    background: var(--ink);
    color: var(--green);
    border: 2px solid var(--ink);
    box-shadow: 3px 3px var(--purple);
    font-size: 11px;
    letter-spacing: 0.08em;
}
#theme-field-notes .contact-counter .film-can {
    display: inline-block;
    width: 11px;
    height: 14px;
    background: linear-gradient(var(--green) 0 3px, #3a3b35 3px 11px, var(--green) 11px);
    border: 1.5px solid var(--green);
    border-radius: 2px;
}
#theme-field-notes .contact-left {
    color: var(--bone);
    opacity: 0.75;
}
#theme-field-notes .contact-strips {
    display: grid;
    gap: 36px;
}
#theme-field-notes .film-strip {
    position: relative;
    padding: 22px 18px 16px;
    background: #1c1c19;
    border: 2px solid var(--ink);
    box-shadow: 6px 6px var(--purple);
    transform: rotate(var(--tilt, 0deg));
}
#theme-field-notes .film-strip::before,
    #theme-field-notes .film-strip::after {
    content: '';
    position: absolute;
    left: 10px;
    right: 10px;
    height: 7px;
    background: repeating-linear-gradient(90deg, var(--bone) 0 9px, transparent 9px 20px);
    opacity: 0.85;
}
#theme-field-notes .film-strip::before {
    top: 6px;
}
#theme-field-notes .film-strip::after {
    bottom: 6px;
}
#theme-field-notes .film-edge {
    display: flex;
    justify-content: space-between;
    margin: 2px 4px 10px;
    color: #e8a54b;
    font-size: 10px;
    letter-spacing: 0.2em;
}
#theme-field-notes .film-frames {
    list-style: none;
    margin: 0;
    padding: 0 0 14px;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
}
#theme-field-notes .film-frame {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
}
#theme-field-notes .film-frame button {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: #0d0d0b;
    aspect-ratio: 3 / 2;
    height: auto;
    min-height: 0;
    cursor: pointer;
}
#theme-field-notes .film-frame button:focus-visible {
    outline: 2px solid var(--green);
    outline-offset: 3px;
}
#theme-field-notes .film-frame img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: fnDevelop 1s cubic-bezier(0.25, 0.8, 0.3, 1) var(--delay, 0ms) both;
}
#theme-field-notes .film-frame.is-blank::before {
    content: '';
    display: block;
    aspect-ratio: 3 / 2;
    background: #262622;
    border: 1px dashed #45463f;
}
#theme-field-notes .film-frame-no {
    display: flex;
    gap: 8px;
    color: #e8a54b;
    font-size: 10px;
}
#theme-field-notes .film-frame-no i {
    font-style: normal;
    opacity: 0.6;
}
#theme-field-notes .film-frame-title {
    color: var(--bone);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--hand);
}
#theme-field-notes .grease-circle {
    position: absolute;
    left: -12%;
    top: -16%;
    width: 124%;
    height: 132%;
    fill: none;
    stroke: #e5352b;
    stroke-width: 3.2;
    stroke-linecap: round;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    opacity: 0;
    transition: stroke-dashoffset 0.55s ease, opacity 0.2s ease;
    pointer-events: none;
    overflow: visible;
}
#theme-field-notes .film-frame button:hover .grease-circle,
    #theme-field-notes .film-frame button:focus-visible .grease-circle {
    stroke-dashoffset: 0;
    opacity: 1;
}
@media (max-width: 960px) {
    #theme-field-notes .film-frames {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
@media (max-width: 520px) {
    #theme-field-notes .film-frames {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    #theme-field-notes .film-strip {
        padding: 20px 10px 14px;
    }
}
@media (prefers-reduced-motion: reduce) {
    #theme-field-notes .rope-img-wrap img,
      #theme-field-notes .collage .polaroid img,
      #theme-field-notes #viewer-image.is-developing,
      #theme-field-notes .film-frame img {
        animation: none;
    }
    #viewer .viewer-image-wrap.is-flippable #viewer-image,
      #viewer .viewer-back,
      #theme-field-notes .grease-circle {
        transition: none;
    }
}

/* ===== Keyframes used above ===== */
@keyframes labStickersReveal {
    from {
        opacity: 0;
        transform: translateY(-8px) rotate(-.5deg)
    }
    to {
        opacity: 1;
        transform: translateY(0) rotate(-.5deg)
    }
}
@keyframes labLedPulse {
    0% {
        transform: scale(0.6);
        opacity: 0.9;
    }
    70% {
        transform: scale(1.9);
        opacity: 0;
    }
    100% {
        transform: scale(1.9);
        opacity: 0;
    }
}
@keyframes fnDevelop {
    0% {
        filter: brightness(1.85) contrast(0.42) saturate(0.15) sepia(0.12);
    }
    45% {
        filter: brightness(1.28) contrast(0.72) saturate(0.55) sepia(0.08);
    }
    100% {
        filter: none;
    }
}
@keyframes labCursor {
    50% {
        opacity: 0;
    }
}
@keyframes labLedGlow {
    0%,
      100% {
        opacity: 0;
        transform: scale(0.8);
    }
    50% {
        opacity: 0.7;
        transform: scale(1.25);
    }
}
@keyframes labLedBeat {
    0% {
        opacity: 1;
        transform: scale(0.8);
    }
    100% {
        opacity: 0;
        transform: scale(2.4);
    }
}
@keyframes labBusyDot {
    50% {
        transform: scale(1.35);
    }
}
@keyframes labBusy {
    50% {
        fill: var(--blue);
    }
}
@keyframes labNoteIn {
    from {
        opacity: 0;
        transform: translateY(6px) rotate(-0.4deg);
    }
}
`}</style>
)

export default LegacyStyle
