import React from 'react'
import '../CSS/BaseButton.scss'

interface Props {
  onClick?: () => void
  title: string
}

function BaseButton ({ title, onClick }: Props): JSX.Element {
  return (
    <button onClick={onClick} className='base-button'>
      {title}
    </button>
  )
}

export default BaseButton
