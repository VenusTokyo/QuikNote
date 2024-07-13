import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { useEffect } from 'react'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/Cards/EmptyCard'
import {Button } from 'pixel-retroui'
const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  })
  const [allNotes, setAllNotes] = useState([])

  const [userInfo, setUserInfo] = useState(null)

  const [isSearch, setIsSearch] = useState(false)
  const navigate = useNavigate()

  const handleEdit = (notesDetails) => {
    setOpenAddEditModal({ isShown: true, data: notesDetails, type: "edit" })
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message: message,
      type
    })
  }
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: ""
    })
  }

  //get userinfo
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user")
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    }
    catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        navigate('/login')
      }
    }
  }
  //get all notes 
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes")

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes)
      }
    }
    catch (error) {
      console.log("An unexpected error occured. Please try again.")
    }
  }

  const deleteNote = async (data) => {
    const noteId = data._id
    try {
      const response = await axiosInstance.delete('/delete-note/' + noteId)

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete")
        getAllNotes()

      }
    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {

        setError("An unexpected error occured. Please try again.")
      }

    }
  }

  //search notes
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query }
      })

      if (response.data && response.data.notes) {
        setIsSearch(true)
        console.log(isSearch)
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateIsPinned=async(noteData)=>{
    const noteId=noteData._id
    try{
      const response =await axiosInstance.put('/update-note-pinned/'+noteId,{
        "isPinned":!noteData.isPinned
      })

      if(response.data && response.data.note){
        showToastMessage("Pinned")
        getAllNotes()
       
      }
    }
    catch(error){
      console.log(error)
    }
  }
  const handleClearSearch=()=>{
    setIsSearch(false)
    console.log(isSearch)
    getAllNotes()
  }
  useEffect(() => {
    getUserInfo()
    getAllNotes()
    return () => {

    }
  }, [])


  return (
    <div className='relative min-h-screen bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
      <div className=" container mx-auto px-7">
        {allNotes.length > 0 ?
          (<div className=" grid grid-cols-2 gap-4 mt-8 md:grid-cols-3">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => { handleEdit(item) }}
                onDelete={() => { deleteNote(item) }}
                onPinNote={() => {updateIsPinned(item) }}
              />
            ))}
          </div>) :
          (<EmptyCard isSearch={isSearch}/>)}
      </div>
      <div className="absolute right-10 bottom-10">

      
      <Button bg='#F9A8D4' shadow='#F472B6' className=' w-16 h-16 flex items-center justify-center ' onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null })
      }}>
        <MdAdd className=' text-[45px] text-white' />
      </Button>
      </div>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.1)"
          }
        }}
        contentLabel=""
        className=" w-[40%] max-h-3/4  mx-auto mt-14 ">

        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </div>
  )
}

export default Home
