import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import '../CSS/Dropzone.scss'

interface Props {
  onObjectChange: any
  onClose: () => void
}

function DropZoneV2 (props: Props): JSX.Element {
  const [filename, setFilename] = useState<string | null>(null)

  const handleClose = (): void => {
    setFilename(null)
    props.onClose()
  }

  return (
    filename !== null
      ? <div className='dropzoneV2__container'>
          <img src='/assets/logo_pdf.svg' />
          <img className='dropzoneV2__img' src='/assets/close.svg' onClick={handleClose} />
          <div className='dropzoneV2__text'>
            {filename}
          </div>
        </div>
      : <Dropzone onDrop={ (acceptedFiles) => {
        props.onObjectChange(acceptedFiles)
        if (acceptedFiles.length > 0) {
          setFilename(acceptedFiles[0].name)
        }
      }}>
        {({ getRootProps, getInputProps }) => (
          <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
              <div className='dropzoneV2'>
                Déposez votre fichier
              </div>
          </div>
        </section>
        )}
      </Dropzone>
  )
}

export default DropZoneV2
