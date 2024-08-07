import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'
import { Card, Input, TextArea,Button } from 'pixel-retroui'

const AddEditNotes = ({noteData,type, onClose,getAllNotes,showToastMessage }) => {

  const [title, setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error,setError]=useState(null)

  //Add Note
  const addNewNote=async()=>{
    try{
      const response =await axiosInstance.post('/add-note',{
        title,
        content,
        tags
      })

      if(response.data && response.data.note){
        showToastMessage("Note Added Successfully")
        getAllNotes()
        onClose()
      }
    }
    catch(error){
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
    }
    else {
        setError("An unexpected error occured. Please try again.")
    }
    }
  }
  //Edit not
  const editNote=async()=>{
    const noteId=noteData._id
    try{
      const response =await axiosInstance.put('/edit-note/'+noteId,{
        title,
        content,
        tags
      })

      if(response.data && response.data.note){
        showToastMessage("Note Updated Successfully")
        getAllNotes()
        onClose()
      }
    }
    catch(error){
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
    }
    else {
        setError("An unexpected error occured. Please try again.")
    }
    }
  }

  const handleAddNote=()=>{
    if(!title){
      setError("Please enter the title")
      return
    }
    if(!content){
      setError("Please enter the content")
      return
    }
    setError("")

    if(type==='edit')
      {
        editNote()
      }
      else{
        addNewNote()
      }
  }
  return (
    <Card  shadowColor="#000000" className='relative p-5'>
      <button className='w-10 h-10 rounded-full flex justify-center items-center absolute -top-3 -right-3' onClick={onClose} >
        <MdClose className=' text-2xl text-black' />
      </button>
      <div className=" flex flex-col gap-2">
        <label className=' input-label text-black'>TITLE</label>
        <Input type="text" className=' text-2xl text-slate-950 outline-none' placeholder='go to gym at 5' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>

      <div className=" flex flex-col gap-2 mt-4">
        <label className='input-label text-black'>CONTENT</label>
        <TextArea bg='#ffffff' name="" id="" type="text" className=' text-sm text-slate-950 outline-none p-2' placeholder='Content' rows={10} value={content} onChange={({ target }) => setContent(target.value)} />
      </div>

      <div className=" mt-3">
        <label className=' input-lable' >TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

    {error && <p className=' text-red-500 text-xs pt-4'>{error}</p>}

      <Button bg='#F9A8D4' shadow='#F472B6' className='w-full font-medium text-white mt-5 mx-0' onClick={handleAddNote}>{type==='edit'?'UPDATE':'ADD'}</Button>
    </Card>
  )
}

export default AddEditNotes
