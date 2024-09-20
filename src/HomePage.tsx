import React from 'react'
import './CSS/HomePage.scss'
import HotbarDashboard from './Student/Dashbord/Partials/HotbarDashboard'
import { useTranslation } from 'react-i18next'
import ClassicButton from './Component/ClassicButton'
import * as ROUTES from './Router/routes'
import { useNavigate } from 'react-router-dom'

function HomePage (): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const RedirectCompanyLogIn = (): void => {
    navigate(ROUTES.COMPANY_LOGIN_PAGE)
  }

  const RedirectCompanyRegister = (): void => {
    navigate(ROUTES.COMPANY_REGISTER_PAGE)
  }

  const RedirectStudentLogIn = (): void => {
    navigate(ROUTES.STUDENT_LOGIN_PAGE)
  }

  const RedirectStudentRegister = (): void => {
    navigate(ROUTES.STUDENT_REGISTER_PAGE)
  }

  return (
    <div className='std-bord-container'>
      <HotbarDashboard homepage hideName hideNotif> </HotbarDashboard>
      <div className='homepage'>
        <img className='homepage__picture' src='/assets/Landing.png' />
        <img className='homepage__abs-logo' src='/assets/LinkerFull.png' />
        <img className='homepage__phones' src='/assets/phones.png'/>
        <img className='homepage__laptop' src='/assets/laptop.svg'/>
        <div className='homepage__title-section'>
          <div className='homepage__title-colored'> { t('homepage.title_1') } <span className='homepage__title'> { t('homepage.title_2') } </span> { t('homepage.title_3') } </div>
        </div>

        <div className='homepage__text-1'> {t('homepage.text_1')} </div>
        <div className='homepage__section'>
          <div id='register' className='homepage__card-container'>
            <div className='homepage__content-title'> {t('homepage.espace')} <span className='homepage__content-title-colored'> {t('homepage.company.title')} </span> </div>
            <div className='homepage__content'>
              <div className='homepage__subtext'> {t('homepage.company.text_1')} </div>
              <div className='homepage__subtext'> {t('homepage.company.text_2')} </div>
            </div>
            <div className='homepage__button-section'>
              <ClassicButton onClick={RedirectCompanyRegister} title={t('homepage.register')} />
              <ClassicButton onClick={RedirectCompanyLogIn} title={t('homepage.login')} />
            </div>
            <img className='homepage__logo' src='/assets/building.svg' />
          </div>
          <div className='homepage__card-container'>
            <div className='homepage__content-title'> {t('homepage.espace')} <span className='homepage__content-title-colored'> {t('homepage.student.title')} </span> </div>
            <div className='homepage__content'>
              <div className='homepage__subtext'> {t('homepage.student.text_1')} </div>
              <div className='homepage__subtext'> {t('homepage.student.text_2')} </div>
            </div>
            <div className='homepage__button-section'>
              <ClassicButton onClick={RedirectStudentRegister} title={t('homepage.register')} />
              <ClassicButton onClick={RedirectStudentLogIn} title={t('homepage.login')} />
            </div>
            <img className='homepage__logo' src='/assets/cap.svg' />
          </div>
        </div>
        <div className='homepage__text'> {t('homepage.text_2')} </div>
      </div>
    </div>
  )
}

export default HomePage
