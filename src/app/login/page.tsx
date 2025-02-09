'use client';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm } from 'react-hook-form';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
// import Link from 'next/link';

interface IFormInput {
    email: string,
    password: string
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
    const iClass = `rounded-none px-[14px] py-[10px] mt-2 border focus:outline-none`


    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-268px)] flex items-center py-10 text-sm'>
                <form className='flex flex-col w-full md:w-[410px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='email'>Email <span className='text-red-500'>*</span></label>
                    <input
                        id='email'
                        className={`${iClass} ${errors.email ? 'border-red-500' : ''} ${errors.email ? 'focus:border-red-500' : 'focus:border-black'}`}
                        type='text'
                        {...register("email", {
                            required: 'Please input your email!',
                            maxLength: 20,
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email format.'
                            }
                        }
                        )}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        placeholder='Email'
                        autoComplete='email'
                    />
                    {errors.email && (
                        <p className='text-red-500' role="alert">{errors.email.message}</p>
                    )}

                    <label className='mt-4' htmlFor='pass'>Password <span className='text-red-500'>*</span></label>
                    <input
                        id='pass'
                        className={`${iClass} ${errors.password ? 'border-red-500' : ''} ${errors.password ? 'focus:border-red-500' : 'focus:border-black'}`}
                        type='text'
                        {...register("password", {
                            required: 'Please input your password!',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long.'
                            },
                            // pattern: /^[A-Za-z]+$/i
                        })}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        placeholder='Password'
                        autoComplete='pass'
                    />
                    {errors.password && (
                        <p className='text-red-500' role="alert">{errors.password.message}</p>
                    )}
                    <a className='py-4' href="">Forgot password?</a>
                    <input className='cursor-pointer py-[10px] bg-black hover:bg-gray-900 text-white' type="submit" value='Login' />
                    <div className='flex items-center justify-between gap-2 my-4'>
                        <div className='w-full h-[1px] bg-black' />
                        <span className='text-nowrap'>Login with social account</span>
                        <div className='w-full h-[1px] bg-black' />
                    </div>
                    <button type='button' className='flex items-center justify-center w-full rounded-none text-2xl py-[7px] border-[1px] border-black'>
                        <FcGoogle />
                    </button>
                    <h5 className='mt-4 text-center'>New Customer? <Link href='/register' className='text-cyan-500'>Register</Link></h5>
                </form>
            </div>
        </>
    );
};

export default Login;