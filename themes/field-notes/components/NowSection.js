import React, { useState } from 'react'
import { useLang } from './LangContext'
import { StackStickers } from './StackStickers'

export const NowSection = () => {
  const { t } = useLang()
  const [notebookOpen, setNotebookOpen] = useState(false)

  return (
    <section className='now-section wrap home-lab' id='now' aria-labelledby='now-title'>
      <div
        className={`now-paper${notebookOpen ? ' is-notebook-open' : ''}`}
        data-notebook-open={notebookOpen ? 'true' : 'false'}
      >
        <div className='lab-art' aria-hidden='true'>
          <span className='lab-art-label mono'>HOME LAB / 2026</span>
          <img
            className='lab-devices'
            src='/themes/field-notes/assets/home-lab-devices.png'
            alt=''
            width='1197'
            height='1314'
            loading='lazy'
            decoding='async'
          />
          <span className='lab-handwritten'>a little studio, at home.</span>

          <StackStickers variant='art' />
        </div>

        <div className='now-copy lab-copy'>
          <div className='eyebrow mono'>01 / BUILD · RUN · KEEP</div>
          <h2
            id='now-title'
            dangerouslySetInnerHTML={{ __html: t('nowTitle') }}
          />
          <p
            className='lab-intro'
            dangerouslySetInnerHTML={{ __html: t('nowDesc') }}
          />

          <ol className='lab-chapters'>
            <li>
              <span className='lab-number mono' aria-hidden='true'>
                01
              </span>
              <div>
                <h3>{t('studioTools')}</h3>
                <p>{t('studioToolsDesc')}</p>
              </div>
            </li>
            <li>
              <span className='lab-number mono' aria-hidden='true'>
                02
              </span>
              <div>
                <h3>{t('studioServices')}</h3>
                <p>{t('studioServicesDesc')}</p>
              </div>
            </li>
            <li>
              <span className='lab-number mono' aria-hidden='true'>
                03
              </span>
              <div>
                <h3>{t('studioMuse')}</h3>
                <p>{t('studioMuseDesc')}</p>
              </div>
            </li>
            <li>
              <span className='lab-number mono' aria-hidden='true'>
                04
              </span>
              <div>
                <h3>{t('studioBackup')}</h3>
                <p>{t('studioBackupDesc')}</p>
              </div>
            </li>
          </ol>

          <details
            className='lab-notebook'
            onToggle={e => setNotebookOpen(Boolean(e.currentTarget?.open))}
          >
            <summary>
              <span>{t('notesToggle')}</span>
              <span className='details-icon' aria-hidden='true'>
                ＋
              </span>
            </summary>
            <div className='lab-note-content'>
              <section>
                <h3>{t('labBuildTitle')}</h3>
                <p>{t('labBuildDesc')}</p>
              </section>
              <section>
                <h3>{t('labServicesTitle')}</h3>
                <p>{t('labServicesDesc')}</p>
              </section>
              <section>
                <h3>{t('labMuseTitle')}</h3>
                <p>{t('labMuseDesc')}</p>
              </section>
              <section>
                <h3>{t('labPhotosTitle')}</h3>
                <p>{t('labBackupDesc')}</p>
                <div className='lab-photo-flow'>
                  <p>{t('note1')}</p>
                  <p>{t('note2')}</p>
                  <p>{t('note3')}</p>
                </div>
              </section>

              <StackStickers variant='inline' />
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}
export default NowSection
