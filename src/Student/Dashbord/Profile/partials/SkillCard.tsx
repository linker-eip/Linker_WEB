import React from 'react'
import '../../../../CSS/SkillsCard.scss'
import AddIcon from '@mui/icons-material/Add'

interface Props {
  data: string
  selected?: boolean
  onClick?: () => void
}

function SkillCard (props: Props): JSX.Element {
  return (
    <div>
      { props.selected ?? false
        ? <div className='skills-card skills-card__selected'>
            <div className='skills-card__container '>
              { props.data }
            </div>
          </div>
        : <div className='skills-card'>
            <div className='skills-card__container ' onClick={props.onClick}>
              <AddIcon />
              { props.data }
            </div>
          </div>
      }
    </div>
  )
}

export default SkillCard
