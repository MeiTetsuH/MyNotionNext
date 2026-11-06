/**
 * Field-notes "notebook" layer: Notion blocks restyled as a hand-kept
 * notebook (sticky notes, taped prints, terminal windows, margin notes),
 * plus the shared risograph cover treatment.
 * Kept apart from style.js so the redesign can be reviewed / reverted alone.
 */
export const NotebookStyle = () => (
  <style jsx global>{`
    /* ---------- Risograph covers ---------- */
    #theme-field-notes .riso-cover {
      position: relative;
      display: block;
      overflow: hidden;
      isolation: isolate;
    }
    #theme-field-notes .riso-cover.is-memo {
      margin-bottom: 14px;
    }
    #theme-field-notes .riso-cover.is-memo > img {
      margin-bottom: 0;
    }
    #theme-field-notes .riso-cover > img {
      filter: saturate(0.78) contrast(1.06) brightness(1.02);
      transition: filter 0.35s ease, transform 0.5s ease;
    }
    #theme-field-notes .riso-cover::before,
    #theme-field-notes .riso-cover::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }
    /* shared lime -> lavender tint */
    #theme-field-notes .riso-cover::before {
      z-index: 1;
      background: linear-gradient(
        135deg,
        rgba(210, 252, 75, 0.34),
        rgba(177, 154, 234, 0.42)
      );
      mix-blend-mode: soft-light;
    }
    /* halftone dots */
    #theme-field-notes .riso-cover::after {
      z-index: 2;
      background-image: radial-gradient(
        rgba(32, 33, 30, 0.55) 0.7px,
        transparent 1.15px
      );
      background-size: 4px 4px;
      mix-blend-mode: multiply;
      opacity: 0.32;
    }
    #theme-field-notes a:hover .riso-cover > img,
    #theme-field-notes .riso-cover:hover > img {
      filter: none;
    }
    #theme-field-notes a:hover .riso-cover::before,
    #theme-field-notes a:hover .riso-cover::after,
    #theme-field-notes .riso-cover:hover::before,
    #theme-field-notes .riso-cover:hover::after {
      opacity: 0;
    }

    /* ---------- Reading column without TOC ---------- */
    #theme-field-notes .article-reading:not(.has-toc) .article-reading-main {
      margin-left: auto;
      margin-right: auto;
    }
    /* photo diaries (Notion column layouts) get a wider scrapbook page */
    #theme-field-notes
      .article-reading:not(.has-toc)
      .article-reading-main:has(.notion-row) {
      max-width: 940px;
    }

    /* ---------- Body rhythm ---------- */
    #theme-field-notes #notion-article .notion-blank {
      min-height: 0 !important;
      height: 6px !important;
      padding: 0 !important;
    }
    #theme-field-notes #notion-article .notion-text {
      line-height: 1.9;
    }
    #theme-field-notes #notion-article .notion-list li::marker {
      color: #6541b4;
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

    /* ---------- Headings: highlighter + index marks ---------- */
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
        rgba(177, 154, 234, 0.55) 70%
      );
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }
    #theme-field-notes #notion-article .notion-h4 .notion-h-title::before {
      content: '↳ ';
      color: #6541b4;
      font-family: 'SFMono-Regular', Consolas, monospace;
    }

    /* ---------- Callout -> taped sticky note ---------- */
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
      background: rgba(177, 154, 234, 0.78);
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
      background: rgba(210, 252, 75, 0.85);
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

    /* ---------- Quote -> handwritten margin note ---------- */
    #theme-field-notes #notion-article blockquote,
    #theme-field-notes #notion-article .notion-quote {
      position: relative;
      background: transparent !important;
      border-left: 0 !important;
      padding: 6px 0 6px 34px !important;
      margin: 22px 0 22px 6px !important;
      font-family: 'Kaiti SC', 'STKaiti', 'YuMincho', Georgia, serif !important;
      font-size: 1.12em !important;
      line-height: 1.7 !important;
      color: #4b2f93 !important;
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
        rgba(101, 65, 180, 0.55) 0 7px,
        transparent 7px 11px
      );
    }

    /* ---------- Code -> terminal window ---------- */
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

    /* ---------- Simple table -> ledger ---------- */
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

    /* ---------- Images -> taped prints ---------- */
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
      background: rgba(210, 252, 75, 0.78);
      border-left: 1px dashed rgba(32, 33, 30, 0.22);
      border-right: 1px dashed rgba(32, 33, 30, 0.22);
      transform: rotate(-3deg);
      pointer-events: none;
    }

    /* Photo diaries: Notion columns become a scrapbook spread */
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
    /* Notion renders col, spacer, col, spacer...: target the 2nd / 3rd column */
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
      background: rgba(177, 154, 234, 0.8);
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
    /* captions under photo-diary rows read like handwriting */
    #theme-field-notes #notion-article .notion-row + .notion-text,
    #theme-field-notes #notion-article .notion-row .notion-text {
      font-family: 'Kaiti SC', 'STKaiti', 'YuMincho', Georgia, serif;
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


    /* ---------- Instant film: develop on arrival ---------- */
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
    #theme-field-notes .collage .polaroid img,
    #theme-field-notes #viewer-image.is-developing {
      animation: fnDevelop 1.1s cubic-bezier(0.25, 0.8, 0.3, 1) both;
    }
    #theme-field-notes .rope-img-wrap img {
      animation: fnDevelop 0.8s cubic-bezier(0.25, 0.8, 0.3, 1) both;
    }

    /* Film canister in the rope header */
    #theme-field-notes .rope-film-can {
      display: inline-block;
      width: 11px;
      height: 14px;
      background: linear-gradient(
        var(--green) 0 3px,
        #3a3b35 3px 11px,
        var(--green) 11px
      );
      border: 1.5px solid var(--green);
      border-radius: 2px;
      flex: 0 0 auto;
    }

    /* End of the rope: a strip of film leader */
    #theme-field-notes .rope-more-pendant {
      background-color: #20211e;
      color: #f5f2e9;
      padding: 9px 10px;
      background-image: repeating-linear-gradient(
          90deg,
          #f5f2e9 0 4px,
          transparent 4px 9px
        ),
        repeating-linear-gradient(90deg, #f5f2e9 0 4px, transparent 4px 9px);
      background-size: 100% 3px, 100% 3px;
      background-position: 0 2px, 0 calc(100% - 2px);
      background-repeat: no-repeat;
      box-shadow: 2px 2px var(--purple);
    }
    #theme-field-notes .rope-more-pendant:hover {
      background-color: #3a3b35;
      color: var(--green);
    }

    /* ---------- Lightbox: flip the print over ---------- */
    #viewer .viewer-image-wrap.is-flippable {
      position: relative;
      perspective: 1800px;
    }
    #viewer .viewer-image-wrap.is-flippable #viewer-image,
    #viewer .viewer-back {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 0.75s cubic-bezier(0.2, 0.7, 0.2, 1);
    }
    #viewer .viewer-back {
      position: absolute;
      inset: 0;
      transform: rotateY(-180deg);
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 7% 8% 6%;
      overflow: auto;
      background-color: #fbf8ee;
      background-image: repeating-linear-gradient(
        transparent 0 31px,
        rgba(101, 65, 180, 0.16) 31px 32px
      );
      border: 1px solid rgba(32, 33, 30, 0.35);
      color: #33342e;
      font-family: 'Kaiti SC', 'STKaiti', 'YuMincho', Georgia, serif;
    }
    #viewer .viewer-image-wrap.is-flipped #viewer-image {
      transform: rotateY(180deg);
    }
    #viewer .viewer-image-wrap.is-flipped .viewer-back {
      transform: rotateY(0deg);
    }
    #viewer .viewer-back-stamp {
      position: absolute;
      top: 6%;
      right: 6%;
      padding: 8px 10px;
      border: 2px dashed #d9402f;
      color: #d9402f;
      font-size: 10px;
      line-height: 1.5;
      letter-spacing: 0.12em;
      text-align: center;
      transform: rotate(9deg);
      opacity: 0.85;
    }
    #viewer .viewer-back-title {
      margin: 0 0 4px;
      padding-right: 96px;
      font-size: clamp(20px, 3.2vw, 28px);
      line-height: 1.3;
      color: var(--ink);
    }
    #viewer .viewer-back-lines {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 6px;
    }
    #viewer .viewer-back-lines li {
      display: grid;
      grid-template-columns: 78px 1fr;
      align-items: baseline;
      gap: 10px;
      font-size: clamp(15px, 2vw, 18px);
    }
    #viewer .viewer-back-lines b {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #6541b4;
    }
    #viewer .viewer-back-desc {
      margin: 6px 0 0;
      font-size: clamp(15px, 2vw, 18px);
      line-height: 1.75;
      color: #4b2f93;
    }
    #viewer .viewer-back-sign {
      margin-top: auto;
      align-self: flex-end;
      font-size: 20px;
      transform: rotate(-4deg);
    }

    /* ---------- Lightbox as an instant print ---------- */
    #viewer .viewer-image-wrap {
      position: relative;
    }
    #viewer.is-polaroid {
      padding: 14px 14px 0;
      background: #fffdf8;
    }
    #viewer.is-polaroid .viewer-image-wrap {
      outline: 1px solid rgba(32, 33, 30, 0.18);
    }
    #viewer.is-polaroid .viewer-caption-bar {
      padding: 18px 8px 16px;
    }
    #viewer.is-polaroid #viewer-title {
      font-family: 'Kaiti SC', 'STKaiti', 'YuMincho', Georgia, serif;
      font-weight: 400;
      font-size: clamp(20px, 2.4vw, 26px);
      letter-spacing: 0.02em;
      transform: rotate(-0.8deg);
    }
    #viewer.is-polaroid #viewer-caption {
      margin: 6px 0 0;
      font-family: 'Kaiti SC', 'STKaiti', 'YuMincho', Georgia, serif;
      font-size: 16px;
      line-height: 1.6;
      color: #4b4c45;
    }
    #viewer .viewer-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      margin-top: 10px;
      font-size: 11px;
      letter-spacing: 0.06em;
      color: var(--muted);
    }
    #viewer .viewer-meta-row #viewer-index {
      flex: 0 0 auto;
      font-size: 11px;
    }
    #viewer .viewer-flip-btn {
      cursor: pointer;
    }
    #viewer .viewer-flip-btn[aria-pressed='true'] {
      background: var(--green) !important;
      color: var(--ink) !important;
    }
    #viewer .viewer-nav {
      position: absolute;
      top: 50%;
      z-index: 4;
      width: 40px;
      height: 40px;
      margin-top: -20px;
      display: grid;
      place-items: center;
      background: rgba(255, 253, 245, 0.92);
      border: 2px solid var(--ink);
      box-shadow: 2px 2px var(--ink);
      font-size: 18px;
      color: var(--ink);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s ease, background 0.15s ease;
    }
    #viewer .viewer-nav.is-prev {
      left: 10px;
    }
    #viewer .viewer-nav.is-next {
      right: 10px;
    }
    #viewer .viewer-nav:hover {
      background: var(--green);
    }
    #viewer .viewer-image-wrap:hover .viewer-nav,
    #viewer .viewer-nav:focus-visible {
      opacity: 1;
    }
    @media (hover: none) {
      #viewer .viewer-nav {
        opacity: 1;
        width: 36px;
        height: 36px;
        margin-top: -18px;
      }
    }
    @media (max-width: 720px) {
      #viewer.is-polaroid {
        padding: 10px 10px 0;
      }
      #viewer.is-polaroid .viewer-caption-bar {
        padding: 14px 4px 12px;
      }
      #viewer.is-polaroid #viewer-caption {
        font-size: 14px;
      }
      #viewer .viewer-meta-row,
      #viewer .viewer-meta-row #viewer-index {
        font-size: 10px;
      }
    }


    /* Back of the print scales with the print itself (portrait, landscape, phone) */
    #viewer .viewer-back {
      container-type: size;
      gap: clamp(4px, 2cqh, 14px);
      padding: clamp(14px, 7cqh, 48px) clamp(16px, 7cqw, 56px);
    }
    #viewer .viewer-back-title {
      font-size: clamp(17px, 7.5cqh, 36px);
      padding-right: 0;
    }
    #viewer .viewer-back-desc {
      margin: 0;
      font-size: clamp(13px, 5cqh, 24px);
      line-height: 1.6;
    }
    #viewer .viewer-back-lines {
      gap: clamp(2px, 1.4cqh, 10px);
    }
    #viewer .viewer-back-lines li {
      grid-template-columns: clamp(44px, 14cqw, 90px) 1fr;
      font-size: clamp(13px, 4.6cqh, 22px);
    }
    #viewer .viewer-back-lines b {
      font-size: clamp(9px, 2.6cqh, 12px);
    }
    #viewer .viewer-back-stamp {
      top: auto;
      right: auto;
      bottom: clamp(10px, 6cqh, 36px);
      left: clamp(12px, 6cqw, 48px);
      transform: rotate(-8deg);
      font-size: clamp(8px, 2.6cqh, 11px);
      padding: clamp(4px, 1.4cqh, 8px) clamp(6px, 1.6cqw, 10px);
    }
    #viewer .viewer-back-sign {
      font-size: clamp(15px, 5cqh, 24px);
    }
    #viewer .viewer-back-note {
      display: grid;
      gap: clamp(2px, 1.2cqh, 8px);
      margin-top: clamp(2px, 1cqh, 8px);
    }
    #viewer .viewer-back-note p {
      margin: 0;
      font-size: clamp(13px, 4.4cqh, 20px);
      line-height: 1.7;
      color: #33342e;
    }
    #viewer .viewer-back-note .is-bulleted_list::before,
    #viewer .viewer-back-note .is-numbered_list::before {
      content: '· ';
      color: #6541b4;
    }
    #viewer .viewer-back-note .is-quote {
      color: #4b2f93;
      padding-left: 0.8em;
      border-left: 2px dashed rgba(101, 65, 180, 0.5);
    }
    #viewer .viewer-image-wrap.is-flipped .viewer-nav {
      display: none;
    }
    #viewer .viewer-flip-btn[aria-pressed='true'] span,
    #viewer .viewer-flip-btn[aria-pressed='true'] * {
      color: var(--ink) !important;
    }
    @container (max-height: 320px) {
      #viewer .viewer-back-stamp,
      #viewer .viewer-back-sign {
        display: none;
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

    /* ---------- Contact sheet (photo category) ---------- */
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
      color: #f5f2e9;
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
      background: repeating-linear-gradient(90deg, #f5f2e9 0 9px, transparent 9px 20px);
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
      color: #f5f2e9;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: 'Kaiti SC', 'STKaiti', 'YuMincho', Georgia, serif;
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
    @media (max-width: 1024px) {
      #theme-field-notes .rope-film-can {
        display: none;
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


    /* ---------- Home Lab: clickable tags, live iMac terminal, note card ---------- */
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
      color: #f5f2e9;
    }
    #now .lab-figure.has-active button.lab-callout:not(.is-active) {
      opacity: 0.55;
    }
    #now .lab-leader.is-active path {
      stroke-dasharray: none;
      stroke-width: 2.4;
    }

    /* ---------- Home Lab: supplied artwork + live layer ---------- */
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

    /* iMac terminal (units are artwork pixels) */
    #now .lab-term text {
      fill: #f5f2e9;
    }
    #now .lab-term .lab-term-clock {
      font-size: 27px;
      font-weight: 700;
      fill: var(--green);
      letter-spacing: 1px;
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
    @keyframes labCursor {
      50% {
        opacity: 0;
      }
    }

    /* NAS LEDs: a soft glow, a quick double beat while the heartbeat goes out */
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

    /* Muse speech bubble */
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

    /* Devices are clickable without drawing over the art */
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
    /* a small "working now" dot on devices whose job is running */
    #now .lab-hotspot.is-on::after {
      content: '';
      position: absolute;
      top: 6%;
      right: 8%;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #6541b4;
      border: 2px solid var(--ink);
      animation: labBusyDot 1.2s ease-in-out infinite;
    }
    @keyframes labBusyDot {
      50% {
        transform: scale(1.35);
      }
    }

    /* 24h ruler */
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
    @keyframes labBusy {
      50% {
        fill: #6541b4;
      }
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
    /* Mid widths: a narrow drawing column leaves dead green space, so stack */
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

    /* Note card: lives in the copy column so the drawing stays clean */
    #now .lab-note-card {
      position: relative;
      margin: 26px 0 0;
      padding: 18px 18px 16px;
      background: #fffef8;
      border: 2px dashed rgba(32, 33, 30, 0.45);
      transform: rotate(-0.4deg);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
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
      background: rgba(177, 154, 234, 0.85);
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
      font-family: 'Kaiti SC', 'STKaiti', 'YuMincho', Georgia, serif;
      font-size: 16px;
      color: #4b2f93;
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
    @keyframes labNoteIn {
      from {
        opacity: 0;
        transform: translateY(6px) rotate(-0.4deg);
      }
    }



    /* ---------- Projects: upright, taped printouts ---------- */
    #theme-field-notes .screenshot-button {
      transform: none;
      overflow: visible;
    }
    #theme-field-notes .screenshot-button:hover {
      transform: translateY(-3px);
      box-shadow: 8px 9px var(--ink);
    }
    #theme-field-notes .screenshot-button img {
      display: block;
    }
    #theme-field-notes .screenshot-button::before,
    #theme-field-notes .screenshot-button::after {
      content: '';
      position: absolute;
      z-index: 2;
      top: -10px;
      width: 74px;
      height: 20px;
      background: rgba(210, 252, 75, 0.82);
      border-left: 1px dashed rgba(32, 33, 30, 0.25);
      border-right: 1px dashed rgba(32, 33, 30, 0.25);
      pointer-events: none;
    }
    #theme-field-notes .screenshot-button::before {
      left: -18px;
      transform: rotate(-32deg);
    }
    #theme-field-notes .screenshot-button::after {
      right: -18px;
      transform: rotate(32deg);
      background: rgba(177, 154, 234, 0.85);
    }

    /* Project picker scrolls sideways on phones instead of truncating names */
    @media (max-width: 720px) {
      #theme-field-notes .project-choices {
        flex: 1 1 100%;
        max-width: 100%;
        overflow-x: auto;
        scroll-snap-type: x proximity;
        scrollbar-width: none;
        padding: 2px 4px 6px 2px;
        -webkit-overflow-scrolling: touch;
      }
      #theme-field-notes .project-choices::-webkit-scrollbar {
        display: none;
      }
      #theme-field-notes .project-choices button {
        flex: 0 0 auto;
        scroll-snap-align: start;
      }
    }

    /* ---------- Quieter decoration: two tape colours only ---------- */
    #theme-field-notes .notes-memo-grid .note-memo-card .note-memo-tape {
      background: rgba(177, 154, 234, 0.78);
    }
    #theme-field-notes .notes-memo-grid .note-memo-card:nth-child(2n) .note-memo-tape {
      background: rgba(210, 252, 75, 0.8);
    }
    #theme-field-notes .notes-memo-grid .note-memo-card:nth-child(3n) .note-memo-tape {
      background: rgba(177, 154, 234, 0.78);
    }

    /* Two-column hero on narrow screens: keep the round sticker on the page */
    @media (min-width: 721px) and (max-width: 1050px) {
      #theme-field-notes .round-sticker {
        right: 8px;
      }
    }

    /* ---------- Hero collage, single-column widths ---------- */
    /* The photos are sized in % of the collage but the collage had a fixed
       height, so between ~560px and 720px the waterfall print spilled over
       the ticker. Keep the proportions of the 390px layout and cap the width. */
    @media (max-width: 720px) {
      #theme-field-notes .collage {
        height: auto;
        aspect-ratio: 362 / 410;
        width: 100%;
        max-width: 520px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #theme-field-notes .riso-cover > img,
      #theme-field-notes #notion-article .notion-row figure.notion-asset-wrapper-image {
        transition: none;
      }
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
      #now .lab-note-card.is-open,
      #now .lab-term .lab-term-cursor,
      #now .lab-led-ring,
      #now .lab-hotspot.is-on::after,
      #now .lab-ruler-group.is-busy rect {
        animation: none;
      }
    }
  `}</style>
)

export default NotebookStyle
