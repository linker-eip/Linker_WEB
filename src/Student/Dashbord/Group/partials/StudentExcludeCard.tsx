/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import '../../../../CSS/StudentExcludeCard.scss'
import Avatar from '@mui/material/Avatar'
import ClassicButton from '../../../../Component/ClassicButton'
import type { Members } from '../../../../Typage/Type'
import ModalValidation from '../../../../Component/ModalValidation'
import { ModalType } from '../../../../Enum'

interface Props {
  member: Members
}

const StudentExcludeCard = (props: Props): JSX.Element => {
  const [hasBeenExcluded, setHasBeenExcluded] = useState<boolean>(false)
  const [modalValidation, setModalValidation] = useState<boolean>(false)

  const excludeMember = (): void => {
    setHasBeenExcluded(true)
  }

  const openModalValidation = (): void => { setModalValidation(true) }

  const closeModalValidation = (): void => { setModalValidation(false) }

  return (
    <div className='std-exclude-card'>
      <div className='std-exclude-card__section'>
        <Avatar alt='avatar' src={props.member.picture} />
        <div className='std-exclude-card__name'>{ props.member.firstName } {props.member.lastName}</div>
      </div>
      {hasBeenExcluded ? <ClassicButton disabled refuse title='Exclue' /> : <ClassicButton title='Exclure' refuse onClick={openModalValidation} /> }
      <ModalValidation subject={props.member.firstName + ' ' + props.member.lastName} open={modalValidation} type={ModalType.EXCLUSION} onClose={closeModalValidation} onValid={excludeMember} />
    </div>
  )
}

export default StudentExcludeCard
