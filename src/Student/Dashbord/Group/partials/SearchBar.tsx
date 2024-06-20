/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import StudentInviteCard from './StudentInviteCard'
import '../../../../CSS/StudentGroup.scss'
import GroupApi from '../../../../API/GroupApi'
import type { InvitedMember, SearchMember } from '../../../../Typage/Type'

interface Props {
  data: string[]
}

const SearchBar = (props: Props): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchMember[]>()
  const [memberInvited, setMemberInvited] = useState<InvitedMember[] | undefined>()

  const handleSearch = (element: any): void => {
    const searchTerm = element.target.value
    setSearchTerm(searchTerm)
  }

  const handleResearch = async (): Promise<void> => {
    const response = await GroupApi.searchMembers(localStorage.getItem('jwtToken') as string, searchTerm)
    setSearchResults(response.data)

    const membersInvitedResponse = await GroupApi.getMemberInvited(localStorage.getItem('jwtToken') as string)
    setMemberInvited(membersInvitedResponse.data)
  }

  return (
    <div className='std-invite-modal__searchbar-section'>
      <div className='std-invite-modal__searchbar-container'>
        <img src='/assets/icon_search.svg' className='std-invite-modal__search-icon' onClick={handleResearch} />
        <input
        className='std-invite-modal__searchbar'
        type="text"
        placeholder="Rechercher un étudiant"
        value={searchTerm}
        onChange={handleSearch}
        />
      </div>
      <ul className='std-invite-modal__list' style={{ maxHeight: '300px', overflowY: 'auto' }}>
        { searchResults !== undefined && memberInvited !== undefined
          ? searchResults.map((result: SearchMember, index: number) => (<StudentInviteCard key={index} invitedMember={memberInvited} member={result} />))
          : null
        }
      </ul>
    </div>
  )
}

export default SearchBar
