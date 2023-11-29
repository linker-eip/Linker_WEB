import React, { useEffect, useState } from 'react'
import type { Group as GroupData } from '../../../../Typage/Type'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import ClassicButton from '../../../../Component/ClassicButton'

interface Props {
  data: GroupData | undefined
}

function Group (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [hasGroup, setStatus] = useState<boolean>(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function setGroupStatusOnMounted () {
      if (props.data?.data === undefined) {
        setStatus(false)
      }
    }
    setGroupStatusOnMounted()
  }, [])

  console.log(props.data?.response)
  return (
    <div>
      { hasGroup
        ? <div>

        </div>
        : <div className='std-group'>
          <div className='std-group__section'>
            <div className='std-group__text'> { t('student.dashboard.groups.no_group') } </div>
            <ClassicButton title={t('student.dashboard.groups.create_group_button')}/>
          </div>
        </div>
      }
    </div>
  )
}

export default Group
