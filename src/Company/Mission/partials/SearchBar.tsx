/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react'
import StudentInviteCard from './StudentInviteCard'
import '../../../CSS/StudentGroup.scss'
import GroupApi from '../../../API/GroupApi'
import type { SearchGroupData } from '../../../Typage/Type'

interface Props {
  data: string[]
  missionId: number
}

const SearchBar = (props: Props): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchGroupData[]>()

  useEffect(() => {
    async function fetchData (): Promise<void> {
      const response = await GroupApi.searchGroupById(localStorage.getItem('jwtToken') as string, props.missionId)
      if (response !== undefined) {
        setSearchResults(response.data)
      }
    }
    fetchData()
  }, [])

  const handleSearch = (element: any): void => {
    const searchTerm = element.target.value
    setSearchTerm(searchTerm)
  }

  const handleResearch = async (): Promise<void> => {
    const response = await GroupApi.searchGroup(localStorage.getItem('jwtToken') as string, searchTerm)
    if (response !== undefined) {
      setSearchResults(response.data)
    }
  }

  return (
    <div className='std-invite-modal__searchbar-section'>
      <div className='std-invite-modal__searchbar-container'>
        <img src='/assets/icon_search.svg' className='std-invite-modal__search-icon' onClick={handleResearch} />
        <input
        className='std-invite-modal__searchbar'
        type="text"
        placeholder="Rechercher un groupe"
        value={searchTerm}
        onChange={handleSearch}
        />
      </div>
      <ul className='std-invite-modal__list' style={{ maxHeight: '300px', overflowY: 'auto' }}>
        { searchResults !== undefined
          ? searchResults.map((result: SearchGroupData, index: number) => (<StudentInviteCard key={index} group={result} missionId={props.missionId} />))
          : null
        }
      </ul>
    </div>
  )
}

export default SearchBar
