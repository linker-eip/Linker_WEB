/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect } from 'react'
import type { GroupType, MissionTaskArrayInfo } from '../../../Typage/Type'
import { useTranslation } from 'react-i18next'
import '../../../CSS/CompanyDetailedMission.scss'
import Checkbox from '@mui/material/Checkbox'
import MissionApi from '../../../API/MissionApi'
import { TaskStatus, MissionStatus } from '../../../Enum'
import ModalTaskCreation from '../../../Company/Mission/partials/ModalTaskCreation'
import ModalTaskEdition from '../../../Company/Mission/partials/ModalTaskEdition'
import ClassicButton from '../../../Component/ClassicButton'

interface Props {
  missionTask: MissionTaskArrayInfo[]
  missionId: number
  missionStatus: string
  groupInfo: GroupType
  groupId: number
  onCallback: () => void
}

function TaskTab (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [taskTab, setTaskTab] = useState<MissionTaskArrayInfo[]>()
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [taskModal, setTaskModal] = useState<boolean>(false)
  const [editTaskModal, setEditTaskModal] = useState<boolean>(false)
  const [devisValidate, setDevisValidate] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<MissionTaskArrayInfo | null>(null)
  const [selectedName, setSelectedName] = useState<string>('')
  const [selectedId, setSelectedId] = useState<number>(0)
  const [selectedDescription, setSelectedDescription] = useState<string>('')
  const [selectedAmount, setSelectedAmount] = useState<number>(0)

  const [isAccepted, setIsAccepted] = useState<boolean>()

  useEffect(() => {
    async function fetchData (): Promise<void> {
      const response = await MissionApi.getStudentMissionInvitations(localStorage.getItem('jwtToken') as string, MissionStatus.GROUP_ACCEPTED)
      if (response !== undefined) {
        const result = response.find(element => element.id === props.missionId)
        if (result) {
          setIsAccepted(true)
        } else {
          setIsAccepted(false)
        }
      }
    }

    fetchData()
  }, [])

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

  const openEditTaskModal = (task: MissionTaskArrayInfo, name: string, id: number, description: string, amount: number): void => {
    setSelectedName(name)
    setSelectedAmount(amount)
    setSelectedDescription(description)
    setSelectedId(id)
    setSelectedTask(task)
    setEditTaskModal(true)
  }

  const deleteTask = (taskId: number): void => {
    const response = MissionApi.deleteTaskAsStudent(localStorage.getItem('jwtToken') as string, taskId)
    if (response !== undefined) {
      props.onCallback()
    }
  }

  const handleDevisValidation = async (): Promise<void> => {
    const response = await MissionApi.acceptMission(localStorage.getItem('jwtToken') as string, props.missionId, props.groupId ?? 0)
    if (response !== undefined) {
      setDevisValidate(true)
      window.location.reload()
    }
  }

  const findMemberName = (assignedId: number): string => {
    if (assignedId === null) {
      return 'Aucun'
    }
    if (props.groupInfo.members !== undefined) {
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
        {taskTab !== undefined && taskTab?.length > 0
          ? taskTab.map((task: MissionTaskArrayInfo, index: number) =>
            <div key={task.missionTask.id} className={props.missionStatus === MissionStatus.PENDING ? 'tableau' : 'tableau'}>
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
                    <img onClick={() => openEditTaskModal(task, task.missionTask.name, task.missionTask.id, task.missionTask.description, task.missionTask.amount)} className='cpn-detailed-mission__edit-logo cpn-detailed-mission__sub-section--delete' src='/assets/edit.svg' />
                  </div>
                : <div className='tableau__cell'> { t('company.detailed_mission.tab.no_action') } </div>
              }
              {selectedTask?.missionTask
                ? <ModalTaskEdition isStudent open={editTaskModal} taskId={selectedId} members={props.groupInfo.members} onValidation={validEditTaskModal} onClose={closeEditTaskModal} name={selectedName} description={selectedDescription} amount={selectedAmount} />
                : null
              }
            </div>
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
      <ModalTaskCreation isStudent open={taskModal} missionId={props.missionId} members={props.groupInfo.members} onValidation={validTaskModal} onClose={closeTaskModal} />
      <div className='cpn-detailed-mission__total-section'>
        <div />
        <div className='cpn-detailed-mission__total'>
            <p> Total Prestation (TTC): </p>
            <div>{ totalAmount } €</div>
        </div>
      </div>
      {props.missionStatus === MissionStatus.PENDING
        ? isAccepted
          ? <div> {'En attente d\'une validation de l\'entreprise...' } </div>
          : <ClassicButton title='Valider le devis' onClick={handleDevisValidation} />
        : null
      }
    </div>
  )
}

export default TaskTab
