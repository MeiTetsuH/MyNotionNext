/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'

const Style = () => {
  return (
    <style jsx global>{`
:root{--paper:#f5f2e9;--ink:#20211e;--muted:#616259;--green:#d2fc4b;--purple:#b19aea;--border:2px solid var(--ink);--font:Arial,"Hiragino Kaku Gothic ProN","PingFang SC","Microsoft YaHei",sans-serif}*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:28px}body{margin:0;color:var(--ink);background:var(--paper);font-family:var(--font);font-size:16px;line-height:1.65;background-image:radial-gradient(#28291e12 .65px,transparent .65px);background-size:7px 7px}body:has(dialog[open]){overflow:hidden}button,a{-webkit-tap-highlight-color:transparent}button{font:inherit;color:inherit;cursor:pointer}a{color:inherit;text-decoration:none}button:focus-visible,a:focus-visible,summary:focus-visible{outline:3px solid #6541b4;outline-offset:6px}button{border-radius:0}img{display:block;max-width:100%}h1,h2,h3,p{margin:0}h2{line-height:1.3}button:hover .expand{transform:translate(2px,-2px)}.wrap{max-width:1320px;width:calc(100% - 112px);margin:auto}.mono{font-family:"SFMono-Regular",Consolas,"Liberation Mono",monospace;font-size:11px;letter-spacing:1.15px}.header{height:104px;display:flex;align-items:center;gap:22px;border-bottom:var(--border)}.logo{font-weight:900;font-size:46px;line-height:1;letter-spacing:-2px;display:flex;align-items:start;gap:2px}.logo span{font-size:27px;color:var(--ink);line-height:1.1;letter-spacing:-2px}.brand-note{font-size:9px;letter-spacing:1.1px;line-height:1.6;font-weight:700}.header nav{display:flex;gap:31px;margin-left:auto;font-size:13px;font-weight:bold}.header nav a:hover{text-decoration:underline;text-underline-offset:6px}.languages{display:flex;border:var(--border);margin-left:26px;box-shadow:3px 3px var(--ink)}.languages button{background:transparent;border:0;padding:6px 11px;font-size:11px;font-weight:700;min-width:37px}.languages button+button{border-left:1px solid var(--ink)}.languages button[aria-pressed=true]{background:var(--green)}.hero{padding-top:25px;padding-bottom:58px}.issue{display:flex;justify-content:space-between;font-size:10px}.hero-grid{display:grid;grid-template-columns:1fr 1fr;min-height:590px;align-items:center;gap:15px}.hero-copy{padding-top:43px;position:relative;z-index:2}.hello{display:inline-block;background:var(--purple);padding:1px 14px;font-size:14px;font-weight:700;transform:rotate(-5deg);border:var(--border);box-shadow:3px 3px var(--ink);margin-left:5px}.hero h1{font-size:clamp(65px,7.7vw,112px);letter-spacing:-.025em;font-weight:900;line-height:1.12;margin:14px 0 0;width:max-content;max-width:100%}.title-dot{display:inline-block;width:.14em;height:.14em;margin:0 .055em 0 .075em;background:#8662cb;color:transparent;overflow:hidden;line-height:0;letter-spacing:0;vertical-align:baseline}.brand-subline{font-size:10px;letter-spacing:1.6px;margin:8px 0 23px;color:var(--muted)}.hero h2{font-size:clamp(33px,3.5vw,51px);font-weight:900;letter-spacing:-2px;line-height:1.45}.highlight{background:var(--green);padding:0 9px 4px 4px;box-decoration-break:clone;-webkit-box-decoration-break:clone}.intro{font-size:14px;line-height:1.9;margin:22px 0 25px;color:#505148;max-width:410px}.button{display:inline-flex;gap:29px;align-items:center;padding:12px 22px;border:var(--border);font-size:13px;font-weight:700;box-shadow:4px 4px var(--purple);transition:transform .15s,box-shadow .15s}.button:hover{transform:translate(2px,2px);box-shadow:2px 2px var(--purple)}.button span:last-child{font-size:20px;line-height:1}.ink{background:var(--ink);color:var(--paper)}.hero-foot{display:flex;align-items:center;gap:9px;margin-top:25px;font-size:10px;letter-spacing:.6px}.status-dot{display:inline-block;width:8px;height:8px;background:#7b9434;border:1.5px solid var(--ink);border-radius:50%}.collage{height:510px;position:relative;min-width:0;align-self:end;margin-bottom:6px}.polaroid{background:#fffef8;border:var(--border);padding:11px 11px 0;box-shadow:6px 7px var(--ink);position:absolute;transition:transform .25s}.polaroid:hover{transform:rotate(0deg) translateY(-5px);z-index:4}.hero-photo{width:87%;left:0;top:66px;transform:rotate(-6deg)}.hero-photo img{aspect-ratio:1.5;object-fit:cover}.photo-label{display:flex;justify-content:space-between;padding:12px 3px;font-family:"SFMono-Regular",Consolas,monospace;font-size:10px;letter-spacing:.6px}.tape{position:absolute;width:116px;height:34px;top:-19px;left:calc(50% - 58px);background:#d0c1eac2;transform:rotate(3deg);border-left:1px dashed #5d41733d;border-right:1px dashed #5d41733d;z-index:2}.sky-photo{width:49%;right:-8px;bottom:2px;transform:rotate(9deg);padding:8px 8px 0}.sky-photo img{aspect-ratio:1.42;object-fit:cover}.sky-photo .photo-label{padding:9px 3px;font-size:10px}.round-sticker{position:absolute;right:-8px;top:33px;width:119px;height:119px;background:var(--green);border:var(--border);border-radius:50%;z-index:2;transform:rotate(15deg);font-size:20px;line-height:1.1;font-weight:900;text-align:center;padding:22px 8px;box-shadow:3px 3px var(--ink)}.round-sticker span{display:block;font-size:28px}.scribble-note{position:absolute;top:0;left:45px;transform:rotate(-8deg);font-size:16px;font-style:italic;font-family:"Kaiti SC","YuMincho",Georgia,serif}.scribble-arrow{position:absolute;top:1px;left:184px;width:87px;fill:none;stroke:var(--ink);stroke-width:2.5;stroke-linecap:round}.photo-index{position:absolute;bottom:42px;left:0;font-size:8px;transform:rotate(-6deg)}.star-doodle{position:absolute;bottom:82px;left:67px;width:69px;fill:var(--purple);stroke:var(--ink);stroke-width:2;transform:rotate(-8deg)}.ticker{overflow:hidden;background:var(--ink);color:var(--green);transform:rotate(-1.5deg);width:100%;padding:10px 0;border-top:var(--border);border-bottom:var(--border)}.ticker>div{display:flex;gap:30px;white-space:nowrap;justify-content:center;font-size:16px;font-weight:900;letter-spacing:2px}.ticker span{color:var(--purple);font-size:23px;line-height:1}.section-heading{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:36px}.eyebrow{display:block;font-size:10px;letter-spacing:1.5px;margin-bottom:13px}.section-heading h2{font-size:36px;font-weight:900;letter-spacing:-1.2px}.margin-note{font-family:"Kaiti SC","YuMincho",Georgia,serif;font-style:italic;font-size:17px;transform:rotate(-5deg);padding-bottom:10px}.work-section{padding-top:93px;padding-bottom:74px}.project{display:grid;grid-template-columns:44% 56%;border:var(--border);box-shadow:8px 8px var(--ink);background:var(--paper)}.project-copy{padding:32px 35px 38px}.project-top{display:flex;align-items:center;justify-content:space-between;font-size:8px;gap:10px}.small-tag{border:1px solid;padding:3px 6px;font-size:8px;white-space:nowrap}.project h3{font-size:43px;line-height:1.1;letter-spacing:-2px;margin:35px 0 22px;display:flex;justify-content:space-between}.project h3 span{font-size:34px}.project-deck{font-size:29px;font-weight:800;line-height:1.4;letter-spacing:-.7px;margin-bottom:18px}.project-copy>p:not(.project-deck){font-size:13px;color:#56574f;line-height:1.9;max-width:360px}.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:23px}.tags span{font-family:Consolas,monospace;font-size:9px;border:1px solid #96968e;padding:2px 7px}.project-features{border-top:1px solid #b0aea3;margin:24px 0}.project-features>div{padding:9px 0;border-bottom:1px solid #b0aea3;font-size:11px;display:flex;gap:17px}.project-features b{font-family:Consolas,monospace;font-weight:400;color:#797b70}.project .button{font-size:11px;padding:10px 17px}.project-visual{border-left:var(--border);background:var(--purple);padding:0 29px 20px;display:flex;flex-direction:column;justify-content:center;position:relative;min-width:0;overflow:hidden;background-image:linear-gradient(#ffffff19 1px,transparent 1px),linear-gradient(90deg,#ffffff19 1px,transparent 1px);background-size:23px 23px}.window-bar{position:absolute;top:0;left:0;right:0;border-bottom:var(--border);padding:10px 17px;display:flex;justify-content:space-between;align-items:center;font-size:12px;background:#a78bdf}.window-bar .mono{font-size:8px;letter-spacing:1px}.window-dots{font-size:10px;letter-spacing:2px}.project-tabs{display:flex;gap:0;align-self:start;border:var(--border);margin-top:63px;margin-bottom:18px;box-shadow:3px 3px var(--ink);background:var(--paper);z-index:1}.project-tabs button{border:0;background:none;padding:6px 15px;font-size:11px}.project-tabs button+button{border-left:var(--border)}.project-tabs .active{background:var(--green)}.screenshot-button{padding:0;background:#f9f7f2;border:var(--border);position:relative;box-shadow:6px 6px var(--ink);transform:rotate(2deg);transition:transform .2s;overflow:hidden}.screenshot-button:hover{transform:rotate(0)}.screenshot-button img{width:100%;aspect-ratio:1.36;object-fit:cover;object-position:top}.zoom-hint{position:absolute;right:10px;bottom:10px;border:var(--border);background:var(--green);padding:4px 9px;font-size:9px}.project-caption{display:flex;justify-content:space-between;font-size:8px;letter-spacing:.6px;margin-top:23px}.now-section{padding:7px 0 84px}.now-paper{display:grid;grid-template-columns:35% 65%;position:relative;border:var(--border);background:var(--green);box-shadow:6px 6px var(--ink);transform:rotate(.65deg)}.now-art{position:relative;min-height:340px;border-right:2px dashed #20211e60;display:flex;flex-direction:column;align-items:center;padding-top:51px;overflow:hidden}.art-label{position:absolute;top:17px;left:21px;font-size:8px}.nas{width:161px;background:var(--paper);border:3px solid var(--ink);box-shadow:8px 8px var(--ink);padding:12px;transform:rotate(-7deg)}.nas-top{font:7px Consolas,monospace;letter-spacing:.8px;margin-bottom:14px}.drive{border:2px solid var(--ink);height:43px;margin-top:7px;display:flex;align-items:center;gap:5px;padding:8px;background:#e1decd}.drive i{height:16px;width:4px;background:var(--ink)}.drive span{margin-left:auto;font:9px Consolas,monospace}.nas-bottom{display:flex;align-items:center;justify-content:space-between;height:32px}.nas-bottom b{font-size:20px}.nas-bottom span{font-size:7px;color:#5c832d}.hand-label{font-family:Georgia,serif;font-size:16px;transform:rotate(-7deg);margin-top:22px;z-index:1;font-style:italic}.cable{position:absolute;bottom:0;left:0;width:100%;height:85px;fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round}.now-copy{padding:40px 85px 35px 42px}.now-copy .eyebrow{display:flex;align-items:center;gap:8px;font-size:9px}.now-copy .status-dot{background:var(--ink);width:6px;height:6px}.now-copy h2{font-size:29px;font-weight:900;letter-spacing:-1px;margin-bottom:18px}.now-copy>p{max-width:500px;font-size:13px;line-height:1.9}.now-tags{display:flex;gap:8px;flex-wrap:wrap;margin:17px 0 23px}.now-tags span{font-size:10px;border:1px solid #20211e70;padding:2px 9px}details{border-top:1px solid #20211e70;font-size:12px}summary{cursor:pointer;display:flex;justify-content:space-between;align-items:center;padding-top:12px;font-weight:700;list-style:none}summary::-webkit-details-marker{display:none}.details-icon{font-size:19px}details[open] .details-icon{transform:rotate(45deg)}.notes{padding:12px 0 0;font-size:11px;line-height:1.85}.notes p+p{margin-top:8px}.wip-stamp{position:absolute;right:15px;top:20px;border:2px solid var(--ink);padding:6px;font-size:8px;line-height:1.4;transform:rotate(11deg);font-weight:bold;letter-spacing:1px;text-align:center}.photos-section{padding:8px 0 60px}.photos-section .section-heading{margin-bottom:24px}.gallery-toolbar{display:flex;align-items:center;justify-content:space-between;border-top:var(--border);padding:19px 0 30px;gap:15px}.gallery-toolbar p{font-size:12px;color:var(--muted)}.filters{display:flex;gap:9px;flex-shrink:0}.filters button{background:transparent;padding:5px 11px;border:1px solid #aaa89f;font-size:10px}.filters button.active{background:var(--ink);color:var(--paper);border-color:var(--ink)}.gallery{display:grid;grid-template-columns:1.12fr 1fr;gap:44px 39px;align-items:start;padding:8px 5px}.photo-card{text-align:left;position:relative;padding:10px 10px 0;background:#fffdf5;border:var(--border);box-shadow:5px 5px var(--ink);width:100%;transition:transform .2s}.photo-card:hover{transform:rotate(0deg) translateY(-4px)}.photo-card[hidden]{display:none}.card-harbor{transform:rotate(-1.8deg)}.card-sky{transform:rotate(2.2deg);margin-top:50px}.card-snow{transform:rotate(1.5deg)}.card-mountains{transform:rotate(-2deg);margin-top:51px}.photo-crop{overflow:hidden}.photo-crop img{width:100%;aspect-ratio:1.5;object-fit:cover;transition:transform .4s}.photo-card:hover img{transform:scale(1.025)}.card-snow .photo-crop img{aspect-ratio:1.5;object-position:center}.card-number{position:absolute;top:-17px;left:24px;background:var(--purple);border:var(--border);font-size:13px;font-weight:bold;z-index:1;padding:0 11px;transform:rotate(-5deg)}.card-sky .card-number,.card-mountains .card-number{background:var(--green)}.gallery-caption{display:flex;justify-content:space-between;align-items:center;padding:18px 8px 19px;gap:12px}.gallery-caption strong{display:block;font-size:15px;font-weight:700;line-height:1.4}.gallery-caption small{font-size:10px;color:#6e6d63;display:block;margin-top:4px}.gallery-caption>.mono{font-size:8px;text-align:right;letter-spacing:.4px}.expand{display:block;font-size:23px;line-height:1.15;margin-top:5px;transition:transform .15s}.gallery-end{display:flex;justify-content:space-between;border-bottom:var(--border);padding:42px 0 20px;font-size:9px;letter-spacing:.5px}.closing{padding:39px 0 75px;display:flex;align-items:center;gap:30px}.closing-star{font-size:99px;color:var(--purple);line-height:1;text-shadow:2px 2px var(--ink);transform:rotate(8deg)}.closing .eyebrow{font-size:9px;margin-bottom:9px}.closing h2{font-size:34px;letter-spacing:-1px}.closing p{font-size:12px;color:var(--muted);margin-top:10px}.back-top{margin-left:auto;border:var(--border);width:55px;height:55px;display:grid;place-items:center;font-size:30px;background:var(--green);box-shadow:4px 4px var(--ink);transition:transform .2s}.back-top:hover{transform:translateY(-5px)}footer{display:flex;justify-content:space-between;align-items:center;border-top:var(--border);padding:24px 0 28px;font-size:10px}footer .mono{font-size:8px}footer a{font-weight:700}.skip{position:fixed;top:-100px;left:20px;padding:10px;background:var(--green);z-index:50}.skip:focus{top:10px}dialog{background:var(--paper);color:var(--ink);border:var(--border);padding:0;width:min(1120px,94vw);max-height:94dvh;box-shadow:9px 9px var(--purple);overflow:auto}dialog::backdrop{background:#171916e8;backdrop-filter:blur(5px)}.viewer-header{display:flex;align-items:center;justify-content:space-between;padding:15px 22px;border-bottom:var(--border)}.viewer-header .mono{font-size:9px}.viewer-header h2{font-size:20px;margin-top:2px}.viewer-header button{border:var(--border);background:var(--green);font-size:27px;width:38px;height:38px;display:grid;place-items:center;line-height:1}.viewer-image-wrap{background:#181916;display:flex;justify-content:center;align-items:center}.viewer-image-wrap img{max-width:100%;max-height:70dvh;width:auto;object-fit:contain}.viewer-footer{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;gap:15px}.viewer-footer p{font-size:11px;text-align:center}.viewer-footer button{background:var(--paper);border:var(--border);width:34px;height:34px;flex-shrink:0}.viewer-footer button:hover{background:var(--purple)}
html[lang=en] .hero h2{font-size:47px;letter-spacing:-2px;line-height:1.25}html[lang=ja] .hero h2{font-size:39px;letter-spacing:-1.5px}html[lang=en] .project-deck{font-size:29px}html[lang=en] .now-copy h2,html[lang=ja] .now-copy h2{font-size:26px}
@media(min-width:1500px){.hero-grid{min-height:630px}.collage{height:570px}.hero-photo{top:72px}.sky-photo{bottom:15px}.photo-index{bottom:60px}.star-doodle{bottom:110px}.intro{font-size:15px}}
@media(max-width:1050px){.wrap{width:calc(100% - 64px)}.brand-note{display:none}.header{height:84px}.hero-grid{min-height:560px}.hero h1{font-size:80px;letter-spacing:-.025em}.hero h2{font-size:38px}.collage{height:440px}.hero-photo{width:92%;top:77px}.sky-photo{width:56%;bottom:5px}.round-sticker{width:97px;height:97px;font-size:16px;padding:18px 4px;top:42px}.round-sticker span{font-size:22px}.photo-index{font-size:6px;bottom:35px}.star-doodle{left:34px;bottom:80px;width:50px}.project-copy{padding:25px}.project h3{font-size:34px}.project-top{flex-wrap:wrap}.project-visual{padding:0 20px 20px}.project-deck{font-size:26px}.now-copy{padding:36px 58px 28px 29px}.now-copy h2{font-size:25px}.now-art{min-height:330px}.now-copy .eyebrow{font-size:8px}.wip-stamp{font-size:6px;right:12px;top:15px}.gallery-toolbar{align-items:start;flex-direction:column}.section-heading h2{font-size:32px}html[lang=en] .hero h2{font-size:36px}html[lang=ja] .hero h2{font-size:30px}.intro{font-size:12px}.project .button{gap:12px}.now-copy>p{font-size:12px}}
@media(max-width:720px){.wrap{width:calc(100% - 38px)}.header{height:76px;gap:10px}.logo{font-size:38px}.logo span{font-size:23px}.header nav{gap:15px;font-size:10px}.languages{margin-left:5px;box-shadow:2px 2px var(--ink)}.languages button{min-width:28px;padding:5px 7px;font-size:10px}.hero{padding-top:19px;padding-bottom:30px}.issue{font-size:7px;letter-spacing:.7px}.issue span:last-child{font-size:6px}.hero-grid{display:flex;flex-direction:column;gap:5px;align-items:stretch}.hero-copy{padding-top:34px}.hello{font-size:12px;padding:1px 11px}.hero h1{font-size:clamp(64px,15vw,95px);letter-spacing:-.025em;margin:10px 0 0}.hero h2{font-size:36px;letter-spacing:-1.5px;line-height:1.4}.hero h2 br{display:block}.intro{max-width:340px;font-size:12px;margin:19px 0 22px}.button{font-size:12px;padding:10px 18px}.hero-foot{margin-top:23px}.collage{height:410px;width:100%;margin:7px 0 0;align-self:auto}.hero-photo{width:77%;top:62px;left:10px}.sky-photo{width:47%;right:5px;bottom:8px}.round-sticker{right:8px;top:37px;width:88px;height:88px;font-size:14px;padding:16px 2px}.round-sticker span{font-size:21px}.scribble-note{font-size:13px;top:13px;left:39px}.scribble-arrow{width:67px;left:164px;top:10px}.photo-index{font-size:6px;left:6px;bottom:43px}.star-doodle{width:46px;bottom:86px;left:55px}.photo-label{padding:9px 2px;font-size:8px}.sky-photo .photo-label{font-size:8px}.ticker{padding:10px 0}.ticker>div{font-size:12px;gap:17px;letter-spacing:1px}.ticker span{font-size:17px}.work-section{padding-top:54px;padding-bottom:48px}.section-heading{margin-bottom:26px;gap:12px}.eyebrow{font-size:8px;letter-spacing:.9px;margin-bottom:9px}.section-heading h2{font-size:26px;letter-spacing:-1px}.margin-note{font-size:11px;max-width:95px;padding-bottom:4px}.project{grid-template-columns:1fr;box-shadow:5px 5px var(--ink)}.project-copy{padding:24px}.project-top{font-size:8px;flex-wrap:nowrap}.project h3{font-size:42px;margin:28px 0 18px}.project-deck{font-size:28px}.project-copy>p:not(.project-deck){font-size:12px;max-width:none}.project-features{margin:20px 0}.project-visual{border-left:0;border-top:var(--border);padding:0 23px 22px}.project-tabs{margin-top:58px}.project-caption{margin-top:19px}.now-section{padding:6px 0 53px}.now-paper{grid-template-columns:1fr;transform:rotate(.4deg);box-shadow:5px 5px var(--ink)}.now-art{display:none}.now-copy{padding:29px 25px}.now-copy h2{font-size:26px;padding-right:8px}.now-copy .eyebrow{font-size:7px;margin-bottom:18px;gap:6px}.now-copy>p{font-size:12px}.wip-stamp{right:11px;top:11px;font-size:5px}.now-tags span{font-size:9px}.now-tags{gap:6px}.photos-section{padding:0 0 34px}.gallery-toolbar{padding:15px 0 25px;gap:14px}.gallery-toolbar p{font-size:11px}.filters{gap:7px}.filters button{font-size:9px;padding:5px 10px}.gallery{grid-template-columns:1fr;gap:31px;padding:7px 3px}.photo-card{padding:8px 8px 0}.card-sky,.card-mountains{margin-top:0}.gallery-caption{padding:14px 6px 15px}.gallery-caption strong{font-size:14px}.gallery-caption small{font-size:9px}.gallery-end{font-size:7px;gap:13px;padding:30px 0 18px;letter-spacing:0}.closing{gap:16px;padding:18px 0 44px}.closing-star{font-size:60px}.closing h2{font-size:25px}.closing .eyebrow{font-size:6px;letter-spacing:.7px}.closing p{font-size:10px;max-width:200px}.back-top{height:38px;width:38px;min-width:38px;font-size:23px;box-shadow:3px 3px var(--ink)}footer{padding:19px 0;font-size:9px}footer .mono{display:none}html[lang=en] .hero h2{font-size:36px}html[lang=en] .hero h2 br,html[lang=ja] .hero h2 br{display:block}html[lang=ja] .hero h2{font-size:32px}html[lang=en] .section-heading h2{font-size:25px}html[lang=ja] .section-heading h2{font-size:24px}html[lang=en] .now-copy h2,html[lang=ja] .now-copy h2{font-size:25px}.viewer-header{padding:12px 15px}.viewer-header h2{font-size:16px}.viewer-footer{padding:12px}.viewer-footer p{font-size:9px}.viewer-image-wrap img{max-height:65dvh}}
@media(max-width:380px){.header nav{gap:10px;font-size:9px}.languages button{min-width:25px;padding:5px}.hero h2{font-size:32px}.collage{height:355px}.section-heading h2{font-size:23px}.margin-note{font-size:10px}.hero h1{font-size:67px}.project-copy{padding:20px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{transition:none!important;animation:none!important}}
@media(min-width:1100px){.photo-index{bottom:-16px;left:10px;transform:rotate(-2deg)}}

@media(max-width:720px){.brand-subline{font-size:8px;letter-spacing:1.2px;margin:9px 0 21px}}

.card-sumida{grid-column:1 / -1;transform:rotate(-.65deg);margin-top:8px}.card-sumida .photo-crop img{aspect-ratio:2 / 1;object-position:center 70%}.card-sumida .card-number{background:var(--purple)}
@media(max-width:720px){.card-sumida{margin-top:0}.card-sumida .photo-crop img{aspect-ratio:1.5;object-position:center}}

.card-tree{grid-column:1 / -1;max-width:530px;justify-self:center;transform:rotate(1deg);margin-top:8px}.card-tree .photo-crop img{aspect-ratio:auto;width:100%;height:auto;object-fit:contain}.card-tree .card-number{background:var(--green)}
@media(max-width:720px){.card-tree{margin-top:0}}
@media(max-width:720px),(max-height:500px){.viewer-header button,.viewer-footer button{width:44px;height:44px;min-width:44px}}
@media(max-height:500px){dialog[open]{display:flex;flex-direction:column;height:94dvh;max-height:94dvh;overflow:hidden}.viewer-header,.viewer-footer{flex-shrink:0}.viewer-image-wrap{flex:1;min-height:0;overflow:hidden}.viewer-image-wrap img{width:100%;height:100%;max-height:100%;object-fit:contain}.viewer-header{padding:8px 16px}.viewer-footer{padding:8px 16px}.viewer-header h2{font-size:16px}}

.gallery.timeline{display:block;padding:8px 5px 0}.timeline-group{display:grid;grid-template-columns:105px minmax(0,1fr);gap:34px;position:relative;padding:12px 0 60px}.timeline-group[hidden]{display:none}.timeline-group::before{content:"";position:absolute;top:27px;bottom:-15px;left:116px;width:1px;background:#20211e35}.timeline-group:last-child::before{bottom:60px}.timeline-date{margin:0;padding-top:4px;font-family:"SFMono-Regular",Consolas,monospace;font-weight:400;position:relative}.timeline-date::after{content:"";position:absolute;top:10px;right:-16px;width:9px;height:9px;border:2px solid var(--ink);background:var(--purple);transform:rotate(8deg)}.date-year{display:block;font-size:10px;letter-spacing:2px;color:var(--muted)}.date-day{display:block;font-size:25px;line-height:1.5;letter-spacing:-1px}.timeline-photos{display:grid;grid-template-columns:minmax(0,1fr);align-items:start;gap:27px;min-width:0;padding:4px 4px 0}.timeline-pair .timeline-photos{grid-template-columns:repeat(2,minmax(0,1fr));gap:27px}.timeline .photo-card{margin-top:0;grid-column:auto}.timeline .card-snow{max-width:710px;justify-self:start;transform:rotate(-1.1deg)}.timeline .card-harbor{transform:rotate(-1.3deg)}.timeline .card-mountains{margin-top:34px;transform:rotate(1.3deg)}.timeline .card-tree{max-width:450px;justify-self:center;transform:rotate(-.8deg)}.timeline .card-sumida{max-width:940px;justify-self:center}.timeline .card-sky{max-width:710px;justify-self:end;transform:rotate(1.2deg)}.timeline .photo-card:hover{transform:rotate(0) translateY(-4px)}.timeline+.gallery-end{padding-top:0}
@media(max-width:1050px){.timeline-group{grid-template-columns:80px minmax(0,1fr);gap:25px}.timeline-group::before{left:90px}.timeline-date::after{right:-17px}.date-day{font-size:22px}.timeline-pair .timeline-photos{gap:20px}.timeline .gallery-caption{padding:14px 4px;gap:7px}.timeline .gallery-caption strong{font-size:13px}.timeline .gallery-caption>.mono{font-size:7px}.timeline .card-tree{max-width:390px}}
@media(max-width:720px){.gallery.timeline{padding:0 3px}.timeline-group{display:block;padding:7px 0 37px}.timeline-group::before{display:none}.timeline-date{display:flex;align-items:center;gap:14px;margin-bottom:20px;padding:0 0 9px;border-bottom:1px solid #20211e50}.timeline-date time{display:flex;align-items:baseline;gap:12px}.date-year{font-size:10px;letter-spacing:1px}.date-day{font-size:20px;line-height:1.4;letter-spacing:0}.timeline-date::after{position:static;width:8px;height:8px;flex-shrink:0;margin-left:auto;margin-right:3px}.timeline-photos,.timeline-pair .timeline-photos{grid-template-columns:minmax(0,1fr);gap:29px;padding:4px 0}.timeline .card-mountains{margin-top:0}.timeline .card-tree{max-width:100%}.timeline .gallery-caption strong{font-size:14px}.timeline .gallery-caption>.mono{font-size:8px}.timeline .gallery-caption{padding:14px 6px 15px}}

/* A shared project stage keeps additional work from extending the page. */
.project-selector{display:flex;justify-content:space-between;align-items:center;gap:16px;margin:0 0 20px}.project-choices{display:flex;gap:8px}.project-choices button{border:var(--border);background:var(--paper);padding:10px 15px;font:700 12px Consolas,monospace;min-height:44px}.project-choices button[aria-pressed=true]{background:var(--purple);box-shadow:3px 3px var(--ink)}.project-paging{display:flex;align-items:center;gap:8px}.project-paging .mono{margin-right:10px;white-space:nowrap}.project-paging button{height:44px;width:44px;border:var(--border);background:var(--paper);font-size:23px;line-height:1}.project-paging button:hover{background:var(--green)}.project h3 #project-name{font-size:inherit}.project-copy .project-deck{min-height:2.8em}.project-copy>p:not(.project-deck){min-height:5.7em}.project-tabs button{min-height:40px}.now-tags>.openclaw-tag{display:inline-flex;align-items:center;gap:5px;background:var(--purple);border:1px solid var(--ink);box-shadow:2px 2px var(--ink);transform:rotate(-3deg);font-weight:700;padding:2px 10px}.openclaw-tag i{font-style:normal;font-size:15px;line-height:1.25}
/* Two full portrait frames share the same date, with a shallow paper overlap. */
.timeline-duo .timeline-photos{display:grid;grid-template-columns:repeat(20,minmax(0,1fr));gap:0;align-items:start;padding:12px 10px 12px}.timeline-duo .card-tree{grid-column:1 / 12;grid-row:1;max-width:none;transform:rotate(-3deg);z-index:2}.timeline-duo .card-bamboo{grid-column:11 / 21;grid-row:1;margin-top:80px;transform:rotate(4deg);z-index:1}.card-bamboo .photo-crop img{aspect-ratio:auto;width:100%;height:auto;object-fit:contain}.timeline-duo .photo-card:hover,.timeline-duo .photo-card:focus-visible{z-index:3;transform:rotate(0) translateY(-4px)}.duo-note{grid-column:1 / -1;justify-self:end;margin:34px 15px 0;font:italic 18px "Kaiti SC","YuMincho",Georgia,serif;transform:rotate(-3deg)}
@media(max-width:720px){.project-selector{flex-wrap:wrap;gap:12px}.project-choices{flex:1}.project-choices button{font-size:10px;padding:8px 10px;flex:1;white-space:nowrap}.project-paging{margin-left:auto}.project-paging .mono{font-size:9px}.project h3{font-size:clamp(32px,9vw,42px)}.project-copy>p:not(.project-deck){min-height:5.7em}.project-tabs button{min-height:44px}.timeline-duo .timeline-photos{grid-template-columns:repeat(20,minmax(0,1fr));padding:6px 7px 0}.timeline-duo .card-tree{grid-column:1 / 18;grid-row:1;transform:rotate(-2deg)}.timeline-duo .card-bamboo{grid-column:5 / 21;grid-row:2;margin-top:-45px;transform:rotate(3deg)}.timeline-duo .gallery-caption{flex-wrap:wrap;gap:5px;padding:12px 4px}.timeline-duo .gallery-caption>.mono{margin-left:auto}.timeline-duo .gallery-caption strong{font-size:13px}.duo-note{font-size:15px;margin-top:25px}}

/* The workstation and storage are connected as one illustrated home lab. */
.now-art{padding:52px 15px 20px;justify-content:center;min-height:565px}.studio-machines{width:300px;height:490px;position:relative;flex-shrink:0;max-width:100%}.studio-cable{position:absolute;inset:0;width:100%;height:470px;fill:var(--paper);stroke:var(--ink);stroke-width:2;stroke-linecap:round}.studio-cable path{fill:none}.imac{position:absolute;width:214px;top:4px;left:calc(50% - 107px);transform:rotate(4deg);z-index:1}.imac-body{border:3px solid var(--ink);background:#83b5d8;box-shadow:6px 6px var(--ink);padding:9px 9px 0}.imac-screen{background:#e8f1f5;border:2px solid var(--ink);padding:10px 12px;color:var(--ink);font:9px/1.75 Consolas,monospace;display:flex;flex-direction:column}.screen-prompt{border-bottom:1px solid #20211e55;margin-bottom:5px;padding-bottom:4px}.screen-prompt b{float:right;color:#7052af}.imac-screen i{float:right;font-style:normal}.screen-line{height:3px;width:27px;background:var(--purple);margin-top:5px}.imac-chin{display:flex;align-items:center;justify-content:space-between;height:27px;font:8px Consolas,monospace}.imac-chin b{font-size:17px}.imac-stand{margin:auto;width:38px;height:28px;background:#83b5d8;border:2px solid var(--ink);border-top:0;transform:skew(-9deg)}.imac-foot{width:78px;height:9px;background:#a5c7df;border:2px solid var(--ink);margin:-1px auto 0;box-shadow:3px 3px var(--ink)}.studio-machines .nas{position:absolute;top:283px;left:calc(50% - 78px);width:156px;transform:rotate(-6deg);z-index:1}.connection-label{position:absolute;top:217px;left:76px;font-size:8px;letter-spacing:.5px;transform:rotate(-4deg);background:var(--green);padding:2px 5px}.studio-machines .hand-label{position:absolute;top:453px;left:0;width:100%;text-align:center;margin:0;font-size:16px}.now-copy{align-self:center;padding-top:42px;padding-bottom:38px}.studio-notes{margin-top:22px;display:grid;gap:17px}.studio-notes .mono{font-size:8px;letter-spacing:1px;color:#4c5e24}.studio-notes h3{font-size:14px;margin:3px 0 5px;line-height:1.5}.studio-notes p{font-size:12px;line-height:1.85;max-width:500px}.now-tags{margin-top:22px}
@media(min-width:721px) and (max-width:1050px){.imac{width:185px;left:calc(50% - 92px)}.connection-label{left:40px}.studio-machines .hand-label{font-size:14px}}
@media(max-width:720px){.now-art{display:flex;min-height:0;padding:45px 14px 12px;border-right:0;border-bottom:2px dashed #20211e60}.studio-machines{width:300px;max-width:100%;height:256px}.imac{width:160px;left:0;top:5px;transform:rotate(-4deg)}.imac-screen{padding:6px 8px;font-size:7px}.imac-chin{height:23px;font-size:7px}.imac-body{padding:7px 7px 0;box-shadow:4px 4px var(--ink)}.imac-stand{height:21px}.imac-foot{width:60px;height:7px}.studio-machines .nas{width:111px;top:86px;left:auto;right:0;padding:8px;box-shadow:5px 5px var(--ink);transform:rotate(5deg)}.studio-machines .nas-top{font-size:5px;margin-bottom:9px}.studio-machines .drive{height:30px;padding:5px;gap:4px}.studio-machines .drive i{height:12px;width:3px}.studio-machines .nas-bottom{height:24px}.studio-machines .hand-label{top:235px;font-size:14px}.studio-cable{width:100%;height:232px}.connection-label{top:187px;left:37px;font-size:7px}.now-copy{padding:26px 25px 28px}.now-copy .eyebrow{margin-bottom:13px}.studio-notes{gap:15px}.studio-notes p{font-size:11px}.studio-notes h3{font-size:13px}.wip-stamp{top:17px;right:16px}}

.brand-subline{margin-bottom:9px}.role-line{font-size:11px;letter-spacing:.5px;line-height:1.7;margin:0 0 23px;color:var(--muted);max-width:420px}.role-line::before{content:"";display:inline-block;width:6px;height:6px;background:var(--purple);border:1px solid var(--ink);margin-right:7px;vertical-align:1px}@media(max-width:720px){.role-line{font-size:9px;margin-bottom:20px}.brand-subline{margin-bottom:7px}}
@media(min-width:721px){.studio-machines{height:520px}.studio-machines .hand-label{top:491px}.timeline-duo .card-bamboo .gallery-caption{padding-left:22%}}

.studio-cable-mobile{display:none}@media(max-width:720px){.studio-cable{display:none}.studio-cable-mobile{display:block;position:absolute;inset:0;width:100%;height:256px;fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round}.connection-label{top:207px;left:27px}}

/* Date chapters keep the expanded archive easy to scan. */
.photo-years{display:flex;gap:9px;margin:0 0 28px}.photo-years a{border:var(--border);padding:8px 16px;background:var(--paper);box-shadow:2px 2px var(--ink)}.photo-years a:hover{background:var(--purple)}.chapter-heading{display:flex;align-items:center;justify-content:space-between;border-top:var(--border);margin:10px 0 32px;padding:14px 0 0}.chapter-year{font-size:44px;font-weight:900;letter-spacing:-2px;line-height:1.1}.chapter-heading .mono{font-size:9px}.timeline-chapter[hidden]{display:none}.timeline-single .photo-card{max-width:690px;justify-self:start;transform:rotate(-1deg)}.timeline-single .card-north{max-width:365px;justify-self:end;transform:rotate(2deg)}.timeline-single .card-sky{justify-self:end}.timeline-single .card-sumida{max-width:940px}.timeline-pair .photo-card:nth-child(2){margin-top:32px;transform:rotate(1.8deg)}.timeline-pair .photo-card:first-child{transform:rotate(-1.8deg)}.timeline .frame-portrait .photo-crop img{aspect-ratio:auto;object-fit:contain;height:auto}.timeline-aquarium .photo-crop img,.timeline-fireworks .photo-crop img{aspect-ratio:1.5;object-fit:contain;background:#0a0c10}.timeline-duo .card-bamboo{grid-column:1 / 12;grid-row:1;margin-top:0;transform:rotate(-3deg);z-index:2}.timeline-duo .card-tree{grid-column:11 / 21;grid-row:1;margin-top:150px;transform:rotate(3deg);z-index:1}.timeline-duo .card-bamboo .gallery-caption{padding-left:8px}.timeline-duo .photo-card:hover,.timeline-duo .photo-card:focus-visible{z-index:3;transform:rotate(0) translateY(-4px)}
@media(max-width:720px){.photo-years{margin-bottom:24px}.photo-years a{min-height:44px;display:flex;align-items:center;font-size:10px}.chapter-heading{margin-bottom:24px}.chapter-year{font-size:34px}.timeline-group{padding-bottom:35px}.timeline-pair .photo-card:nth-child(2){margin-top:0}.timeline-single .card-north{max-width:86%;justify-self:center}.timeline-duo .card-bamboo{grid-column:1 / 18;grid-row:1;margin-top:0;transform:rotate(-2deg)}.timeline-duo .card-tree{grid-column:5 / 21;grid-row:2;margin-top:-35px;transform:rotate(3deg)}.timeline-duo .card-bamboo .gallery-caption{padding-left:4px}.filters{flex-wrap:wrap}.filters button{min-height:40px}}
.timeline-duo .card-bamboo:hover,.timeline-duo .card-bamboo:focus-visible{z-index:2;transform:rotate(-3deg) translateY(-4px)}.timeline-duo .card-tree:hover,.timeline-duo .card-tree:focus-visible{z-index:1;transform:rotate(3deg) translateY(-4px)}
.timeline .frame-landscape .photo-crop img{height:auto;aspect-ratio:auto}

/* A landscape print and a portrait phone snapshot share the hero collage. */
.hero-photo img{aspect-ratio:4/3;object-fit:cover}
.sky-photo.phone-portrait{width:36%;right:0;bottom:-2px;transform:rotate(7deg)}
.sky-photo.phone-portrait img{aspect-ratio:3/4;object-fit:cover}
.phone-portrait .photo-label{gap:8px;font-size:clamp(10px,1vw,14px)}
#viewer-caption{white-space:pre-line}
@media(max-width:720px){.sky-photo.phone-portrait{width:37%;right:2%;bottom:8px}.phone-portrait .photo-label{font-size:11px}}

/* Adjacent dates form editorial spreads instead of isolated full-width rows. */
.timeline-spread{display:grid;gap:38px;align-items:center;margin:12px 0 52px;padding-left:139px}
.winter-spread{grid-template-columns:minmax(0,.65fr) minmax(0,1.35fr)}
.daily-spread{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
.timeline-spread .timeline-group{display:block;padding:0;min-width:0}
.timeline-spread .timeline-group::before{display:none}
.timeline-spread .timeline-date{display:flex;align-items:center;gap:12px;margin:0 0 23px;padding:0 0 10px;border-bottom:1px solid #20211e50}
.timeline-spread .timeline-date time{display:flex;align-items:baseline;gap:12px}
.timeline-spread .date-day{font-size:22px}
.timeline-spread .timeline-date::after{position:static;margin-left:auto;margin-right:3px}
.timeline-spread .timeline-photos{display:block;padding:0 3px}
.timeline-spread .photo-card{max-width:none;transform:rotate(-1deg)}
.timeline-spread .timeline-group:nth-child(2) .photo-card{transform:rotate(1.5deg)}
.timeline-spread .photo-card:hover{transform:rotate(0) translateY(-4px)}
.timeline-spread .gallery-caption{padding:16px 5px;flex-wrap:wrap;gap:7px}
.timeline-spread .gallery-caption>.mono{margin-left:auto}
.timeline-spread:has(>.timeline-group[hidden]):not(:has(>.timeline-group:not([hidden]))){display:none}
.timeline-spread:has(>.timeline-group[hidden]){grid-template-columns:minmax(0,1fr)}
.timeline-spread:has(>.timeline-group[hidden]) .frame-portrait{max-width:365px}
@media(max-width:1050px){.timeline-spread{padding-left:105px;gap:28px}}
@media(max-width:720px){.timeline-spread{display:block;padding-left:0;margin:0}.timeline-spread .timeline-group{padding:7px 0 35px}.timeline-spread .timeline-photos{padding:4px 0}.timeline-spread .timeline-date{margin-bottom:20px}.timeline-spread .date-day{font-size:20px}.timeline-spread .card-north{max-width:86%;display:block;margin:0 auto}.timeline-spread .gallery-caption{padding:14px 6px 15px}}

.hero-photo{width:82%}.photo-index{bottom:-27px;left:8px;transform:rotate(-2deg)}
@media(max-width:720px){.photo-index{bottom:-15px;font-size:7px}}
.hero-photo,.hero-photo:hover{z-index:1}.sky-photo.phone-portrait,.sky-photo.phone-portrait:hover{z-index:3}.round-sticker{z-index:4}

/* The lightbox is a photo-sized paper print with its notes below the image. */
#viewer{
  --viewer-ratio:1.5;
  --print-height:calc(90dvh - 120px);
  width:min(92vw,calc(var(--print-height) * var(--viewer-ratio) + 24px));
  min-width:min(340px,92vw);
  max-width:1120px;
  max-height:94dvh;
  height:fit-content;
  padding:12px;
  background:#fffdf5;
  border:0;
  box-shadow:6px 7px var(--purple);
  overflow-y:auto;
  overflow-x:hidden;
  overscroll-behavior:contain;
}
#viewer[open]{display:block}
#viewer::backdrop{background:#20211eaa;backdrop-filter:blur(5px)}
#viewer .viewer-image-wrap{display:block;background:transparent;overflow:visible;min-height:0}
#viewer .viewer-image-wrap img{display:block;width:100%;height:auto;max-height:none;max-width:100%;object-fit:contain}
#viewer .viewer-caption-bar{padding:12px 6px 2px}
#viewer .viewer-title-row{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:6px}
#viewer #viewer-title{font-size:19px;line-height:1.3;margin:0;font-weight:750;color:var(--ink);min-width:0;overflow-wrap:break-word}
#viewer .viewer-action{flex:none}
#viewer .viewer-link-btn{font-size:11.5px!important;padding:6px 14px!important;gap:6px!important;white-space:nowrap!important;box-shadow:2.5px 2.5px var(--purple)!important}
#viewer-caption{padding:0;font-size:12px;line-height:1.55;white-space:pre-line;color:var(--muted);margin:0}
#viewer .viewer-footer{display:flex;justify-content:space-between;align-items:center;padding:10px 4px 2px;margin-top:8px;border-top:1px dashed rgba(32,33,30,.2)}
#viewer-index{font-size:10px;letter-spacing:.6px;text-align:center;color:var(--muted)}
#viewer .viewer-footer button{width:36px;height:36px;min-width:36px;font-size:18px;display:grid;place-items:center;border:var(--border);background:var(--paper);box-shadow:2px 2px var(--ink);cursor:pointer;transition:transform .15s,background .15s}
#viewer .viewer-footer button:hover{background:var(--green);transform:translateY(-2px)}
#close-viewer{position:absolute;top:20px;right:20px;z-index:10;border:2px solid var(--ink);background:var(--green);width:40px;height:40px;display:grid;place-items:center;font-size:24px;line-height:1;box-shadow:2px 2px var(--ink);cursor:pointer;transition:transform .15s,background .15s}
#close-viewer:hover{transform:rotate(90deg) scale(1.08)}

/* 竖版照片拍立得专属布局与比例优化：避免底下空白过多失调 */
#viewer[data-orientation="portrait"]{
  --print-height:calc(86dvh - 110px);
  min-width:min(92vw,360px);
  max-width:min(92vw,480px);
}
#viewer[data-orientation="portrait"] .viewer-caption-bar{padding:10px 4px 2px}
#viewer[data-orientation="portrait"] .viewer-title-row{margin-bottom:4px}
#viewer[data-orientation="portrait"] #viewer-title{font-size:17px}
#viewer[data-orientation="portrait"] #viewer-caption{font-size:11px;line-height:1.45}
#viewer[data-orientation="portrait"] .viewer-footer{padding:8px 2px 2px;margin-top:6px}

@media(max-width:720px){
  #viewer{
    padding:8px;
    --print-height:calc(88dvh - 95px);
    width:min(94vw,calc(var(--print-height) * var(--viewer-ratio) + 16px));
    min-width:min(94vw,290px);
    max-height:96dvh;
    box-shadow:4px 5px var(--purple);
  }
  #viewer[data-orientation="portrait"]{
    --print-height:calc(86dvh - 85px);
    min-width:min(94vw,290px);
    max-width:94vw;
  }
  #viewer .viewer-caption-bar{padding:8px 4px 2px}
  #viewer .viewer-title-row{gap:8px;margin-bottom:4px}
  #viewer #viewer-title{font-size:15px;line-height:1.25}
  #viewer .viewer-link-btn{font-size:10.5px!important;padding:5px 10px!important;gap:4px!important;box-shadow:2px 2px var(--purple)!important}
  #viewer-caption{font-size:10.5px;line-height:1.45}
  #viewer .viewer-footer{padding:6px 2px 2px;margin-top:6px}
  #viewer .viewer-footer button{width:32px;height:32px;min-width:32px;font-size:16px}
  #viewer-index{font-size:8px;letter-spacing:.2px}
  #close-viewer{top:14px;right:14px;width:34px;height:34px;font-size:20px}
}
@media(max-height:500px){
  #viewer{--print-height:calc(92dvh - 90px);min-width:min(230px,92vw)}
  #viewer .viewer-caption-bar{padding-top:6px}
  #viewer #viewer-title{font-size:14px}
  #viewer-caption{font-size:10px;line-height:1.35}
  #viewer .viewer-footer{padding-top:4px}
}

/* Keep Safari's automatic text inflation predictable without disabling user zoom. */
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
.ticker{width:calc(100% - 4px);margin-inline:2px}
a,button,summary{touch-action:manipulation}
.header nav a{display:inline-flex;align-items:center;min-height:44px}
.languages button,.project-tabs button,.filters button{min-height:44px}
.intro,.project-copy>p:not(.project-deck),.now-copy>p{font-size:16px}
.studio-notes p,.notes,.gallery-toolbar p{font-size:14px}
.project-features>div{font-size:13px}
@media(max-width:720px){
  .header{height:auto;display:grid;grid-template-columns:1fr auto;gap:6px 12px;padding:14px 0 8px}
  .header .logo{grid-column:1;grid-row:1}
  .header .languages{grid-column:2;grid-row:1;margin-left:0}
  .languages button{min-width:44px;min-height:44px;font-size:12px;padding:6px 9px}
  .header nav{grid-column:1 / -1;grid-row:2;margin-left:0;justify-content:space-between;gap:12px;font-size:14px}
  .intro,.project-copy>p:not(.project-deck),.now-copy>p,.studio-notes p,.notes{font-size:16px;line-height:1.8}
  .project-copy>p:not(.project-deck){min-height:0}
  .studio-notes h3,summary{font-size:16px}
  summary{min-height:44px}
  .role-line,.hero-foot,.brand-subline{font-size:12px}
  .brand-subline{letter-spacing:1px}
  .button,.project .button,.project-features>div,.project-tabs button,.project-choices button{font-size:14px}
  .tags span,.now-tags span{font-size:12px}
  .gallery-toolbar{flex-wrap:wrap}
  .gallery-toolbar p{font-size:14px}
  .filters{flex-wrap:wrap;gap:8px}
  .filters button{font-size:12px;padding:8px 12px}
  .gallery-caption small,.gallery-caption>.mono,.photo-label,.sky-photo .photo-label{font-size:12px}
  .gallery-caption strong,.timeline-duo .gallery-caption strong{font-size:16px}
  .gallery-caption{flex-wrap:wrap}
  .gallery-caption>.mono{margin-left:auto}
  .closing p,.footer{font-size:12px}
}
@media(hover:none){
  .photo-card:hover img{transform:none}
}


/* Home Lab: a quiet device illustration beside a readable, localized notebook. */
#now.now-section{padding:58px 0 80px}
@media(max-width:720px){#now.now-section{padding:36px 0 54px}}
#now .now-paper{grid-template-columns:minmax(0,.93fr) minmax(0,1.07fr);background:var(--paper);transform:none;box-shadow:7px 7px var(--ink);align-items:stretch}
#now .lab-art{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;align-self:start;position:relative;min-width:0;background:var(--green);padding:36px 24px 32px;border-right:2px solid var(--ink);width:100%;height:100%;gap:24px}
#now .lab-art-label{align-self:flex-start;font-size:12px;letter-spacing:1.2px;line-height:1.5;border-bottom:1px solid var(--ink);padding-bottom:7px}
#now .lab-devices{display:block;width:100%;height:auto;aspect-ratio:1197 / 1314;object-fit:contain;margin:0}
#now .lab-handwritten{font:italic clamp(18px,2vw,25px)/1.4 Georgia,serif;align-self:flex-start;padding:0 8px;transform:rotate(-3deg)}
#now .lab-copy{padding:44px clamp(28px,3.4vw,50px) 34px;align-self:start;min-width:0}
#now .lab-copy .eyebrow{font-size:11px;letter-spacing:1.2px;line-height:1.6;margin-bottom:25px}
#now .lab-copy h2{font-size:clamp(30px,3.4vw,47px);line-height:1.25;letter-spacing:-1.2px;margin:0 0 24px;padding:0;text-wrap:balance}
#now .lab-intro{font-size:16px;line-height:1.85;max-width:none;color:#45463f}
#now .lab-chapters{list-style:none;margin:30px 0 28px;padding:0;display:grid;gap:23px}
#now .lab-chapters li{display:grid;grid-template-columns:34px minmax(0,1fr);gap:15px;align-items:start}
#now .lab-number{font-size:18px;font-weight:700;line-height:1.5;color:#7551b5;letter-spacing:.5px}
#now .lab-chapters h3{font-size:18px;line-height:1.5;font-weight:750;margin:0 0 3px}
#now .lab-chapters p{font-size:14px;line-height:1.65;color:#4c4d46;overflow-wrap:break-word}
#now .lab-notebook{border-top:2px solid var(--ink);margin-top:14px;font-size:16px}
#now .lab-notebook summary{display:flex;justify-content:space-between;align-items:center;min-height:52px;gap:18px;padding:13px 6px;line-height:1.6;font-size:16px;font-weight:700;cursor:pointer;user-select:none;outline:none;transition:background .15s,box-shadow .15s,padding .15s}
#now .lab-notebook summary:hover{background:#dfd2fb22}
#now .lab-notebook[open] summary{background:#dfd2fb30;border:2px solid var(--purple);box-shadow:3px 3px var(--ink);padding:11px 14px;margin-bottom:18px}
#now .lab-notebook summary::-webkit-details-marker{display:none}
#now .details-icon{flex:none;font-size:24px;line-height:1;font-weight:400;transition:transform .2s cubic-bezier(.34,1.56,.64,1)}
#now .lab-notebook[open] .details-icon{transform:rotate(45deg)}
#now .lab-note-content{padding:10px 0 21px;display:grid;gap:23px}
#now .lab-note-content h3{font-size:16px;line-height:1.6;margin:0 0 6px}
#now .lab-note-content p{font-size:14px;line-height:1.85;color:#4c4d46;margin:0}
#now .lab-photo-flow{margin-top:12px;padding-left:15px;border-left:2px solid var(--purple);display:grid;gap:8px}
#now .lab-topics{font-size:12px;line-height:1.8;letter-spacing:.3px;color:var(--muted);max-width:none;margin-top:8px}
@media(min-width:721px) and (max-width:1000px){
  #now .now-paper{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}
  #now .lab-art{padding:26px 15px;gap:26px}
  #now .lab-copy{padding:30px 24px 25px}
  #now .lab-copy h2{font-size:32px}
  #now .lab-chapters{gap:20px;margin:25px 0}
  #now .lab-chapters li{gap:10px;grid-template-columns:28px minmax(0,1fr)}
  #now .lab-chapters h3{font-size:17px}
  #now .lab-handwritten{font-size:18px}
}
@media(max-width:720px){
  #now .now-paper{grid-template-columns:minmax(0,1fr);box-shadow:5px 5px var(--ink)}
  #now .lab-art{padding:23px 21px 25px;border-right:0;border-bottom:2px solid var(--ink);height:auto;gap:14px}
  #now .lab-art-label{font-size:11px}
  #now .lab-devices{width:min(100%,390px);margin:0 auto}
  #now .lab-handwritten{font-size:20px;align-self:center}
  #now .lab-copy{padding:29px 24px 24px}
  #now .lab-copy .eyebrow{font-size:10px;letter-spacing:1px;margin-bottom:18px}
  #now .lab-copy h2{font-size:clamp(28px,7.3vw,40px);letter-spacing:-.8px;margin-bottom:20px}
  #now .lab-intro{font-size:16px;line-height:1.85}
  #now .lab-chapters{gap:23px;margin:27px 0}
  #now .lab-chapters li{grid-template-columns:26px minmax(0,1fr);gap:12px}
  #now .lab-number{font-size:17px}
  #now .lab-chapters h3{font-size:17px}
  #now .lab-chapters p,#now .lab-note-content p{font-size:16px;line-height:1.75}
  #now .lab-notebook summary{font-size:16px;min-height:52px}
  #now .lab-topics{font-size:12px;line-height:1.8}
}
@media(prefers-reduced-motion:reduce){#now .details-icon{transition:none}}

/* STACK 贴纸墙 v2 — 分簇错落 / 报纸画报剪纸风（展开笔记本时贴满左侧下部） */
#now .lab-stack-board{
  --u:50px;
  --note-fs:12px;
  display:none;
  width:100%;
  position:relative;
  background-color:#fffef8;
  background-image:radial-gradient(#20211e22 1.1px,transparent 1.1px);
  background-size:13px 13px;
  border:var(--border);
  box-shadow:6px 6px var(--ink);
  padding:34px 14px 22px;
  transform:rotate(-.5deg);
  animation:labStickersReveal .24s cubic-bezier(.22,1,.36,1);
  box-sizing:border-box;
  margin-top:14px;
}
#now .now-paper.is-notebook-open .lab-art{
  align-self:stretch;
  height:100%;
}
#now .now-paper.is-notebook-open .lab-stack-art,
#now .now-paper:has(.lab-notebook[open]) .lab-stack-art{
  display:flex;
  flex-direction:column;
  flex:1;
  min-height:560px;
}
#now .lab-stack-inline{
  display:none;
}
#now .lab-stack-tag{
  position:absolute;
  top:-12px;
  left:14px;
  transform:rotate(-2deg);
  background:#d0c1ead9;
  border-left:1px dashed #5d417345;
  border-right:1px dashed #5d417345;
  padding:3px 12px;
  font:800 10px/1.3 ui-monospace,Menlo,monospace;
  letter-spacing:.8px;
  color:var(--ink);
  box-shadow:2px 2px var(--ink);
  z-index:6;
  white-space:nowrap;
}
#now .lab-stack-wall{
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  flex:1;
  gap:4px;
}
#now .lab-row{
  list-style:none;
  margin:0;
  padding:0 var(--ind,0);
  display:flex;
  align-items:center;
  gap:6px 4px;
  position:relative;
}
#now .lab-row+.lab-row{margin-top:calc(var(--u)*-.14)}
#now .lab-row.is-start{justify-content:flex-start}
#now .lab-row.is-end{justify-content:flex-end}
#now .lab-row.is-center{justify-content:center}
#now .lab-row.is-spread{justify-content:space-between}
#now .lab-row>li{
  --r:0deg;
  --s:1;
  --y:0px;
  flex:none;
  position:relative;
  transform:translateY(var(--y)) rotate(var(--r));
  transition:transform .18s cubic-bezier(.34,1.56,.64,1),z-index .18s;
}
#now .lab-row>li:hover{
  transform:translateY(calc(var(--y) - 5px)) rotate(calc(var(--r) + 3deg)) scale(1.1);
  z-index:10;
}
#now .lab-sticker{
  width:calc(var(--u)*var(--s));
  aspect-ratio:1;
  margin:0 -2px;
  cursor:pointer;
}
#now .lab-sticker svg{
  display:block;
  width:100%;
  height:100%;
  overflow:visible;
  stroke:var(--ink);
  stroke-width:2.8;
  stroke-linejoin:round;
  stroke-linecap:round;
  filter:drop-shadow(2.2px 0 0 #fff) drop-shadow(-2.2px 0 0 #fff) drop-shadow(0 2.2px 0 #fff) drop-shadow(0 -2.2px 0 #fff) drop-shadow(calc(var(--s)*2.5px) calc(var(--s)*3.2px) 0 var(--ink));
}
#now .lab-sticker::after{
  content:attr(data-name);
  position:absolute;
  left:50%;
  bottom:-24px;
  transform:translateX(-50%) rotate(calc(var(--r)*-1));
  background:var(--ink);
  color:#fffef8;
  font:800 9px/1 ui-monospace,Menlo,monospace;
  padding:3px 6px;
  white-space:nowrap;
  opacity:0;
  pointer-events:none;
  transition:opacity .15s;
  box-shadow:2px 2px var(--purple);
  z-index:12;
}
#now .lab-sticker:hover::after{opacity:1}
#now .lab-note{
  background:#fff3a8;
  border:1.5px solid var(--ink);
  box-shadow:2.5px 3px 0 var(--ink);
  padding:6px 10px;
  margin:0 4px;
  font:italic var(--note-fs)/1.2 Georgia,"Songti SC",serif;
  color:var(--ink);
  white-space:nowrap;
  cursor:default;
  position:relative;
}
#now .lab-note::before{
  content:"";
  position:absolute;
  top:-7px;
  left:50%;
  width:30px;
  height:11px;
  transform:translateX(-50%) rotate(-2.5deg);
  background:#d0c1ead9;
  border-left:1px dashed #5d417345;
  border-right:1px dashed #5d417345;
  box-shadow:0 1px 2px rgba(0,0,0,.06);
  pointer-events:none;
}
#now .lab-tape{
  padding:5px 14px;
  margin:0 3px;
  font:800 calc(var(--note-fs) - 2px)/1.2 ui-monospace,Menlo,monospace;
  color:var(--ink);
  white-space:nowrap;
  cursor:default;
  border:1px solid rgba(32,33,30,.2);
  box-shadow:1.5px 2px 0 var(--ink);
  clip-path:polygon(0 0,100% 0,97% 25%,100% 50%,97% 75%,100% 100%,0 100%,3% 75%,0 50%,3% 25%);
}
#now .lab-tape-blue{background:repeating-linear-gradient(135deg,#bfe0ff 0 6px,#d9eeff 6px 12px)}
#now .lab-tape-yellow{background:repeating-linear-gradient(135deg,#e3fb96 0 6px,#f2fdc5 6px 12px)}
#now .lab-tape-purple{background:repeating-linear-gradient(135deg,#e0d4fc 0 6px,#f0eaff 6px 12px)}
#now .lab-stamp{
  --c:#d9402f;
  width:calc(var(--u)*1.35);
  aspect-ratio:1;
  border-radius:50%;
  border:2px solid var(--c);
  box-shadow:inset 0 0 0 2.5px #fffef8,inset 0 0 0 4px var(--c);
  color:var(--c);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:1px;
  text-align:center;
  white-space:nowrap;
  font-family:ui-monospace,Menlo,monospace;
  font-weight:800;
  opacity:.92;
  mix-blend-mode:multiply;
  cursor:default;
  padding:2px;
  box-sizing:border-box;
  user-select:none;
}
#now .lab-stamp span{font-size:calc(var(--u)*.14);letter-spacing:.4px;line-height:1}
#now .lab-stamp b{font-size:calc(var(--u)*.36);line-height:1;letter-spacing:.5px;font-weight:900}
#now .lab-stamp small{font-size:calc(var(--u)*.13);letter-spacing:.5px;line-height:1}
#now .lab-stamp-red{--c:#d9402f}
#now .lab-stamp-green{--c:#1e9e54}
#now .lab-stamp-blue{--c:#2a69ac}
#now .lab-doodle{margin:0 2px;opacity:.85}
#now .lab-doodle svg{display:block;width:calc(var(--u)*.55);height:auto;stroke:var(--ink);stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round}
@keyframes labStickersReveal{
  from{opacity:0;transform:translateY(-8px) rotate(-.5deg)}
  to{opacity:1;transform:translateY(0) rotate(-.5deg)}
}
@media(max-width:720px){
  #now .now-paper.is-notebook-open .lab-stack-art,
  #now .now-paper:has(.lab-notebook[open]) .lab-stack-art{display:none!important}
  #now .lab-notebook[open] .lab-stack-inline{
    display:flex;
    flex-direction:column;
    margin-top:24px;
  }
  #now .lab-stack-board{
    --u:42px;
    --note-fs:11px;
    padding:26px 8px 18px;
    margin-top:16px;
  }
  #now .lab-row{
    justify-content:center!important;
    gap:5px 3px;
  }
  #now .lab-row+.lab-row{
    margin-top:calc(var(--u)*-.08);
  }
  #now .lab-stack-wall .is-minor{
    display:none!important;
  }
  #now .lab-note{
    padding:5px 7px;
    margin:0 2px;
  }
  #now .lab-note::before{
    width:22px;
    height:9px;
    top:-6px;
  }
  #now .lab-tape{
    padding:4px 9px;
    margin:0 2px;
  }
}
@media(max-width:520px){
  #now .lab-stack-board{
    --u:38px;
    --note-fs:10.5px;
    padding:24px 6px 16px;
  }
  #now .lab-row{
    padding:0;
    gap:4px 2px;
  }
  #now .lab-sticker{
    margin:0 -3px;
  }
}
@media(prefers-reduced-motion:reduce){
  #now .lab-stack-board{animation:none}
  #now .lab-row>li,#now .lab-sticker::after{transition:none}
}



/* --- FIELD NOTES & NOTION INTEGRATION STYLES (MATCHING ORIGINAL DESIGN SYSTEM) --- */
#theme-field-notes {
  --paper: #f5f2e9;
  --ink: #20211e;
  --muted: #616259;
  --green: #d2fc4b;
  --purple: #b19aea;
  --border: 2px solid var(--ink);
  --font: Arial, "Hiragino Kaku Gothic ProN", "PingFang SC", "Microsoft YaHei", sans-serif;
  min-height: 100vh;
  background-color: var(--paper);
  color: var(--ink);
  font-family: var(--font);
  background-image: radial-gradient(#28291e12 .65px, transparent .65px);
  background-size: 7px 7px;
}

/* Articles Section on Homepage */
.articles-section {
  padding-top: 60px;
  padding-bottom: 75px;
}

/* Featured Note Paper (Matching .project layout) */
.featured-note-paper {
  display: grid;
  grid-template-columns: 1fr 1.08fr;
  gap: 48px;
  border: var(--border);
  background: #fffef8;
  box-shadow: 7px 7px var(--ink);
  padding: 42px;
  position: relative;
  margin-bottom: 36px;
}
@media(max-width: 900px) {
  .featured-note-paper {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 24px;
  }
}
.featured-note-copy {
  display: flex;
  flex-direction: column;
}
.featured-note-top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}
.article-card-category {
  background: var(--green);
  color: var(--ink);
  border: 1.5px solid var(--ink);
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 800;
  box-shadow: 2px 2px var(--ink);
}
.featured-note-copy h3 {
  font-size: clamp(24px, 2.5vw, 36px);
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.25;
  margin: 6px 0 14px;
}
.featured-note-summary {
  font-size: 14px;
  line-height: 1.85;
  color: #4c4d46;
  margin-bottom: 20px;
}
.featured-note-visual {
  border: var(--border);
  background: var(--paper);
  box-shadow: 4px 4px var(--ink);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.featured-note-visual .window-bar {
  position: static;
  background: var(--ink);
  color: var(--paper);
  padding: 8px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}
.featured-note-cover {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
}

/* Notes Grid (Polaroid / Index-card style) */
.notes-memo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 32px;
}
.note-memo-card {
  background: #fffef8;
  border: var(--border);
  box-shadow: 6px 7px var(--ink);
  padding: 28px 22px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--ink);
  transition: transform 0.2s, box-shadow 0.2s;
}
.note-memo-card:hover {
  transform: rotate(-1deg) translateY(-4px);
  box-shadow: 8px 10px var(--ink);
}
.note-memo-tape {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%) rotate(2deg);
  width: 90px;
  height: 26px;
  background: #d0c1eac2;
  border-left: 1px dashed #5d41733d;
  border-right: 1px dashed #5d41733d;
  z-index: 2;
}
.note-memo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.note-memo-title {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.5px;
  margin: 0 0 10px;
}
.note-memo-desc {
  font-size: 13px;
  line-height: 1.75;
  color: #55564e;
  margin-bottom: 18px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.note-memo-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #20211e40;
  padding-top: 12px;
  margin-top: auto;
  font-size: 11px;
}
.note-memo-arrow {
  font-weight: 900;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.featured-note-copy a {
  text-decoration: none;
  color: var(--ink);
}
.featured-note-copy a:hover h3 {
  text-decoration: underline;
}
.note-memo-cover {
  width: 100%;
  height: 155px;
  object-fit: cover;
  border: var(--border);
  margin-bottom: 14px;
  background: var(--paper);
}
.note-memo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 4px 0 16px;
}
.note-memo-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  background: #f0ede1;
  color: #3b3c36;
  padding: 2px 7px;
  border: 1px solid #20211e26;
  border-radius: 2px;
}
.notes-memo-grid .note-memo-card:nth-child(2n) .note-memo-tape {
  background: #ffd29cc7;
  transform: translateX(-50%) rotate(-2deg);
}
.notes-memo-grid .note-memo-card:nth-child(3n) .note-memo-tape {
  background: #b4e0d2c7;
  transform: translateX(-50%) rotate(1.5deg);
}
.article-action-bar {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}
.button.ink, a.button.ink {
  background: var(--ink) !important;
  color: var(--paper) !important;
}
.button.ink span, a.button.ink span {
  color: var(--paper) !important;
}
.button.ink:hover, a.button.ink:hover {
  background: #383a33 !important;
  color: var(--paper) !important;
}

      /* ====== Safari & NotionNext Global Reset / Dark-Mode Shield ====== */
      html:has(#theme-field-notes) {
        color-scheme: light !important;
        overflow-x: clip;
      }
      body:has(#theme-field-notes) {
        background-color: var(--paper) !important;
        color: var(--ink) !important;
        overflow-x: clip;
      }
      #theme-field-notes img {
        display: block;
        max-width: 100%;
      }
      #theme-field-notes button {
        -webkit-appearance: none;
        appearance: none;
      }
      dialog::backdrop,
      #viewer::backdrop {
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
      }

      /* Prevent NotionNext html.dark from turning Notion text white on warm paper in macOS/iOS Safari Dark Mode */
      #theme-field-notes,
      html.dark #theme-field-notes,
      html.dark #theme-field-notes .notion {
        --fg-color: #20211e !important;
        --fg-color-0: rgba(32, 33, 30, 0.09) !important;
        --fg-color-1: rgba(32, 33, 30, 0.16) !important;
        --fg-color-2: rgba(32, 33, 30, 0.42) !important;
        --fg-color-3: rgba(32, 33, 30, 0.68) !important;
        --fg-color-4: #20211e !important;
        --fg-color-6: rgba(32, 33, 30, 0.85) !important;
        --fg-color-icon: #20211e !important;
        --bg-color: #fffdf5 !important;
        --bg-color-0: rgba(135, 131, 120, 0.14) !important;
        --bg-color-1: #f5f2e9 !important;
        --bg-color-2: rgba(135, 131, 120, 0.15) !important;
        color: #20211e !important;
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
        color: #20211e !important;
      }
      html.dark #theme-field-notes .notion-asset-caption,
      html.dark #theme-field-notes .notion-bookmark .notion-bookmark-description {
        color: #616259 !important;
      }
      html.dark #theme-field-notes .notion-table-of-contents {
        background: #f5f2e9 !important;
        border: 1.5px solid var(--ink);
      }

      /* ====== 1. 左侧渐进延展拍立得挂绳 (桌面留白 + 手机微露一角) ====== */
      :root {
        --rope-width: 235px;
      }
      .fieldnotes-shell {
        position: relative;
        padding-left: var(--rope-width);
        min-height: 100vh;
        min-height: 100dvh;
        transition: padding-left 0.3s ease;
      }
      /* 阅读文章详情页/归档页时，左侧挂绳自动收窄进入安静模式，给文章留出舒适视野 */
      .fieldnotes-shell.is-reading-article {
        --rope-width: 115px;
      }
      .wrap {
        max-width: 1220px;
        width: calc(100% - 72px);
        margin: auto;
      }
      .polaroid-rope-rail {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 310px;
        z-index: 45;
        overflow: visible;
        padding: 18px 0 0 16px;
        pointer-events: none;
        -webkit-user-select: none;
        user-select: none;
      }
      .rope-header-tag {
        pointer-events: auto;
        position: relative;
        z-index: 20;
        background: var(--ink);
        color: var(--green);
        font-size: 10px;
        padding: 5px 10px;
        border: var(--border);
        box-shadow: 3px 3px var(--purple);
        display: inline-flex;
        align-items: center;
        gap: 6px;
        letter-spacing: 0.8px;
        cursor: pointer;
        transition: transform 0.15s ease;
      }
      .rope-header-tag:hover {
        transform: translate(2px, -2px);
      }
      .rope-viewport {
        position: relative;
        width: 310px;
        height: calc(100vh - 58px);
        height: calc(100dvh - 58px);
        overflow: visible;
      }
      /* 贯穿整个屏幕高度 (top -> bottom 100dvh) 的连续 2px 黑绳，底部绝不断裂悬空 */
      .rope-viewport::before {
        content: "";
        position: absolute;
        top: -58px;
        bottom: -14px;
        left: 16px;
        width: 2px;
        background: var(--ink);
        z-index: 0;
      }
      .rope-track {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        min-height: 100%;
        padding: 18px 0 64px 16px;
      }
      /* 单个节点：由 flex space-between 沿整根竖绳均匀舒展分布 */
      .rope-node {
        pointer-events: auto;
        position: relative;
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;
        z-index: 2;
        transition: margin 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .rope-tick {
        position: absolute;
        left: -4px;
        top: 18px;
        width: 8px;
        height: 8px;
        background: var(--paper);
        border: 2px solid var(--ink);
        z-index: 4;
        transition: transform 0.25s, background 0.25s;
      }
      .rope-active-date {
        position: absolute;
        left: 10px;
        top: 8px;
        background: var(--green);
        color: var(--ink);
        border: var(--border);
        padding: 1px 6px;
        font-size: 10px;
        font-weight: 700;
        line-height: 1.4;
        box-shadow: 2px 2px var(--ink);
        z-index: 16;
        opacity: 0;
        transform: translateX(-6px);
        pointer-events: none;
        transition: opacity 0.25s ease, transform 0.25s ease;
      }

      /* 折叠态拍立得：干净的富士 Mini 小相框 */
      .rope-polaroid {
        position: relative;
        margin-left: 14px;
        width: 88px;
        background: #fffdf5;
        border: var(--border);
        padding: 5px 5px 0;
        box-shadow: 3px 4px var(--ink);
        text-align: left;
        transform-origin: left center;
        transform: rotate(-3deg);
        transition:
          width 0.36s cubic-bezier(0.22, 1, 0.36, 1),
          padding 0.36s cubic-bezier(0.22, 1, 0.36, 1),
          transform 0.36s cubic-bezier(0.22, 1, 0.36, 1),
          box-shadow 0.3s ease,
          opacity 0.25s ease;
      }
      .rope-node:nth-child(even) .rope-polaroid {
        transform: rotate(2.5deg);
      }
      .rope-tape {
        position: absolute;
        width: 48px;
        height: 13px;
        top: -7px;
        left: calc(50% - 24px);
        background: #d0c1eac8;
        border-left: 1px dashed #5d417344;
        border-right: 1px dashed #5d417344;
        transform: rotate(-2deg);
        z-index: 5;
        pointer-events: none;
      }
      .rope-node:nth-child(even) .rope-tape {
        background: #d2fc4bc8;
        transform: rotate(3deg);
      }
      .rope-img-wrap {
        width: 100%;
        aspect-ratio: 1.22;
        overflow: hidden;
        background: #181916;
        border: 1px solid var(--ink);
      }
      .rope-img-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .rope-mini-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 1px 5px;
        font-size: 9px;
        color: var(--muted);
        letter-spacing: 0.3px;
      }
      .rope-mini-bar b {
        color: var(--ink);
      }
      .rope-full-caption {
        display: none;
        padding: 9px 2px 10px;
      }
      .rope-full-caption strong {
        display: block;
        font-size: 13px;
        font-weight: 800;
        line-height: 1.35;
        color: var(--ink);
      }
      .rope-full-caption .rope-sub {
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
        font-size: 10px;
        color: var(--muted);
      }

      /* 桌面展开态 (.is-unfolded)：仅在 > 1024px 默认直接生效，手机端需配合 .is-mobile-expanded */
      @media (min-width: 1025px) {
        .rope-node.is-unfolded {
          margin-top: 2px;
          margin-bottom: 24px;
          z-index: 15;
        }
        .rope-node.is-unfolded .rope-tick {
          background: var(--green);
          width: 11px;
          height: 11px;
          left: -5.5px;
          transform: rotate(45deg);
        }
        .rope-node.is-unfolded .rope-active-date {
          opacity: 1;
          transform: translateX(0);
        }
        .rope-node.is-unfolded .rope-polaroid {
          width: 196px;
          padding: 9px 9px 0;
          margin-left: 18px;
          transform: translateY(16px) rotate(-1deg);
          box-shadow: 6px 7px var(--purple);
        }
        .rope-node.is-unfolded .rope-tape {
          width: 64px;
          height: 16px;
          top: -9px;
          left: calc(50% - 32px);
        }
        .rope-node.is-unfolded .rope-mini-bar {
          display: none;
        }
        .rope-node.is-unfolded .rope-full-caption {
          display: block;
        }
        /* 文章详情页安静态下，当前滚动位置仅做荧光绿刻度提示，不强行弹大图 */
        .rope-node.is-scroll-active:not(.is-unfolded) .rope-tick {
          background: var(--green);
          transform: rotate(45deg);
        }
      }

      /* 绳尾「继续滑动延展」吊牌 */
      .rope-more-pendant {
        pointer-events: auto;
        position: relative;
        margin-left: -6px;
        background: #fffdf5;
        color: var(--ink);
        border: var(--border);
        padding: 4px 9px;
        font-size: 9px;
        font-weight: 700;
        box-shadow: 2px 2px var(--ink);
        cursor: pointer;
        z-index: 5;
        transition: background 0.15s, transform 0.15s;
      }
      .rope-more-pendant:hover {
        background: var(--green);
        transform: translate(1px, -1px);
      }

      /* ====== 2. 一体化顶部索引栏：导航 + 小工具菜单 + 语言切换完全融合 ====== */
      .header {
        position: relative;
        height: auto;
        min-height: 92px;
        padding: 16px 0;
        display: flex;
        align-items: center;
        gap: 18px;
        border-bottom: var(--border);
      }
      @media (max-width: 1320px) {
        .brand-note {
          display: none;
        }
      }
      .header .nav-dock {
        margin-left: auto;
        display: inline-flex;
        align-items: stretch;
        background: #fffdf5;
        border: var(--border);
        box-shadow: 4px 4px var(--ink);
        gap: 0 !important;
      }
      .header .nav-dock > * + * {
        border-left: 1.5px solid #20211e30;
      }
      .header .nav-dock > .nav-dock-lang {
        border-left: 2px solid var(--ink) !important;
        background: #f5f2e9;
      }
      .nav-dock-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 0 15px;
        min-height: 40px;
        font-size: 13px;
        font-weight: 800;
        color: var(--ink);
        background: transparent;
        border: 0;
        cursor: pointer;
        white-space: nowrap;
        text-decoration: none !important;
        transition: background 0.15s ease;
      }
      .nav-dock-item:hover {
        background: var(--green);
        text-decoration: none !important;
      }
      .nav-caret {
        font-size: 11px;
        line-height: 1;
        opacity: 0.8;
      }
      .nav-lang-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        padding: 1px 6px;
        background: var(--green);
        color: var(--ink);
        border: 1.5px solid var(--ink);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.4px;
        line-height: 1.3;
      }
      .nav-dock-dropdown {
        position: relative;
        display: inline-flex;
        align-items: stretch;
      }
      .nav-dock-dropdown.is-open > .nav-dock-trigger {
        background: var(--purple);
      }
      @media (hover: hover) {
        .nav-dock-dropdown:hover > .nav-dock-trigger {
          background: var(--purple);
        }
        .nav-dock-dropdown:hover > .nav-dropdown-menu {
          display: flex;
        }
      }
      .nav-dropdown-menu::before {
        content: "";
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        height: 10px;
      }
      .nav-dropdown-menu {
        position: absolute;
        top: calc(100% + 7px);
        right: -2px;
        left: auto;
        min-width: 196px;
        background: #fffdf5;
        border: var(--border);
        box-shadow: 5px 5px var(--ink);
        padding: 6px;
        display: none;
        flex-direction: column;
        gap: 4px;
        z-index: 85;
      }
      .nav-dropdown-menu.nav-dropdown-right {
        left: auto;
        right: -2px;
        min-width: 164px;
      }
      .nav-dock-dropdown.is-open > .nav-dropdown-menu {
        display: flex;
      }
      .nav-dropdown-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 10px;
        min-height: 38px;
        font-size: 12px;
        font-weight: 700;
        color: var(--ink);
        background: transparent;
        border: 1px solid transparent;
        text-align: left;
        text-decoration: none !important;
        cursor: pointer;
      }
      .nav-dropdown-item:hover {
        background: var(--green);
        border-color: var(--ink);
      }
      .nav-dropdown-item.is-active {
        background: var(--green);
        border-color: var(--ink);
      }
      .mobile-dock-btn,
      .mobile-dock-panel {
        display: none;
      }

      /* ====== 3. 野兽派「拍立得档案袋」风格文章详情页 ====== */
      .article-stage {
        padding: 36px 0 80px;
      }
      .article-top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 26px;
      }
      .article-paper {
        position: relative;
        background: #fffdf5;
        border: var(--border);
        box-shadow: 8px 8px var(--ink);
        padding: 0;
      }
      /* 顶部胶带装饰，与首页卡片呼应 */
      .article-paper-tape {
        position: absolute;
        width: 124px;
        height: 28px;
        top: -15px;
        left: calc(50% - 62px);
        background: #d0c1ead8;
        transform: rotate(-1.5deg);
        border-left: 1px dashed #5d417355;
        border-right: 1px dashed #5d417355;
        z-index: 5;
        pointer-events: none;
      }
      /* 顶部黑底窗口栏，与首页 LATEST NOTE 一致，确保单行不折断 */
      .window-dots,
      .article-window-bar > span:first-child,
      .article-window-bar > span:last-child {
        white-space: nowrap;
        flex-shrink: 0;
      }
      .article-window-bar {
        background: var(--ink);
        color: var(--paper);
        padding: 9px 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        border-bottom: var(--border);
        font-size: 10px;
      }
      .article-window-bar > span:nth-child(2),
      .article-window-bar .mono {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
      }
      .article-inner {
        padding: clamp(22px, 4vw, 48px);
      }
      .article-header {
        display: grid;
        grid-template-columns: 1fr;
        gap: 28px;
        border-bottom: var(--border);
        padding-bottom: 30px;
        margin-bottom: 32px;
        align-items: center;
      }
      .article-header.has-cover {
        grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      }
      .article-header h1 {
        font-size: clamp(26px, 3.6vw, 42px);
        font-weight: 900;
        line-height: 1.25;
        letter-spacing: -1px;
        margin: 14px 0;
        color: var(--ink);
        overflow-wrap: break-word;
      }
      .note-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 12px;
        font-size: 11px;
        color: var(--muted);
      }
      .note-cat {
        background: var(--green);
        color: var(--ink);
        border: 1.5px solid var(--ink);
        padding: 2px 8px;
        font-size: 10px;
        font-weight: 800;
        box-shadow: 2px 2px var(--ink);
      }
      .note-tag {
        font-family: "SFMono-Regular", Consolas, monospace;
        font-size: 11px;
        background: #f0ede1;
        color: #3b3c36;
        padding: 2px 8px;
        border: 1px solid #20211e38;
      }
      .article-lang-pills {
        display: inline-flex;
        border: 1.5px solid var(--ink);
        background: #fffdf5;
        box-shadow: 2px 2px var(--ink);
      }
      .article-lang-pills button {
        border: 0;
        background: transparent;
        padding: 2px 8px;
        min-height: 24px;
        font-size: 10px;
        font-weight: 800;
        color: var(--ink);
        cursor: pointer;
      }
      .article-lang-pills button + button {
        border-left: 1.5px solid var(--ink);
      }
      .article-lang-pills button.is-active {
        background: var(--green);
      }
      .article-lang-fallback {
        font-size: 10px;
        color: var(--muted);
      }
      .project-tabs {
        flex-wrap: wrap;
      }
      .article-summary-quote {
        border-left: 4px solid var(--purple);
        padding-left: 14px;
        color: #505148;
        font-size: 15px;
        line-height: 1.75;
        margin: 12px 0 16px;
      }
      .article-photo-meta {
        font-size: 12px;
        letter-spacing: .5px;
        color: var(--muted);
        margin: -6px 0 16px;
      }
      /* 文章封面的拍立得相框造型 (带半透明胶带) */
      .article-cover-polaroid {
        position: relative;
        background: #fff;
        border: var(--border);
        padding: 10px 10px 0;
        box-shadow: 6px 6px var(--ink);
        transform: rotate(1.5deg);
        transition: transform 0.25s ease;
      }
      .article-cover-polaroid:hover {
        transform: rotate(0deg) translateY(-3px);
      }
      .article-cover-tape {
        position: absolute;
        width: 84px;
        height: 22px;
        top: -12px;
        left: calc(50% - 42px);
        background: #d2fc4bc8;
        border-left: 1px dashed #20211e44;
        border-right: 1px dashed #20211e44;
        transform: rotate(-2.5deg);
        z-index: 4;
        pointer-events: none;
      }
      .article-cover-polaroid img {
        width: 100%;
        aspect-ratio: 16 / 10;
        object-fit: cover;
        border: 1px solid var(--ink);
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
      }
      .article-cover-caption {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        padding: 8px 2px 10px;
        font-size: 9px;
        color: var(--muted);
      }

      /* Notion 正文排版与插图拍立得化 (精准作用于图片容器，保护书签/页面小图标与 Safari 缩放) */
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
        background: #20211e !important;
        color: #f5f2e9 !important;
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
        color: #5b3ca8;
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

      /* ====== 4. 手机与平板适配 (<= 1024px)：隐藏竖绳空旷留白，正文 100% 舒展 ====== */
      @media (max-width: 1024px) {
        :root {
          --rope-width: 0px;
        }
        .fieldnotes-shell,
        .fieldnotes-shell.is-reading-article {
          padding-left: 0 !important;
        }
        .wrap {
          width: calc(100% - 28px);
        }
        /* 手机端隐藏左侧拍立得挂绳，彻底消除竖绳半截空悬、下方大片留白以及挤压正文的问题 */
        .polaroid-rope-rail {
          display: none !important;
        }
        .rope-header-tag {
          font-size: 8px;
          padding: 2px 5px;
          gap: 3px;
          letter-spacing: 0.2px;
          box-shadow: 2px 2px var(--purple);
        }
        .rope-header-tag .rope-cam-emoji {
          display: none;
        }
        .rope-viewport {
          height: calc(100vh - 92px);
          height: calc(100dvh - 92px);
        }
        .rope-viewport::before {
          top: -70px;
          bottom: -4px;
          left: 8px;
        }
        .rope-track {
          min-height: 100%;
          justify-content: space-between;
          padding: 10px 0 62px 8px;
        }
        .rope-node {
          margin-bottom: 0;
        }
        /* 手机端默认状态：从屏幕左侧探出相框角与彩色胶带，右边缘严格 <= 46px，与 58px 处的正文留出干净留白 */
        .rope-polaroid {
          width: 68px;
          margin-left: 0;
          padding: 4px 4px 0;
          transform: translateX(-38px) rotate(-3deg);
          opacity: 0.94;
        }
        .rope-node:nth-child(even) .rope-polaroid {
          transform: translateX(-38px) rotate(2.5deg);
        }
        .rope-mini-bar {
          font-size: 8px;
          padding: 3px 1px 4px;
        }
        /* 当前滚动焦点的那张拍立得：轻轻多探出 6px + 荧光绿菱形刻度，吸引手指点击，仍严格不碰正文 */
        .rope-node.is-scroll-active .rope-tick {
          background: var(--green);
          transform: rotate(45deg);
        }
        .rope-node.is-scroll-active .rope-polaroid {
          transform: translateX(-32px) rotate(-1deg);
          opacity: 1;
          box-shadow: 3px 4px var(--purple);
        }
        /* 仅当手指点击触发 .is-mobile-expanded 后，选中的拍立得才完整滑出展开 */
        .polaroid-rope-rail.is-mobile-expanded .rope-node.is-unfolded {
          margin-top: 4px;
          margin-bottom: 18px;
          z-index: 30;
        }
        .polaroid-rope-rail.is-mobile-expanded .rope-node.is-unfolded .rope-tick {
          background: var(--green);
          width: 11px;
          height: 11px;
          left: -5.5px;
          transform: rotate(45deg);
        }
        .polaroid-rope-rail.is-mobile-expanded .rope-node.is-unfolded .rope-active-date {
          opacity: 1;
          transform: translateX(0);
        }
        .polaroid-rope-rail.is-mobile-expanded .rope-node.is-unfolded .rope-polaroid {
          width: 180px;
          margin-left: 10px;
          padding: 9px 9px 0;
          transform: translateX(4px) translateY(14px) rotate(0deg);
          opacity: 1;
          box-shadow: 6px 7px var(--ink);
        }
        .polaroid-rope-rail.is-mobile-expanded .rope-node.is-unfolded .rope-mini-bar {
          display: none;
        }
        .polaroid-rope-rail.is-mobile-expanded .rope-node.is-unfolded .rope-full-caption {
          display: block;
        }
        .rope-more-pendant {
          font-size: 8px;
          padding: 2px 5px;
          margin-left: -6px;
          white-space: nowrap;
        }
        .rope-more-pendant .rope-more-word {
          display: none;
        }
        .article-header.has-cover {
          grid-template-columns: 1fr;
        }
      }

      /* ====== 5. 手机与窄屏顶部栏 (<= 920px)：单行极简顶栏 + 一体化手账抽屉面板 ====== */
      @media (max-width: 920px) {
        .header {
          display: flex !important;
          justify-content: space-between;
          align-items: center;
          flex-wrap: nowrap;
          min-height: 62px;
          height: auto;
          padding: 10px 0;
          gap: 12px;
        }
        .brand-note,
        .nav-dock {
          display: none !important;
        }
        .header .logo {
          font-size: 36px;
        }
        .header .logo span {
          font-size: 22px;
        }
        .mobile-dock-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 11px;
          min-height: 38px;
          background: #fffdf5;
          color: var(--ink);
          border: var(--border);
          box-shadow: 3px 3px var(--ink);
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .mobile-dock-btn.is-open {
          background: var(--purple);
          transform: translate(1px, 1px);
        }
        .mobile-dock-bars {
          font-size: 13px;
          line-height: 1;
        }
        .mobile-dock-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          z-index: 95;
          background: #fffdf5;
          border: var(--border);
          box-shadow: 6px 6px var(--ink);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .mobile-dock-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .mobile-dock-card {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          min-height: 42px;
          background: var(--paper);
          color: var(--ink);
          border: 1.5px solid var(--ink);
          box-shadow: 2px 2px var(--ink);
          font-size: 13px;
          text-align: left;
          text-decoration: none !important;
          cursor: pointer;
        }
        .mobile-dock-card:active,
        .mobile-dock-card:hover {
          background: var(--green);
        }
        .mobile-dock-card .mono {
          font-size: 10px;
          color: #6b4cb8;
          font-weight: 800;
        }
        .mobile-dock-section {
          border-top: 1.5px dashed #20211e35;
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mobile-dock-label {
          font-size: 10px;
          font-weight: 800;
          color: var(--muted);
          letter-spacing: 1px;
        }
        .mobile-dock-links {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6px;
        }
        .mobile-dock-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 10px;
          min-height: 38px;
          background: #fff;
          border: 1.5px solid var(--ink);
          font-size: 12px;
          font-weight: 700;
          color: var(--ink);
          text-decoration: none !important;
        }
        .mobile-dock-link:active,
        .mobile-dock-link:hover {
          background: var(--green);
        }
        .mobile-lang-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border: var(--border);
          box-shadow: 2px 2px var(--ink);
          background: #fff;
        }
        .mobile-lang-btn {
          min-height: 38px;
          padding: 6px 8px;
          border: 0;
          background: transparent;
          font-size: 12px;
          font-weight: 800;
          color: var(--ink);
          cursor: pointer;
        }
        .mobile-lang-btn + .mobile-lang-btn {
          border-left: 1.5px solid var(--ink);
        }
        .mobile-lang-btn.is-active {
          background: var(--green);
        }
      }

      /* ====== HomeLab Notion 笔记链接卡片 ====== */
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
      .rope-attention {
        animation: ropeWiggle 0.6s ease-in-out;
      }
      @keyframes ropeWiggle {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(6px) rotate(1deg); }
        75% { transform: translateX(-4px) rotate(-1deg); }
      }

      ${themeConsoleStyle('field-notes', CONFIG)}

      /* Enforce authentic warm #f5f2e9 Field Notes paper texture over themeConsoleStyle #fff/#000 defaults */
      #theme-field-notes,
      .dark #theme-field-notes,
      html.dark #theme-field-notes {
        background-color: var(--paper) !important;
        background-image: radial-gradient(#28291e12 0.65px, transparent 0.65px) !important;
        background-size: 7px 7px !important;
        color: var(--ink) !important;
      }
    `}</style>
  )
}

export { Style }
