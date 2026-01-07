import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
      <div className="inline-flex items-center gap-2 mb-2 mt-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
     {currentState === 'Sign Up' && <input type="text" placeholder="Name" className="w-full border border-gray-800 px-3 py-2" required />}
      <input type="email" placeholder="Email" className="w-full border border-gray-800 px-3 py-2" required />
      <input type="password" placeholder="Password" className="w-full border border-gray-800 px-3 py-2" required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer hover:text-gray-500">Forgot Password?</p>
        {
          currentState === 'Login' ?
          <p className="cursor-pointer" onClick={() => setCurrentState('Sign Up')}>Create account</p> :
          <p className="cursor-pointer" onClick={() => setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login