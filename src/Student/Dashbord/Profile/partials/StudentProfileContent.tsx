import React from 'react'
import '../../../../CSS/StudentProfileContent.scss'
import Avatar from '@mui/material/Avatar'
import StarsIcon from '@mui/icons-material/Stars'
import PlaceIcon from '@mui/icons-material/Place'

function StudentDocuentContent (): JSX.Element {
  return (
    <div className='std-profile-content'>
      <div className='std-profile-content__container'>
        <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' />
        <div className='std-profile-content__content'>
          <h1 className='std-profile-content__title'>
            NOM Prénom
          </h1>
          <p> Poste - techno </p>
          <div className='std-profile-content__mark'>
            <StarsIcon className='std-profile-content__stars' />
            <StarsIcon className='std-profile-content__stars' />
            <StarsIcon className='std-profile-content__stars' />
            <StarsIcon className='std-profile-content__stars' />
            <StarsIcon className='std-profile-content__stars' />
            <p> | nbr mission</p>
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
      </div>
    </div>
  )
}

export default StudentDocuentContent
