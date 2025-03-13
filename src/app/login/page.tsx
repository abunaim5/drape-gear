'use client';
import Link from 'next/link';
// import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm } from 'react-hook-form';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
// import Link from 'next/link';

interface IFormInput {
    email: string,
    password: string
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [adminAccess, setAdminAccess] = useState<boolean>(false);
    const iClass = `rounded-none px-[14px] py-[10px] mt-2 border focus:outline-none`
    const searchParams = useSearchParams();
    const router = useRouter();
    const next = searchParams.get('next') || '/';
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            });
            if (res?.error) {
                console.error('Login failed:', res.error);
            } else {
                router.push(next);
            }
            console.log('request sent');
        } catch (error) {
            console.error('Sign-in error:', error)
        }
    };

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
                        defaultValue={adminAccess ? 'admin@mail.com' : ''}
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
                        defaultValue={adminAccess ? '123456' : ''}
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
                        <span className='text-nowrap'>Admin Access</span>
                        <div className='w-full h-[1px] bg-black' />
                    </div>
                    <button onClick={() => setAdminAccess(!adminAccess)} type='button' className='flex items-center justify-center w-full rounded-none py-[10px] border-[1px] border-black'>
                        Admin
                        {/* <FcGoogle /> */}
                    </button>
                    <h5 className='mt-4 text-center'>New Customer? <Link href='/register' className='text-cyan-500'>Register</Link></h5>
                </form>
            </div>
        </>
    );
};

export default Login;