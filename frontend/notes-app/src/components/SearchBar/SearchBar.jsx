import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import {IoMdClose} from 'react-icons/io'
import { Card } from 'pixel-retroui'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {

    return (
        <Card shadowColor='none' className=' w-80 flex items-center px-4'>
            <input
                type="text"
                placeholder='Search Notes'
                className='w-full text-sm py-1 bg-transparent outline-none'
                value={value}
                onChange={onChange}
            />
            {value &&(
            <IoMdClose className=' text-xl text-slate-500 cursor-pointer hover:text-black mr-3' onClick={onClearSearch}/>
            )}
            <FaMagnifyingGlass className=' text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch}/>
        </Card>
    )
}

export default SearchBar
