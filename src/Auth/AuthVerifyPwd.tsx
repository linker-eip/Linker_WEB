/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AuthApi from '../API/AuthApi'
import '../CSS/VerificationPage.scss'
import { useTranslation } from 'react-i18next'
import ClassicButton from '../Component/ClassicButton'
import * as ROUTES from '../Router/routes'

function AuthVerifyPwd (): JSX.Element {
  const { code } = useParams()
  const [authData, setAuthData] = useState<boolean>(false)
  const [verifiedAccount, setVerifiedAccount] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await AuthApi.VerifyStudentAccount(localStorage.getItem('jwtToken') as string)
        setVerifiedAccount(data)
        if (data) {
          setAuthData(data)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    fetchData()
  }, [])

  const handleBackToHomePage = (): void => {
    navigate(ROUTES.LANDING_PAGE)
  }

  const handleRedirectToLinker = (): void => {
    navigate(ROUTES.STUDENT_LOGIN_PAGE)
  }

  const handleVerifMail = async (): Promise<void> => {
    try {
      const data = await AuthApi.verifyStudentPassword(code !== undefined ? code : '')
      if (data.status === 201) {
        setAuthData(true)
      } else {
        setAuthData(false)
      }
      const response = await AuthApi.VerifyStudentAccount(localStorage.getItem('jwtToken') as string)
      setVerifiedAccount(response)
    } catch (error) {
      console.error('Error fetching profile data:', error)
    }
  }

  const { t } = useTranslation()
  return (
    <div className='verify-page'>
      {verifiedAccount
        ? <div>
          {authData
            ? <div className='verify-page__container'>
              <div className='verify-page__title'> Félicitations !</div>
              <div className='verify-page__text-section'>
                <div>
                  <div className='verify-page__text'> {t('verify_page.success.text_1')} </div>
                  <div className='verify-page__text'> {t('verify_page.success.text_2')} <span className='verify-page__text-colored'> {t('verify_page.success.text_3')} </span> </div>
                </div>
                <div className='verify-page__text'> {t('verify_page.success.text_4')} </div>
                <div className='verify-page__text'> {t('verify_page.success.text_5')} <span className='verify-page__text-colored'> {t('verify_page.success.text_6')} </span>  </div>
                <div className='verify-page__text'> {t('verify_page.success.text_7')} <span className='verify-page__text-colored'> {t('verify_page.success.text_8')} </span> {t('verify_page.success.text_9')} </div>
                <div className='verify-page__button-container'>
                  <div className='verify-page__text'> { t('verify_page.success.button_title_1') } <span className='verify-page__button-title'> { t('verify_page.success.button_title_2') } </span> </div>
                  <div className='verify-page__text'>  { t('verify_page.success.button_subtext') } </div>
                  <ClassicButton onClick={handleRedirectToLinker} title={t('verify_page.success.button_text')} />
                  <img className='verify-page__logo' src='/assets/cap.svg' />
                </div>
              </div>
            </div>
            : <div className='verify-page__container'>
              <div className='verify-page__title'> OUPS !</div>
              <div className='verify-page__text-section'>
                <div>
                  <div className='verify-page__text'> {t('verify_page.failed.text_1')} </div>
                  <div className='verify-page__text'> {t('verify_page.failed.text_2')} </div>
                </div>
                <div className='verify-page__text'> {t('verify_page.failed.text_3')} </div>
                <div className='verify-page__text'> {t('verify_page.failed.text_4')} <span className='verify-page__text-colored'> {t('verify_page.failed.text_5')} </span> </div>
                <div className='verify-page__text'> {t('verify_page.failed.text_6')} </div>
                <ClassicButton onClick={handleBackToHomePage} title={t('verify_page.failed.button_text')} />
              </div>
            </div>
          }
        </div>
        : <div className='verify-page__section'>
          <div className='verify-page__container'>
          <div className='verify-page__title'> Confirmation de votre compte.</div>
            <ClassicButton title='Appuyer ici pour confirmer votre adresse email.' onClick={handleVerifMail} />
          </div>
        </div>
      }
    </div>
  )
}

export default AuthVerifyPwd
