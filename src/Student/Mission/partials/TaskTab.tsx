/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState, useEffect } from 'react'
import type { MissionTaskArrayInfo } from '../../../Typage/Type'
import { useTranslation } from 'react-i18next'
import '../../../CSS/CompanyDetailedMission.scss'
import Checkbox from '@mui/material/Checkbox'
import MissionApi from '../../../API/MissionApi'
import { TaskStatus } from '../../../Enum'

interface Props {
  missionTask: MissionTaskArrayInfo[]
  missionId: number
  missionStatus: string
  onCallback: () => void
}

function TaskTab (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [taskTab, setTaskTab] = useState<MissionTaskArrayInfo[]>()

  useEffect(() => {
    setTaskTab(props.missionTask.slice().sort((a, b) => a.missionTask.id - b.missionTask.id))
  }, [props.missionTask])

  const changeTaskStatus = async (taskId: number): Promise<void> => {
    const response = await MissionApi.changeStudentTaskStatus(localStorage.getItem('jwtToken') as string, taskId)
    if (response !== undefined) {
      props.onCallback()
    }
  }

  const isChecked = (taskStatus: string): boolean => {
    switch (taskStatus) {
      case TaskStatus.FINISHED:
        return true
      case TaskStatus.PENDING:
        return false
      default:
        return false
    }
  }

  return (
    <div>
      <div className='cpn-detailed-mission__tab-container--colored'>
        <p className='cpn-detailed-mission__centered'> {t('company.detailed_mission.tab.detail')} </p>
        <p className='cpn-detailed-mission__centered'> {t('company.detailed_mission.tab.price')} </p>
        <p className='cpn-detailed-mission__centered'> {t('company.detailed_mission.tab.task')} </p>
      </div>
      {taskTab !== undefined && taskTab?.length > 0
        ? taskTab.map((task: MissionTaskArrayInfo, index: number) =>
          <div key={task.missionTask.id} className='cpn-detailed-mission__tab-container'>
            <div className='cpn-detailed-mission__sub-section'>
              <div> {task.missionTask.name} </div>
              <li> {task.missionTask.description} </li>
            </div>
            <div className='cpn-detailed-mission__sub-section cpn-detailed-mission__centered'> {task.missionTask.amount} </div>
            <div className='cpn-detailed-mission__sub-section cpn-detailed-mission__centered'>
              <Checkbox onClick={() => changeTaskStatus(task.missionTask.id)} checked={isChecked(task.missionTask.status)} />
            </div>
          </div>
        )
        : null
      }
    </div>
  )
}

export default TaskTab
