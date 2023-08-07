import React from 'react'
import '../../../../CSS/StudentProfileVerification.scss'
import { useTranslation } from 'react-i18next'

function StudentProfileVerification (): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className='std-profile-verif'>
      <h1 className='std-profile-verif__title'>
        { t('student.profile.verif.title') }
      </h1>
      <div className='std-profile-verif__container'>
        <div className='std-profile-verif__content'>
          <img src='/assets/validate.svg' alt='' className='std-profile-verif__icon' />
          <p>
            { t('student.profile.verif.verified_student') }
          </p>
        </div>
        <div className='std-profile-verif__content'>
          <img src='/assets/validate.svg' alt='' className='std-profile-verif__icon' />
          <div className='std-profile-verif__text'>
            <p>
              { t('student.profile.verif.verified_freelance') }
            </p>
            <p className='std-profile-verif__subtext' >
              { t('student.profile.verif.more_information') }
            </p>
          </div>
        </div>
        <div className='std-profile-verif__content'>
          <img src='/assets/validate.svg' alt='' className='std-profile-verif__icon' />
          <div className='std-profile-verif__text'>
            <p>
              { t('student.profile.verif.linker_charte') }
            </p>
            <p className='std-profile-verif__subtext' >
              { t('student.profile.verif.check_charte') }
            </p>
          </div>
        </div>
        <div className='std-profile-verif__content'>
          <img src='/assets/validate.svg' alt=''className='std-profile-verif__icon' />
          <p>
            { t('student.profile.verif.verified_email') }
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudentProfileVerification
