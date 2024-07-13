import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import wand from '../../assets/wand.jpg'
const Navbar = ({userInfo, onSearchNote,handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("")


  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }

  return (
    <div className=' bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <div className="flex items-center">

      <img src={wand} className='h-16'></img>
      <h2 className=' text-xl font-bold text-black py-2'>QuikNote</h2>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => { setSearchQuery(target.value) }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch} />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar
