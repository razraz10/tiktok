import { ShowErrorObject } from '@/app/types';
import React, { useState } from 'react'
import TextInput from '../TextInput';
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from '@/context/user';
import { useGeneralStore } from '@/stores/general';

export default function Login() {

  let { setIsLoginOpen } = useGeneralStore()
    
  const contextUser = useUser()

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | ''>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<ShowErrorObject | null>( null);

    const showError = (type:string) =>{
        if(error && Object.entries(error).length > 0 && error?.type == type) {
            return error.message
        }
        return ''
      }

      const login = async ()=>{
        let isError = validate()
        if(isError) return
        if(!contextUser) return

        try {
            setLoading(true)
            await contextUser.login(email, password)
      
            setLoading(false)
            setIsLoginOpen(false)
      
          } catch (error) {
            console.error(error);
            setLoading(false)
            alert(error)
            
          }
      }

      const validate = ()=>{
        setError(null)
        let isError = false
        
       if (!email) {
            setError({ type: 'email', message: 'חסר אימייל'})
            isError = true

        } else if (!password) {
            setError({ type: 'password', message: 'חסר סיסמה'})
            isError = true
        }
        return isError
      }

  return (
    <>
    <div>
        <h1 className='text-center text-[28px] mb-4 font-bold '>התחבר</h1>

        <div className='px-6 pb-2'>
            <TextInput
            string={email}
            placeholder='כתובת אימייל'
            onUpdate={setEmail}
            inputType='email'
            error={showError('email')}
            />
        </div>

        <div className='px-6 pb-2'>
            <TextInput
            string={password}
            placeholder='סיסמה'
            onUpdate={setPassword}
            inputType='password'
            error={showError('password')}
            />
        </div>

        <div className='px-6 pb-2 mt-6'>
            <button
             disabled={loading}
             onClick={()=>login()}
             className={`
                flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                ${!email|| !password ? 'bg-gray-200' : 'bg-[#F02C56]'}
             `}>
                {loading ? <BiLoaderCircle className='animate-spin' color='#ffffff' size={20} /> :'התחבר'}
             </button>
        </div>
    </div>
    </>
  )
}
