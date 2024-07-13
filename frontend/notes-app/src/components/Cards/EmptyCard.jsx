import React from 'react'
import kitty from '../../assets/kitty.gif'
const EmptyCard = (isSearch) => {
  return (
    <div className='flex flex-col items-center justify-center mt-24'>
      <img src={kitty} alt="" />
      
      <p className=" w-1/2 text-sm font-medium text-slate-500 text-center leading-7 m-5">
      Oh, Such Empty
      
      </p>
    </div>
  )
}

export default EmptyCard
