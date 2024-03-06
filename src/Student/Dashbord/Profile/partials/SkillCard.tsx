import React from 'react'
import '../../../../CSS/SkillsCard.scss'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface Props {
  data: string
  selected?: boolean
  removed?: boolean
  onClick?: () => void
}

function SkillCard (props: Props): JSX.Element {
  return (
    <div className='skills-card'>
      {props.removed ?? false
        ? <div className='skills-card__container-removed'>
            <div className='skills-card__section ' onClick={props.onClick}>
              <RemoveIcon />
              { props.data }
            </div>
          </div>
        : props.selected ?? false
          ? <div className='skills-card__container-selected'>
              <div className='skills-card__section'>
                { props.data }
              </div>
            </div>
          : <div className='skills-card__container'>
              <div className='skills-card__section' onClick={props.onClick}>
                <AddIcon />
                { props.data }
              </div>
            </div>
      }
    </div>
  )
}

export default SkillCard
