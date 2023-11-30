import React from 'react'
import '../CSS/BaseButton.scss'

interface Props {
  onClick?: () => void
  title: string
  refuse?: boolean
  cancelled?: boolean
}

function ClassicButton ({ title, onClick, refuse, cancelled }: Props): JSX.Element {
  let classname = 'classic-button'

  if (refuse ?? false) {
    classname += ' classic-button--refuse'
  } else if (cancelled ?? false) {
    classname += ' classic-button--cancelled'
  }

  return (
    <button onClick={onClick} className={classname}>
      {title}
    </button>
  )
}

export default ClassicButton
