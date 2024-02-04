import React, { useEffect, useState } from 'react'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import Modal from '@mui/material/Modal'
import GroupApi from '../../../../API/GroupApi'
import type { Group, Members } from '../../../../Typage/Type'
import StudentExcludeCard from './StudentExcludeCard'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  open: boolean
  onClose: () => void
}

function ModalExclusionMember (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [groupData, setGroupData] = useState<Group>()

  const handleValidationClose = (): void => {
    props.onClose()
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await GroupApi.getGroup(
          localStorage.getItem('jwtToken') as string
        )
        if (data !== undefined && data !== null) {
          setGroupData(data)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Modal open={props.open} onClose={handleValidationClose}>
      <div className="std-exclude-modal">
        <div onClick={handleValidationClose}>
          <CloseIcon className='std-exclude-modal__close-icon' />
        </div>
        <div className="std-exclude-modal__title-section">
          <div className="std-exclude-modal__title">
            {' '}
            {t('student.groups.exclude.title')}{' '}
          </div>
        </div>
        <ul
          className="std-exclude-modal__list"
          style={{ maxHeight: '300px', overflowY: 'auto' }}
        >
          { groupData?.data !== undefined
            ? groupData.data.members.map((member: Members, index: number) => (
              member.isLeader ? null : <StudentExcludeCard key={index} member={member} />
            ))
            : null
            }
        </ul>
      </div>
    </Modal>
  )
}

export default ModalExclusionMember
