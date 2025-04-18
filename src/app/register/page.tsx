'use client';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAxiosPublic from '@/utils/useAxiosPublic';
import { UserInfoType } from '@/types/user';
import toast from 'react-hot-toast';
// import Link from 'next/link';

interface IFormInput {
    name: string;
    email: string;
    password: string;
};

const Register = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const axiosPublic = useAxiosPublic();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setLoading(true);
        try {
            const userInfo: UserInfoType = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: 'user'
            }
            const res = await axiosPublic.post('/register', userInfo);
            if (res.status === 201) {
                toast.success('Successfully registered!');
                router.push('/login');
            }
        } catch (err: unknown) {
            if(err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('Registration failed');
            }
        } finally {
            setLoading(false);
        }
    };

    const iClass = `rounded-none px-[14px] py-[10px] mt-2 border focus:outline-none`

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-268px)] flex items-center py-10 text-sm'>
                <form className='flex flex-col w-full md:w-[410px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='name'>Name <span className='text-red-500'>*</span></label>
                    <input
                        id='name'
                        className={`${iClass} ${errors.name ? 'border-red-500' : ''} ${errors.name ? 'focus:border-red-500' : 'focus:border-black'}`}
                        type='text'
                        {...register("name", { required: 'Please input your name!' }
                        )}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        placeholder='Name'
                        autoComplete='name'
                    />
                    {errors.name && (
                        <p className='text-red-500' role="alert">{errors.name.message}</p>
                    )}
                    <label htmlFor='email' className='mt-4'>Email <span className='text-red-500'>*</span></label>
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
                    {/* <a className='py-4' href="">Forgot password?</a> */}
                    <input className='cursor-pointer mt-8 py-[10px] bg-black hover:bg-gray-900 text-white' type="submit" value={loading ? 'Register...' : 'Register'} />
                    <h5 className='mt-4 text-center'>Already have an account? <Link href='/login' className='text-cyan-500'>Login</Link></h5>
                </form>
            </div>
        </>
    );
};

export default Register;