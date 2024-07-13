import React from 'react'
import { MdOutlinePushPin, MdCreate,MdDelete } from 'react-icons/md'
import moment from "moment"
import { Card } from 'pixel-retroui'

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}) => {
    return (
        <Card bg="#fefcd0"
        textColor="black"
        borderColor="black" shadowColor="black" className='  p-4  hover:scale-105 duration-200 hover:shadow-[#fefcd0] transition-all ease-in-out '>
            <div className=" flex items-center justify-between">
                <div className="">
                    <h6 className=' text-base font-bold'>{title}</h6>
                    <span className=' text-sm text-slate-500'>{moment(date).format('DD MMM YYYY')}</span>
                </div>
                <MdOutlinePushPin className={`icon-btn ${isPinned?'text-primary':'text-black'}`} onClick={onPinNote}/>
            </div>
            <p className=" text-xs text-slate-600 mt-2">{content?.slice(0,60)}</p>
            <div className=" flex items-center justify-between mt-2">
                <div className=" text-xs text-pink-400">{tags.map((item)=>`#${item}  `)}</div>
                <div className=" flex items-center gap-2">
                    <MdCreate className='icon-btn text-green-300 hover:text-green-600' onClick={onEdit}/>
                    <MdDelete className='icon-btn text-red-300 hover:text-red-500' onClick={onDelete}/>

                </div>
            </div>
        </Card>
    )
}

export default NoteCard
