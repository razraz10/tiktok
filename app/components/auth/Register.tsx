import { ShowErrorObject } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "@/context/user";
import { useGeneralStore } from "@/stores/general";


export default function Register() {

  let { setIsLoginOpen } = useGeneralStore();

  const contextUser = useUser()
  
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string | ''>('');
  const [email, setEmail] = useState<string | ''>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<ShowErrorObject | null>( null);

  const showError = (type:string) =>{
    if(error && Object.entries(error).length > 0 && error?.type == type) {
        return error.message
    }
    return ''
  }
  
  const validate = ()=>{
    setError(null)
    let isError = false

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!name) {
        setError({ type: 'name', message: 'חסר שם'})
        isError = true
    } else if (!email) {
        setError({ type: 'email', message: 'חסר אימייל'})
        isError = true
    } else if (!reg.test(email)) {
        setError({ type: 'email', message: 'האימייל לא נכון'})
        isError = true
    } else if (!password) {
        setError({ type: 'password', message: 'חסר סיסמה'})
        isError = true
    } else if (password.length < 8) {
        setError({ type: 'password', message: 'צריך סיסמה ארוכה יותר'})
        isError = true
    } else if (password != confirmPassword) {
        setError({ type: 'password', message: 'הסיסמה לא תואמת'})
        isError = true
    }
    return isError
  }

  const register = async () =>{
    let isError = validate()
    if(isError) return
    if(!contextUser) return

    try {
      setLoading(true)
      await contextUser.register(name, email, password)

      setLoading(false)
      setIsLoginOpen(false)
      router.refresh()

    } catch (error) {
      console.error(error);
      setLoading(false)
      alert(error)
      
    }
  }

  return (
    <>
      <div>
        <h1 className='text-center text-[28px] mb-4 font-bold '>הירשם</h1>

        <div className='px-6 pb-2'>
            <TextInput
            string={name}
            placeholder='שם'
            onUpdate={setName}
            inputType='name'
            error={showError('name')}
            />
        </div>

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

        <div className='px-6 pb-2'>
            <TextInput
            string={confirmPassword}
            placeholder='חזור שנית על הסיסמה'
            onUpdate={setConfirmPassword}
            inputType='confirmPassword'
            error={showError('confirmPassword')}
            />
        </div>


        <div className='px-6 pb-2 mt-6'>
            <button
             disabled={loading}
             onClick={()=>register()}
             className={`
                flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                ${!name || !email || !password || !confirmPassword ? 'bg-gray-200' : 'bg-[#F02C56]'}
             `}>
                {loading ? <BiLoaderCircle className='animate-spin' color='#ffffff' size={20} /> :'הרשם'}
             </button>
        </div>
    </div>
    </>
  );
}
