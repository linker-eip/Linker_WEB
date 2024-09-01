/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-self-compare */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react'
import '../../../../CSS/StudentSecurity.scss'
import { useTranslation } from 'react-i18next'
import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, Switch } from '@mui/material'
import ClassicButton from '../../../../Component/ClassicButton'
import { type StudentPreferences as Preferences } from '../../../../Typage/NotificationType'
import NotificationApi from '../../../../API/NotificationApi'

function CompanyPreferences (): JSX.Element {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState('')
  const [messageNotif, setMessageNotif] = useState(false)
  const [documentNotif, setDocumentNotif] = useState(false)
  const [missionNotif, setMissionNotif] = useState(false)
  const [infoPreference, setInfoPreference] = useState<Preferences>()

  useEffect(() => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      const info = await NotificationApi.getCompanyPreferences(localStorage.getItem('jwtToken') as string)
      setDocumentNotif(info.mailNotifDocument)
      setMessageNotif(info.mailNotifMessage)
      setMissionNotif(info.mailNotifMission)
      setInfoPreference(info)
    }
    fetchData()
    if (i18n.language === 'en') {
      setLanguage('English')
    } else if (i18n.language === 'fr') {
      setLanguage('Français')
    }
  }, [])

  const handleChangeMessageNotif = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dto = {
      mailNotifMessage: !messageNotif,
      mailNotifMission: missionNotif,
      mailNotifDocument: documentNotif
    }
    NotificationApi.changeCompanyNotificationPreferences(localStorage.getItem('jwtToken') as string, dto)
    setMessageNotif(event.target.checked)
  }

  const handleChangeDocumentNotif = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dto = {
      mailNotifMessage: messageNotif,
      mailNotifMission: missionNotif,
      mailNotifDocument: !documentNotif
    }
    NotificationApi.changeCompanyNotificationPreferences(localStorage.getItem('jwtToken') as string, dto)
    setDocumentNotif(event.target.checked)
  }

  const handleChangeMissionNotif = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dto = {
      mailNotifMessage: messageNotif,
      mailNotifMission: !missionNotif,
      mailNotifDocument: documentNotif
    }
    NotificationApi.changeCompanyNotificationPreferences(localStorage.getItem('jwtToken') as string, dto)
    setMissionNotif(event.target.checked)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value)
  }

  const buttonValidation = (): void => {
    if (language === 'Français' || language === 'French') {
      i18n.changeLanguage('fr')
    } else if (language === 'Anglais' || language === 'English') {
      i18n.changeLanguage('en')
    }
  }

  return (
    <div className='std-security'>
      <div className='std-security__section'>
        <div>
          <div className='std-security__title'>
            { t('student.settings.preference.language') }
          </div>
          <div className='std-security__subtitle'>
            { t('student.settings.preference.choose_language') }
          </div>
        </div>
        <div className='std-security__container'>
        <FormControl fullWidth sx={{ minWidth: 300 }}>
          <InputLabel id="demo-simple-select-label"> {t('student.settings.preference.select_language')} </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label={t('student.settings.preference.select_language')}
            onChange={handleChange}
          >
            <MenuItem value={t('student.settings.preference.french')}> {t('student.settings.preference.french')} </MenuItem>
            <MenuItem value={t('student.settings.preference.english')}> {t('student.settings.preference.english')} </MenuItem>
          </Select>
        </FormControl>
        <ClassicButton title={t('student.settings.preference.save')} onClick={buttonValidation} />
        </div>
      </div>
      <div className='std-security__section'>
        <div>
          <div className='std-security__title'>
            { t('student.settings.preference.notifications') }
          </div>
          <div className='std-security__subtitle'>
            { t('student.settings.preference.choose_notif') }
          </div>
        </div>
        <div className='std-security__container2'>
          <div className='std-security__content'>
            <div className='std-security__help-text'> {t('student.settings.preference.new_message')} </div>
            {infoPreference !== null && infoPreference?.mailNotifMessage === true
              ? <Switch
                  checked={messageNotif}
                  onChange={handleChangeMessageNotif}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              : <Switch
                onChange={handleChangeMessageNotif}
                inputProps={{ 'aria-label': 'controlled' }}
                />
            }
          </div>
          <div className='std-security__content'>
            <div className='std-security__help-text'> {t('student.settings.preference.doc_notif')} </div>
            {infoPreference !== null && infoPreference?.mailNotifDocument === true
              ? <Switch
                  checked={documentNotif}
                  onChange={handleChangeDocumentNotif}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              : <Switch
                onChange={handleChangeDocumentNotif}
                inputProps={{ 'aria-label': 'controlled' }}
                />
            }
          </div>
          <div className='std-security__content'>
            <div className='std-security__help-text'> {t('student.settings.preference.mission_notif')} </div>
            {infoPreference !== null && infoPreference?.mailNotifMission === true
              ? <Switch
                  checked={missionNotif}
                  onChange={handleChangeMissionNotif}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              : <Switch
                onChange={handleChangeMissionNotif}
                inputProps={{ 'aria-label': 'controlled' }}
                />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyPreferences
