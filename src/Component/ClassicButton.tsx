import React from 'react'
import '../CSS/BaseButton.scss'

interface Props {
  onClick?: () => void
  title: string
  refuse?: boolean
  cancelled?: boolean
  disabled?: boolean
}

function ClassicButton ({ title, onClick, refuse, cancelled, disabled }: Props): JSX.Element {
  let classname = 'classic-button'

  if (refuse ?? false) {
    classname += ' classic-button--refuse'
  } else if (cancelled ?? false) {
    classname += ' classic-button--cancelled'
  }

  if (disabled ?? false) {
    classname += ' classic-button--disabled'
  }

  return (
    <button onClick={onClick} disabled={disabled ?? false} className={classname}>
      {title}
    </button>
  )
}

export default ClassicButton
