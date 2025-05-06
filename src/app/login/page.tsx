'use client';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import toast from 'react-hot-toast';

interface IFormInput {
    email: string,
    password: string
};

const LoginComponent = () => {
    const [adminAccess, setAdminAccess] = useState<boolean>(false);
    const iClass = `rounded-none px-[14px] py-[10px] mt-2 border focus:outline-none`
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get('next') || '/';
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                callbackUrl,
                redirect: false
            });
            if (res?.ok && res.url) {
                toast.success('Great to see you again!');
                router.refresh();
                router.push(res.url);
            } else {
               toast.error('Invalid email or password');
            }
        } catch (error) {
            console.error('Sign-in error:', error);
        }
    };

    const handleResetDefaultVal = () => {
        reset({
            email: 'admin@mail.com',
            password: '123456'
        })
    }

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-260px)] flex items-center py-8 text-sm'>
                <form className='flex flex-col w-full md:w-[410px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='email'>Email <span className='text-red-500'>*</span></label>
                    <input
                        id='email'
                        className={`${iClass} ${errors.email ? 'border-red-500' : ''} ${errors.email ? 'focus:border-red-500' : 'focus:border-black'}`}
                        type='email'
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
                        type='password'
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
                    <button onClick={() => { setAdminAccess(!adminAccess); handleResetDefaultVal() }} type='button' className='flex items-center justify-center w-full rounded-none py-[10px] border-[1px] border-black'>
                        Admin
                        {/* <FcGoogle /> */}
                    </button>
                    <h5 className='mt-4 text-center'>New Customer? <Link href='/register' className='text-cyan-500'>Register</Link></h5>
                </form>
            </div>
        </>
    );
};

const Login = () => {
    return (
        <Suspense>
            <LoginComponent />
        </Suspense>
    )
};

export default Login;