/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect } from 'react'
import { type GroupInfo, type MissionTaskArrayInfo } from '../../../Typage/Type'
import { useTranslation } from 'react-i18next'
import '../../../CSS/CompanyDetailedMission.scss'
import ModalTaskCreation from './ModalTaskCreation'
import Checkbox from '@mui/material/Checkbox'
import MissionApi from '../../../API/MissionApi'
import { TaskStatus, MissionStatus } from '../../../Enum'
import ModalTaskEdition from './ModalTaskEdition'
import ClassicButton from '../../../Component/ClassicButton'

interface Props {
  missionTask: MissionTaskArrayInfo[]
  missionId: number
  missionStatus: string
  groupInfo: GroupInfo
  displayId: string
  groupListToAccept: number[] | null
  onCallback: () => void
}

function TaskTab (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [taskModal, setTaskModal] = useState<boolean>(false)
  const [editTaskModal, setEditTaskModal] = useState<boolean>(false)
  const [taskTab, setTaskTab] = useState<MissionTaskArrayInfo[]>()
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [devisValidate, setDevisValidate] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<MissionTaskArrayInfo | null>(null)

  useEffect(() => {
    if (props.missionStatus === MissionStatus.PENDING) {
      setTaskTab(props.missionTask
        .filter((task) => task.missionTask.groupId === parseInt(props.displayId))
        .sort((a, b) => a.missionTask.id - b.missionTask.id))
    } else {
      setTaskTab(props.missionTask.sort((a, b) => a.missionTask.id - b.missionTask.id))
    }
  }, [props.missionTask, props.displayId])

  useEffect(() => {
    let amount = 0
    props.missionTask.forEach(task => { return (amount += task.missionTask.amount) })
    setTotalAmount(amount)
  }, [])

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

  const openEditTaskModal = (task: MissionTaskArrayInfo): void => {
    setSelectedTask(task)
    setEditTaskModal(true)
  }

  const changeTaskStatus = async (taskId: number): Promise<void> => {
    const response = await MissionApi.changeTaskStatus(localStorage.getItem('jwtToken') as string, taskId)
    if (response !== undefined) {
      props.onCallback()
    }
  }

  const deleteTask = (taskId: number): void => {
    const response = MissionApi.deleteTask(localStorage.getItem('jwtToken') as string, taskId)
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

  const handleDevisValidation = async (): Promise<void> => {
    const response = await MissionApi.acceptGroupToMission(localStorage.getItem('jwtToken') as string, props.missionId, props.displayId)
    if (response !== undefined) {
      setDevisValidate(true)
      window.location.reload()
    }
  }

  const handleDevisRefuse = async (): Promise<void> => {
    const response = await MissionApi.refuseGroupToMission(localStorage.getItem('jwtToken') as string, props.missionId, props.displayId)
    if (response !== undefined) {
      setDevisValidate(false)
      window.location.reload()
    }
  }

  const findMemberName = (assignedId: number): string => {
    if (assignedId === null) {
      return 'Aucun'
    }
    if (props.groupInfo?.members !== undefined && props.groupInfo?.members !== null) {
      return '' + props.groupInfo.members.find(member => member.id === assignedId)?.firstName + ' ' + props.groupInfo.members.find(member => member.id === assignedId)?.lastName
    } else {
      return 'Aucun'
    }
  }

  return (
    <div>
      <div className='tableau tableau--colored'>
        <p className='tableau__top'> {t('company.detailed_mission.tab.detail')} </p>
        <p className='tableau__top'> {t('company.detailed_mission.tab.attribution')} </p>
        <p className='tableau__top'> {t('company.detailed_mission.tab.price')} </p>
        <p className='tableau__top'> {t('company.detailed_mission.tab.task')} </p>
        <p className='tableau__top'> Action </p>
      </div>
        {props.missionStatus === MissionStatus.PENDING
          ? taskTab !== undefined && taskTab?.length > 0
            ? taskTab.map((task: MissionTaskArrayInfo, index: number) =>
              task.missionTask.groupId === parseInt(props.displayId)
                ? (<div key={task.missionTask.id} className={props.missionStatus === MissionStatus.PENDING ? 'tableau' : 'tableau'}>
                    <div className='tableau__cell tableau__cell--details '>
                      <div> {task.missionTask.name} </div>
                      <li> {task.missionTask.description} </li>
                    </div>
                    <div className='tableau__cell'>
                      { findMemberName(task.missionTask.studentId) }
                    </div>
                    <div className='tableau__cell'> {task.missionTask.amount} </div>
                    <div className='tableau__cell'>
                      <Checkbox onClick={() => changeTaskStatus(task.missionTask.id)} checked={isChecked(task.missionTask.status)} />
                    </div>
                    {props.missionStatus === MissionStatus.PENDING
                      ? <div className='tableau__cell'>
                          <img onClick={() => deleteTask(task.missionTask.id)} className='cpn-detailed-mission__edit-logo cpn-detailed-mission__sub-section--delete' src='/assets/remove.svg' />
                          <img onClick={() => openEditTaskModal(task)} className='cpn-detailed-mission__edit-logo cpn-detailed-mission__sub-section--delete' src='/assets/edit.svg' />
                          {selectedTask?.missionTask
                            ? <ModalTaskEdition open={editTaskModal} taskId={selectedTask?.missionTask.id} /* members={props.groupInfo.members} */ onValidation={validEditTaskModal} onClose={closeEditTaskModal} name={selectedTask?.missionTask.name} description={selectedTask?.missionTask.description} amount={selectedTask?.missionTask.amount} />
                            : null
                          }
                            </div>
                      : <div className='tableau__cell'> { t('company.detailed_mission.tab.no_action') } </div>
                    }
                  </div>)
                : null
            )
            : null
          : taskTab !== undefined && taskTab?.length > 0
            ? taskTab.map((task: MissionTaskArrayInfo, index: number) =>
              (<div key={task.missionTask.id} className={props.missionStatus === MissionStatus.PENDING ? 'tableau' : 'tableau'}>
                    <div className='tableau__cell tableau__cell--details '>
                      <div> {task.missionTask.name} </div>
                      <li> {task.missionTask.description} </li>
                    </div>
                    <div className='tableau__cell'>
                      { findMemberName(task.missionTask.studentId) }
                    </div>
                    <div className='tableau__cell'> {task.missionTask.amount} </div>
                    <div className='tableau__cell'>
                      <Checkbox onClick={() => changeTaskStatus(task.missionTask.id)} checked={isChecked(task.missionTask.status)} />
                    </div>
                    {props.missionStatus === MissionStatus.PENDING
                      ? <div className='tableau__cell'>
                          <img onClick={() => deleteTask(task.missionTask.id)} className='cpn-detailed-mission__edit-logo cpn-detailed-mission__sub-section--delete' src='/assets/remove.svg' />
                          <img onClick={() => openEditTaskModal(task)} className='cpn-detailed-mission__edit-logo cpn-detailed-mission__sub-section--delete' src='/assets/edit.svg' />
                          {selectedTask?.missionTask
                            ? <ModalTaskEdition open={editTaskModal} taskId={selectedTask?.missionTask.id} /* members={props.groupInfo.members} */ onValidation={validEditTaskModal} onClose={closeEditTaskModal} name={selectedTask?.missionTask.name} description={selectedTask?.missionTask.description} amount={selectedTask?.missionTask.amount} />
                            : null
                          }
                            </div>
                      : <div className='tableau__cell'> { t('company.detailed_mission.tab.no_action') } </div>
                    }
                  </div>)
            )
            : null
        }
        {props.missionStatus === MissionStatus.PENDING
          ? <div className='tableau tableau--add-task'>
              <div />
              <div />
              <div />
              <div />
              <div className='cpn-detailed-mission__add-task cpn-detailed-mission__centered'>
                <img className='cpn-detailed-mission__clickable' src='/assets/adder.svg' onClick={openTaskModal} />
              </div>
            </div>
          : null
        }
      <ModalTaskCreation open={taskModal} missionId={props.missionId} /* members={props.groupInfo.members} */ onValidation={validTaskModal} onClose={closeTaskModal} />
      <div className='cpn-detailed-mission__total-section'>
        <div />
        <div className='cpn-detailed-mission__total'>
            <p> Total Prestation (TTC): </p>
            <div>{ totalAmount } €</div>
        </div>
      </div>
      {props.missionStatus === MissionStatus.PENDING
        ? devisValidate
          ? null
          : props.groupListToAccept?.includes(parseInt(props.displayId))
            ? <div>
                <ClassicButton title='Valider le devis' onClick={handleDevisValidation} />
                <ClassicButton title='Refuser le devis' onClick={handleDevisRefuse} />
              </div>
            : null
        : null
      }
    </div>
  )
}

export default TaskTab
