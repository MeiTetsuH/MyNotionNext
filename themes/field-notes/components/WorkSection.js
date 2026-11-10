import React, { useState } from 'react'
import Link from 'next/link'
import { useLang } from './LangContext'
import { projects as defaultProjects } from './constants'
import { SectionHead } from './SectionHead'

function renderDeckText(rawDeck) {
  if (!rawDeck) return null
  const lines = String(rawDeck).split(/<br\s*\/?>|\n/gi)
  return lines.map((line, idx) => (
    <React.Fragment key={idx}>
      {idx > 0 && <br />}
      {line}
    </React.Fragment>
  ))
}

export const WorkSection = ({ projectList = [], onOpenProjectScreen }) => {
  const { lang, t, edgeCopy, transitCopy } = useLang()
  const [currentProject, setCurrentProject] = useState(0)
  const [screenIdx, setScreenIdx] = useState(0)

  const projects = projectList.length > 0 ? projectList : defaultProjects
  const safeProjectIdx = Math.min(currentProject, Math.max(0, projects.length - 1))
  const project = projects[safeProjectIdx] || projects[0]

  const projectCopy = project.deck
    ? {
        deck: project.deck,
        desc: project.desc,
        features: Array.isArray(project.features) ? project.features : [],
        screens:
          Array.isArray(project.screens) && project.screens.length > 0
            ? project.screens
            : [t('screenPreview')],
        alts:
          Array.isArray(project.alts) && project.alts.length > 0
            ? project.alts
            : [project.name],
        caption: project.caption || t('screenshotCaption')
      }
    : safeProjectIdx === 1
    ? edgeCopy[lang] || edgeCopy['zh']
    : safeProjectIdx === 2
    ? transitCopy[lang] || transitCopy['zh']
    : {
        deck: t('projectDeck'),
        desc: t('projectDesc'),
        features: [t('feature1'), t('feature2'), t('feature3')],
        screens: [t('screenShare'), t('screenAdmin')],
        alts: [t('screenAltShare'), t('screenAltAdmin')],
        caption: t('screenshotCaption')
      }

  const totalScreens = Math.max(
    1,
    project.images ? project.images.length : project.files ? project.files.length : 1
  )
  const activeScreenIndex = Math.min(screenIdx, totalScreens - 1)
  const currentFileName = project.files ? project.files[activeScreenIndex] : 'r2-share'
  const fileExt = currentFileName.includes('transit') ? 'png' : 'jpg'
  const screenImgSrc = project.images
    ? project.images[activeScreenIndex]
    : `/themes/field-notes/assets/${currentFileName}.${fileExt}`
  const screenAlt = projectCopy.alts[activeScreenIndex] || project.name

  const nextProject = () => {
    setCurrentProject((safeProjectIdx + 1) % projects.length)
    setScreenIdx(0)
  }

  const prevProject = () => {
    setCurrentProject((safeProjectIdx - 1 + projects.length) % projects.length)
    setScreenIdx(0)
  }

  const isExternalUrl = /^https?:\/\//i.test(String(project.url || ''))
  const actionLabel =
    project.linkLabel || (isExternalUrl ? t('viewCode') : t('readMore'))
  const badgeText = project.badge || 'OPEN SOURCE'

  return (
    <section className='fn-work' id='work' aria-labelledby='work-title'>
      <div className='wrap'>
        <SectionHead
          no='03'
          eyebrow='BUILT WITH INTENT'
          title={t('workTitle')}
          titleId='work-title'
          note={t('workNote')}
        />

        <div className='fn-proj-pick' role='group' aria-label={t('projectChoose')}>
          <div className='fn-chips'>
            {projects.map((p, idx) => (
              <button
                key={p.id || `${p.name}-${idx}`}
                type='button'
                className='fn-chip'
                aria-pressed={idx === safeProjectIdx}
                onClick={() => {
                  setCurrentProject(idx)
                  setScreenIdx(0)
                }}>
                <b>{String(idx + 1).padStart(2, '0')}</b> {p.name}
              </button>
            ))}
          </div>
          {projects.length > 1 && (
            <div className='fn-proj-paging'>
              <span id='project-count' className='mono' aria-live='polite'>
                {`${String(safeProjectIdx + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
              </span>
              <button type='button' id='prev-project' aria-label={t('projectPrev')} onClick={prevProject}>
                ←
              </button>
              <button type='button' id='next-project' aria-label={t('projectNext')} onClick={nextProject}>
                →
              </button>
            </div>
          )}
        </div>

        <article className='fn-proj'>
          <div className='fn-proj-copy'>
            <div className='fn-proj-top mono'>
              <span id='project-number'>
                {`SELECTED PROJECT — ${String(safeProjectIdx + 1).padStart(3, '0')}`}
              </span>
              <span className='fn-chip-tag'>{badgeText}</span>
            </div>

            <h3>
              <span id='project-name'>{project.name}</span>
            </h3>

            <p className='fn-proj-deck'>{renderDeckText(projectCopy.deck)}</p>
            {projectCopy.desc && <p className='fn-proj-desc'>{projectCopy.desc}</p>}

            {(project.tags || []).length > 0 && (
              <div className='fn-tags'>
                {(project.tags || []).map((tag, i) => (
                  <span key={i}>{typeof tag === 'string' ? tag : tag.name}</span>
                ))}
              </div>
            )}

            {projectCopy.features.length > 0 && (
              <ol className='fn-proj-features'>
                {projectCopy.features.map((feat, i) => (
                  <li key={i}>
                    <b>{String(i + 1).padStart(2, '0')}</b>
                    <span>{feat}</span>
                  </li>
                ))}
              </ol>
            )}

            {isExternalUrl ? (
              <a
                id='project-link'
                className='fn-btn'
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'>
                <span>{actionLabel}</span>
                <span aria-hidden='true'>↗</span>
              </a>
            ) : (
              <Link id='project-link' className='fn-btn' href={project.url || '#work'}>
                <span>{actionLabel}</span>
                <span aria-hidden='true'>↗</span>
              </Link>
            )}
          </div>

          <div className='fn-proj-visual'>
            <div className='fn-window'>
              <div className='fn-window-bar mono'>
                <span aria-hidden='true'>● ● ●</span>
                <span id='project-window-title'>{project.name.toUpperCase()} / IN THE WILD</span>
              </div>

              {totalScreens > 1 && (
                <div className='fn-window-tabs' role='group' aria-label='Project screenshots'>
                  {Array.from({ length: totalScreens }).map((_, idx) => {
                    const tabLabel =
                      projectCopy.screens[idx] ||
                      `${t('screenPreview')} ${String(idx + 1).padStart(2, '0')}`
                    return (
                      <button
                        key={idx}
                        type='button'
                        aria-pressed={activeScreenIndex === idx}
                        onClick={() => setScreenIdx(idx)}>
                        {tabLabel}
                      </button>
                    )
                  })}
                </div>
              )}

              <button
                type='button'
                className='fn-window-shot'
                id='open-screen'
                aria-label={`${String(t('enlarge')).replace(/\s*↗\s*$/, '')}: ${screenAlt}`}
                onClick={() =>
                  onOpenProjectScreen &&
                  onOpenProjectScreen(safeProjectIdx, activeScreenIndex)
                }>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img id='project-screen' src={screenImgSrc} alt={screenAlt} loading='lazy' />
                <span className='fn-zoom'>{t('enlarge')}</span>
              </button>
            </div>

            <div className='fn-proj-caption mono'>
              <span>{t('actualScreen')}</span>
              <span id='screen-count'>
                {`${String(activeScreenIndex + 1).padStart(2, '0')} — ${String(totalScreens).padStart(2, '0')}`}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default WorkSection
