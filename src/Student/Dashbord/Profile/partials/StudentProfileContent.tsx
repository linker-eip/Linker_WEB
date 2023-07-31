import React, { useState } from 'react'
import '../../../../CSS/StudentProfileContent.scss'
import Avatar from '@mui/material/Avatar'
import PlaceIcon from '@mui/icons-material/Place'
import EditIcon from '@mui/icons-material/Edit'

function StudentDocuentContent (): JSX.Element {
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
    <div className='std-profile-content'>
      <div className='std-profile-content__container'>
        <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' />
        <div className='std-profile-content__content'>
          <h1 className='std-profile-content__title'>
            NOM Prénom
          </h1>
          <p> Poste - techno </p>
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
            <div className='std-profile-content__circle' />
            <p> nbr mission</p>
          </div>
          <div className='std-profile-content__section'>
            <PlaceIcon />
            <p> Localité: Marseille </p>
          </div>
          <div className='std-profile-content__section'>
            <p> Site Web: </p>
            <p className='std-profile-content__site'> https://www.google.fr </p>
          </div>
        </div>
        <div>
          <EditIcon className='std-profile-content__edit' />
        </div>
      </div>
    </div>
  )
}

export default StudentDocuentContent
