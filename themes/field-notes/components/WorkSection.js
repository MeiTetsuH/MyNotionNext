import React, { useState } from 'react'
import Link from 'next/link'
import { useLang } from './LangContext'
import { projects as defaultProjects } from './constants'

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
    <section className='work-section wrap' id='work' aria-labelledby='work-title'>
      <div className='section-heading'>
        <div>
          <span className='eyebrow mono'>03 / BUILT WITH INTENT</span>
          <h2 id='work-title'>{t('workTitle')}</h2>
        </div>
        <span className='margin-note'>{t('workNote')}</span>
      </div>

      <div className='project-selector' role='group' aria-label={t('projectChoose')}>
        <div className='project-choices'>
          {projects.map((p, idx) => (
            <button
              key={p.id || `${p.name}-${idx}`}
              type='button'
              aria-pressed={idx === safeProjectIdx}
              onClick={() => {
                setCurrentProject(idx)
                setScreenIdx(0)
              }}>
              {`${String(idx + 1).padStart(2, '0')} / ${p.name}`}
            </button>
          ))}
        </div>
        {projects.length > 1 && (
          <div className='project-paging'>
            <span id='project-count' className='mono' aria-live='polite'>
              {`${String(safeProjectIdx + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
            </span>
            <button
              type='button'
              id='prev-project'
              aria-label={t('projectPrev')}
              onClick={prevProject}>
              ←
            </button>
            <button
              type='button'
              id='next-project'
              aria-label={t('projectNext')}
              onClick={nextProject}>
              →
            </button>
          </div>
        )}
      </div>

      <article className='project'>
        <div className='project-copy'>
          <div className='project-top mono'>
            <span id='project-number'>
              {`SELECTED PROJECT — ${String(safeProjectIdx + 1).padStart(3, '0')}`}
            </span>
            <span className='small-tag'>{badgeText}</span>
          </div>

          <h3>
            <span id='project-name'>{project.name}</span>
            <span aria-hidden='true'>↗</span>
          </h3>

          <p className='project-deck'>{renderDeckText(projectCopy.deck)}</p>
          {projectCopy.desc && (
            <p style={{ whiteSpace: 'pre-line' }}>{projectCopy.desc}</p>
          )}

          {(project.tags || []).length > 0 && (
            <div className='tags'>
              {(project.tags || []).map((tag, i) => (
                <span key={i}>{typeof tag === 'string' ? tag : tag.name}</span>
              ))}
            </div>
          )}

          {projectCopy.features.length > 0 && (
            <div className='project-features'>
              {projectCopy.features.map((feat, i) => (
                <div key={i}>
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}

          {isExternalUrl ? (
            <a
              id='project-link'
              className='button ink'
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              style={projectCopy.features.length === 0 ? { marginTop: 22 } : undefined}>
              <span>{actionLabel}</span>
              <span>↗</span>
            </a>
          ) : (
            <Link
              id='project-link'
              className='button ink'
              href={project.url || '#work'}
              style={projectCopy.features.length === 0 ? { marginTop: 22 } : undefined}>
              <span>{actionLabel}</span>
              <span>↗</span>
            </Link>
          )}
        </div>

        <div className='project-visual'>
          <div className='window-bar'>
            <span className='window-dots'>● ● ●</span>
            <span id='project-window-title' className='mono'>
              {project.name.toUpperCase()} / IN THE WILD
            </span>
            <span>↗</span>
          </div>

          {totalScreens > 1 && (
            <div className='project-tabs' role='group' aria-label='Project screenshots'>
              {Array.from({ length: totalScreens }).map((_, idx) => {
                const tabLabel =
                  projectCopy.screens[idx] ||
                  `${t('screenPreview')} ${String(idx + 1).padStart(2, '0')}`
                return (
                  <button
                    key={idx}
                    type='button'
                    className={activeScreenIndex === idx ? 'active' : ''}
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
            className='screenshot-button'
            id='open-screen'
            style={totalScreens <= 1 ? { marginTop: 63 } : undefined}
            aria-label={`放大项目截图: ${screenAlt}`}
            onClick={() =>
              onOpenProjectScreen &&
              onOpenProjectScreen(safeProjectIdx, activeScreenIndex)
            }>
            <img id='project-screen' src={screenImgSrc} alt={screenAlt} loading='lazy' />
            <span className='zoom-hint'>{t('enlarge')}</span>
          </button>

          <div className='project-caption mono'>
            <span>{t('actualScreen')}</span>
            <span id='screen-count'>
              {`${String(activeScreenIndex + 1).padStart(2, '0')} — ${String(totalScreens).padStart(2, '0')}`}
            </span>
          </div>
        </div>
      </article>
    </section>
  )
}
