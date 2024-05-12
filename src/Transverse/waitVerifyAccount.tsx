import React, { useEffect, useState } from 'react'
import HotbarDashboard from '../Student/Dashbord/Partials/HotbarDashboard'
import '../CSS/WaitVerifiedAccount.scss'
import { useTranslation } from 'react-i18next'
import ClassicButton from '../Component/ClassicButton'
import AuthApi from '../API/AuthApi'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Router/routes'

interface Props {
  isStudent?: boolean
}

function WaitVerifiedStudentAccount (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [refetch, setRefetch] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      const response = await AuthApi.VerifyStudentAccount(localStorage.getItem('jwtToken') as string)
      if (response !== undefined) {
        setIsVerified(response)
      }
    }
    fetchData()
  }, [refetch])

  const handleChangeRefetchStatus = (): void => {
    setRefetch(!refetch)
  }

  if (isVerified) {
    navigate(ROUTES.STUDENT_DASHBOARD)
  }

  return (
    <div className='std-bord-container'>
      <HotbarDashboard hideName hideNotif> Mention Légales </HotbarDashboard>
      <div className='waiting-account'>
        <div className='waiting-account__title'> {t('verify_page.waiting')} </div>
        <div className='waiting-account__button'>
          <ClassicButton title='Actualiser le status' onClick={handleChangeRefetchStatus} />
        </div>
      </div>
    </div>
  )
}

export default WaitVerifiedStudentAccount
