"use client";
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm } from 'react-hook-form';
// import Link from 'next/link';

interface IFormInput {
    email: string,
    password: string
};

const Login = () => {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
    const iClass = 'rounded-none px-[14px] py-[10px] border focus:outline-none focus:border-black'


    return (
        <div className='min-h-[calc(100vh-272px)] flex items-center justify-center py-10'>
            <form className='flex flex-col gap-4 w-1/5' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>Email</label>
                <input id='email' className={iClass} type='text' {...register("email", { required: true, maxLength: 20 })} placeholder='email' autoComplete='email' />
                <label htmlFor='pass'>Password</label>
                <input id='pass' className={iClass} type='text' {...register("password", { pattern: /^[A-Za-z]+$/i })} placeholder='password' autoComplete='pass' />
                <a href="">Forgot password?</a>
                <input className='cursor-pointer py-[10px] bg-black hover:bg-gray-900 text-white' type="submit" value='Login' />
                <div className='flex items-center justify-between gap-2'>
                    <div className='w-full h-[1px] bg-black' />
                    <span className='text-nowrap'>Login with social account</span>
                    <div className='w-full h-[1px] bg-black' />
                </div>
                <button type='button' className='flex items-center justify-center w-full rounded-none text-2xl py-[9px] border-[1px] border-black'>
                    <FcGoogle />
                </button>
                <h5 className='mt-4 text-center'>New Customer? <Link href='/register' className='text-cyan-500'>Register</Link></h5>
            </form>
        </div>
    );
};

export default Login;