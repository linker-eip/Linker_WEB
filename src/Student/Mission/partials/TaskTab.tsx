/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState, useEffect } from 'react'
import type { MissionTaskArrayInfo } from '../../../Typage/Type'
import { useTranslation } from 'react-i18next'
import '../../../CSS/CompanyDetailedMission.scss'
import Checkbox from '@mui/material/Checkbox'
import MissionApi from '../../../API/MissionApi'
import { TaskStatus, MissionStatus } from '../../../Enum'
import ModalTaskCreation from '../../../Company/Mission/partials/ModalTaskCreation'
import ModalTaskEdition from '../../../Company/Mission/partials/ModalTaskEdition'

interface Props {
  missionTask: MissionTaskArrayInfo[]
  missionId: number
  missionStatus: string
  onCallback: () => void
}

function TaskTab (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [taskTab, setTaskTab] = useState<MissionTaskArrayInfo[]>()
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [taskModal, setTaskModal] = useState<boolean>(false)
  const [editTaskModal, setEditTaskModal] = useState<boolean>(false)

  useEffect(() => {
    setTaskTab(props.missionTask.slice().sort((a, b) => a.missionTask.id - b.missionTask.id))
  }, [props.missionTask])

  useEffect(() => {
    let amount = 0
    props.missionTask.forEach(task => { return (amount += task.missionTask.amount) })
    setTotalAmount(amount)
  }, [])

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

  const closeTaskModal = (): void => {
    setTaskModal(false)
  }

  const validTaskModal = (): void => {
    setTaskModal(false)
    props.onCallback()
  }

  const openTaskModal = (): void => {
    setTaskModal(true)
  }

  const closeEditTaskModal = (): void => {
    setEditTaskModal(false)
  }

  const validEditTaskModal = (): void => {
    // setEditTaskModal(false)
    props.onCallback()
    closeEditTaskModal()
  }

  const openEditTaskModal = (): void => {
    setEditTaskModal(true)
  }

  const deleteTask = (taskId: number): void => {
    const response = MissionApi.deleteTask(localStorage.getItem('jwtToken') as string, taskId)
    if (response !== undefined) {
      props.onCallback()
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
          <div key={task.missionTask.id} className={props.missionStatus === MissionStatus.PENDING ? 'cpn-detailed-mission__tab-container--delete' : 'cpn-detailed-mission__tab-container'}>
            <div className='cpn-detailed-mission__sub-section'>
              <div> {task.missionTask.name} </div>
              <li> {task.missionTask.description} </li>
            </div>
            <div className='cpn-detailed-mission__sub-section cpn-detailed-mission__centered'> {task.missionTask.amount} </div>
            <div className='cpn-detailed-mission__sub-section cpn-detailed-mission__centered'>
              <Checkbox onClick={() => changeTaskStatus(task.missionTask.id)} checked={isChecked(task.missionTask.status)} />
            </div>
            {props.missionStatus === MissionStatus.PENDING
              ? <div>
                  <img onClick={() => deleteTask(task.missionTask.id)} className='cpn-detailed-mission__edit-logo cpn-detailed-mission__sub-section--delete' src='/assets/remove.svg' />
                  <img onClick={openEditTaskModal} className='cpn-detailed-mission__edit-logo cpn-detailed-mission__sub-section--delete' src='/assets/edit.svg' />
                  <ModalTaskEdition open={editTaskModal} taskId={task.missionTask.id} onValidation={validEditTaskModal} onClose={closeEditTaskModal} name={task.missionTask.name} description={task.missionTask.description} amount={task.missionTask.amount} />
                </div>
              : null
            }
          </div>
        )
        : null
      }
      {props.missionStatus === MissionStatus.PENDING
        ? <div className='cpn-detailed-mission__tab-container'>
            <div />
            <div />
            <div className='cpn-detailed-mission__add-task cpn-detailed-mission__centered'>
              <img className='cpn-detailed-mission__clickable' src='/assets/adder.svg' onClick={openTaskModal} />
            </div>
          </div>
        : null}
      <ModalTaskCreation open={taskModal} missionId={props.missionId} onValidation={validTaskModal} onClose={closeTaskModal} />
      <div className='cpn-detailed-mission__total-section'>
        <div />
        <div className='cpn-detailed-mission__total'>
            <p> Total Prestation (TTC): </p>
            <div>{ totalAmount } €</div>
        </div>
      </div>
    </div>
  )
}

export default TaskTab
