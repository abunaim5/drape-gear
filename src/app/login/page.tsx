"use client";
// import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm } from 'react-hook-form';
// import Link from 'next/link';

interface IFormInput {
    email: string,
    password: string
};

const Login = () => {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)


    return (
        <div className='min-h-[calc(100vh-272px)] flex items-center justify-center py-10'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input className='rounded-none border-2' type='text' {...register("email", { required: true, maxLength: 20 })} />
                <label>Password</label>
                <input type='text' {...register("password", { pattern: /^[A-Za-z]+$/i })} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Login;