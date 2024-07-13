import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { Card } from 'pixel-retroui'
const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassworrd] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassworrd(!isShowPassword)
    };

    return (
        <Card shadowColor='none' className='w-full flex items-center p-1 relative right-1 mb-3'>
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className=' w-full  bg-transparent   rounded outline-none'
            />
            {isShowPassword ? <FaRegEye
                size={22} className='text-primary cursor-pointer'
                onClick={() => { toggleShowPassword() }}
            /> : <FaRegEyeSlash size={22} className=' text-slate-400 cursor-pointer'
                onClick={() => { toggleShowPassword() }} />}

        </Card>
    )
}

export default PasswordInput
