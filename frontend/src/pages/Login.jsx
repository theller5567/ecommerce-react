import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { shopContext } from '../context/shopContext'
import { toast } from 'react-toastify'

const Login = () => {
  const { backendUrl, token, setToken, navigate } = useContext(shopContext)
  const [currentState, setCurrentState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if(currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        console.log(response.data)
        const { success, message, token } = response.data
        if(success) {
          setToken(token)
          localStorage.setItem('token', token)
          toast.success(message)
        }
        else {
          toast.error(message)
        }
      }
      else {
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        console.log(response.data)
        const { success, message, token } = response.data
        if(success) {
          setToken(token)
          localStorage.setItem('token', token)
          toast.success(message)
        }
        else {
          toast.error(message)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
      <div className="inline-flex items-center gap-2 mb-2 mt-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
     {currentState === 'Sign Up' && <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" className="w-full border border-gray-800 px-3 py-2" required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="w-full border border-gray-800 px-3 py-2" required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="w-full border border-gray-800 px-3 py-2" required />
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