import React from 'react'
import { FaNotesMedical } from 'react-icons/fa6'
import {TbNoteOff} from 'react-icons/tb'
const EmptyCard = (isSearch) => {
  return (
    <div className='flex flex-col items-center justify-center mt-24'>
      {isSearch?<TbNoteOff className=' text-[240px] text-gray-200'/>:<FaNotesMedical className=' text-[240px] text-gray-200'/>}
      
      <p className=" w-1/2 text-sm font-medium text-slate-500 text-center leading-7 m-5">
      {isSearch?`Oops! No notes found matching your search.`:`Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and remainders. Lets get started.`}
      
      </p>
    </div>
  )
}

export default EmptyCard
