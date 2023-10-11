import React from 'react'
import Dropzone from 'react-dropzone'
import '../CSS/Dropzone.scss'

interface Props {
  onObjectChange: any
}

function DropZone ({ onObjectChange }: Props): JSX.Element {
  return (
    <Dropzone onDrop={acceptedFiles => { onObjectChange(acceptedFiles) }}>
      {({ getRootProps, getInputProps }) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className='dropzone'> Déposez votre fichier</div>
        </div>
      </section>
      )}
    </Dropzone>
  )
}

export default DropZone
