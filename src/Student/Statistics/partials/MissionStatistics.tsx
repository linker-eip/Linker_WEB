import React, { useState } from 'react'
import '../../../CSS/StudentStatistics.scss'
import { useTranslation } from 'react-i18next'

function MissionStatistics (): JSX.Element {
  const { t } = useTranslation()

  const [starsMark, setStarsMark] = useState(5)
  const [starsStatus, setStarsStatus] = useState(['selected', 'selected', 'selected', 'selected', 'selected'])
  const handleChangeStars = (): void => {
    if (starsMark !== 5) {
      setStarsMark(starsMark + 1)
    } else {
      setStarsMark(0)
    }

    switch (starsMark) {
      case 0:
        setStarsStatus(['no', 'no', 'no', 'no', 'no'])
        break
      case 1:
        setStarsStatus(['selected', 'no', 'no', 'no', 'no'])
        break
      case 2:
        setStarsStatus(['selected', 'selected', 'no', 'no', 'no'])
        break
      case 3:
        setStarsStatus(['selected', 'selected', 'selected', 'no', 'no'])
        break
      case 4:
        setStarsStatus(['selected', 'selected', 'selected', 'selected', 'no'])
        break
      case 5:
        setStarsStatus(['selected', 'selected', 'selected', 'selected', 'selected'])
        break
      default:
        break
    }
  }

  return (
    <div className='mission-stats'>
      <div className='mission-stats__title'>
        { t('student.dashboard.mission') }
      </div>
      <div className='mission-stats__container'>
        <div className='mission-stats__content'>
          <div className='mission-stats__content--title'> 2 </div>
          <div className='mission-stats__text mission-stats__text--important'> { t('student.sales.avis') } </div>
          <div className='mission-stats__text'> { t('student.sales.text_1') } </div>
        </div>
        <div className='mission-stats__content'>
          <div className='mission-stats__content--title'> 5 </div>
          <div className='std-profile-content__mark' onClick={handleChangeStars}>
            {
              starsStatus.map((item, index) => {
                if (item === 'selected') {
                  return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars-selected' key={index} />
                } else {
                  return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars' key={index} />
                }
              })
            }
          </div>
          <div className='mission-stats__text mission-stats__text--important'> { t('student.sales.mark') } </div>
          <div className='mission-stats__text'> { t('student.sales.text_2') } </div>
        </div>
      </div>
    </div>
  )
}

export default MissionStatistics
