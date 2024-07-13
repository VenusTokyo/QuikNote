import { Input } from 'pixel-retroui'
import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
import { Button } from 'pixel-retroui'
const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()])
            setInputValue("")
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag()
        }
    }

    const handleRemoveTag=(tagToRemove)=>{
        setTags(tags.filter((tag)=>tag !== tagToRemove))
    }
    return (
        <div>
            {tags.length > 0 &&
                (<div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span className='flex items-center gap-2 text-sm text-white bg-pink-300 px-3 py-1 rounded' key={index}>
                            #{tag}
                            <button onClick={() => { handleRemoveTag(tag)}}>
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>)}
            <div className=" flex items-center gap-4 mt-3">
                <Input type="text" value={inputValue} className=' text-sm  px-1  ' placeholder='Add Tags' onChange={handleInputChange} onKeyDown={handleKeyDown} />
                <Button bg='#F9A8D4' shadow='#F472B6' className='flex w-8 h-8 items-center justify-center' onClick={() => { addNewTag() }}>
                    <MdAdd className=' text-2xl font-bold text-white' />
                </Button>
            </div>
        </div>
    )
}

export default TagInput
