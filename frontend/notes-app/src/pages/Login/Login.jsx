import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import butterfly from '../../assets/butterflies.gif'
import { Card, Input,Button } from 'pixel-retroui'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate=useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return;
        }
        if (!password){
            setError("Please enter password")
            return
        }
        setError("")
        //login api call
        try{
            const response=await axiosInstance.post("/login",{
                email:email,
                password:password
            })
            //Handle successful login response
            if(response.data && response.data.accessToken){
                localStorage.setItem("token",response.data.accessToken)
                navigate('/dashboard')
            }

        }
        catch(error){
            //handle error

            if (error.response && error.response.data &&error.response.data.message){
                setError(error.response.data.message)
            }
            else{
                setError("An unexpecte error occured. Please try again.")
            }

        }
        
    }
    return (
        <div className='flex justify-center items-center relative min-h-screen bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'>
        
            <div className=" flex items-center justify-center flex-col">
            <div className="w-full mb-5">
                    <img className='w-20 relative top-6 left-5'  src={butterfly} alt="" />
                    
                    <h1 className=' text-center font-bold text-5xl'>QuikNote</h1>
                    {/* <p>A kawaii sticky note app</p> */}
                    
                </div>
                <Card className=" w-96  bg-white px-7 py-10">


                    <form onSubmit={handleLogin}>
                        <h4 className=' text-2xl mb-7 font-bold text-center'>Login</h4>
                        <Input
                            type="text"
                            placeholder='Email'
                            className='w-full mb-4'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <PasswordInput value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        {error && <p className=' text-red-500 text-xs pb-1'>{error}</p>}

                        <Button bg='#F9A8D4' shadow='#F472B6' type="submit" className='m-1 mt-5 w-full text-white' >
                            Login
                        </Button>
                        <p className=' text-sm text-center mt-4'>
                            Not registered yet?{" "}
                            <Link to='/signup' className=' font-medium text-primary underline'>Create an Account</Link>
                        </p>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Login
