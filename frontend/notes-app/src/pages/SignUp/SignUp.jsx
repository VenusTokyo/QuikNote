import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';

const SignUp = () => {
    const [name,setName]=useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    
    const handleSignUp=async(e)=>{
        e.preventDefault();

        // if (!validateEmail(email)) {
        //     setError("Please enter a valid email address.")
        //     return;
        // }
        // if (!password){
        //     setError("Please enter password")
        //     return
        // }
        // setError("")
    }
    return (
        <>
            <Navbar/>
            <div className=" flex items-center justify-center mt-28">
                <div className=" w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleSignUp}>
                        <h4 className=' text-2xl mb-7'>SignUp</h4>
                        <input
                            type="text"
                            placeholder='Email'
                            className='input-box'
                            // value={email}
                            // onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp
