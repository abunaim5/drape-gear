import { SubmitHandler, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Store, Truck } from "lucide-react";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface IFormInput {
    name: string,
    email: string,
    city: string,
    zip: number,
    address: string,
    apartment: string,
};

const countries = ['Canada', 'France', 'Germany', 'United States', 'United Kingdom'];

const CheckoutForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const iClass = `w-full rounded-sm px-[14px] py-[10px] border focus:outline-none focus:border-blue-600`
    const [deliveryStatus, setDeliveryStatus] = useState<string>('ship');
    const onSubmit: SubmitHandler<IFormInput> = async (data) => console.log(data);

    const handleDeliveryStatus = (value: string) => {
        setDeliveryStatus(value);
    }

    return (
        <>
            <form className='mb-10' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email' className='text-lg font-semibold block mb-2'>Contact</label>
                <input
                    id='email'
                    className={`${iClass} ${errors.email ? 'border-red-500' : ''} ${errors.email ? 'focus:border-red-500' : 'focus:border-black'}`}
                    type='text'
                    {...register("email", {
                        required: 'Enter your email!',
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
                    <p className='text-red-500 text-sm' role="alert">{errors.email.message}</p>
                )}
                <div className='space-x-2 mt-4 mb-8'>
                    <Checkbox id="terms" className='rounded-sm border-gray-300' />
                    <Label htmlFor="terms" className='font-normal'>Email me with news and offers</Label>
                </div>
                <h3 className='text-lg font-semibold mb-2'>Delivery</h3>
                <RadioGroup onValueChange={handleDeliveryStatus} defaultValue="ship" className='gap-0'>
                    <Label htmlFor="ship" className={`flex items-center space-x-2 px-[14px] py-[13px] border rounded-t-sm cursor-pointer ${deliveryStatus === 'ship' ? 'bg-blue-600/5 border-blue-600' : ''}`}>
                        <RadioGroupItem value="ship" id="ship" className={`${deliveryStatus === 'ship' ? 'border-none bg-blue-600' : ''}`} />
                        <span className='flex flex-1 items-center justify-between space-x-2 font-normal'>
                            Ship <Truck size={18} className={`${deliveryStatus === 'ship' ? 'text-blue-600' : ''}`} />
                        </span>
                    </Label>
                    <Label htmlFor="store" className={`flex items-center space-x-2 px-[14px] py-[13px] border rounded-b-sm cursor-pointer ${deliveryStatus === 'store' ? 'bg-blue-600/5 border-blue-600' : ''}`}>
                        <RadioGroupItem value="store" id="store" className={`${deliveryStatus === 'store' ? 'border-none bg-blue-600' : ''}`} />
                        <span className='flex flex-1 items-center justify-between space-x-2 font-normal'>
                            Store <Store size={18} className={`${deliveryStatus === 'store' ? 'text-blue-600' : ''}`} />
                        </span>
                    </Label>
                </RadioGroup>
                <div className='mt-8 space-y-3'>
                    <Select>
                        <SelectTrigger className="w-full px-[14px] h-[46px] rounded-sm">
                            <SelectValue placeholder="Country/Region" />
                        </SelectTrigger>
                        <SelectContent className=''>
                            {
                                countries.map((country, idx) => <SelectItem key={idx} value={`${country.toLowerCase()}`}>{country}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <div>
                        <input
                            id='name'
                            className={`${iClass} ${errors.name ? 'border-red-500' : ''} ${errors.name ? 'focus:border-red-500' : 'focus:border-black'}`}
                            type='text'
                            {...register("name", { required: 'Enter your name!' }
                            )}
                            aria-invalid={errors.name ? 'true' : 'false'}
                            placeholder='Full Name'
                            autoComplete='name'
                        />
                        {errors.name && (
                            <p className='text-red-500 text-sm' role="alert">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <input
                            id='address'
                            className={`${iClass} ${errors.address ? 'border-red-500' : ''} ${errors.address ? 'focus:border-red-500' : 'focus:border-black'}`}
                            type='text'
                            {...register("address", { required: 'Enter your current address!' }
                            )}
                            aria-invalid={errors.address ? 'true' : 'false'}
                            placeholder='Address'
                            autoComplete='address'
                        />
                        {errors.address && (
                            <p className='text-red-500 text-sm' role="alert">{errors.address.message}</p>
                        )}
                    </div>
                    <input
                        id='apartment'
                        className={`${iClass} ${errors.apartment ? 'border-red-500' : ''} ${errors.apartment ? 'focus:border-red-500' : 'focus:border-black'}`}
                        type='text'
                        {...register("apartment")}
                        // aria-invalid={errors.apartment ? 'true' : 'false'}
                        placeholder='Apartment, suite, etc. (optional)'
                        autoComplete='apartment'
                    />
                    {/* {errors.apartment && (
                        <p className='text-red-500' role="alert">{errors.apartment.message}</p>
                    )} */}
                    <div className='flex items-start justify-between gap-3'>
                        <div className='flex-1'>
                            <input
                                id='city'
                                className={`${iClass} ${errors.city ? 'border-red-500' : ''} ${errors.city ? 'focus:border-red-500' : 'focus:border-black'}`}
                                type='text'
                                {...register("city", { required: 'Enter a city!' }
                                )}
                                aria-invalid={errors.city ? 'true' : 'false'}
                                placeholder='City'
                                autoComplete='city'
                            />
                            {errors.city && (
                                <p className='text-red-500 text-sm' role="alert">{errors.city.message}</p>
                            )}
                        </div>
                        <Select>
                            <SelectTrigger className="w-full flex-1 px-[14px] h-[46px] rounded-sm">
                                <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent className=''>
                                {
                                    countries.map((country, idx) => <SelectItem key={idx} value={`${country.toLowerCase()}`}>{country}</SelectItem>)
                                }
                            </SelectContent>
                        </Select>
                        <div className='flex-1'>
                            <input
                                id='zip'
                                className={`${iClass} ${errors.zip ? 'border-red-500' : ''} ${errors.zip ? 'focus:border-red-500' : 'focus:border-black'}`}
                                type='text'
                                {...register("zip", { required: 'Enter a ZIP / postal code' }
                                )}
                                aria-invalid={errors.zip ? 'true' : 'false'}
                                placeholder='ZIP code'
                                autoComplete='zip'
                            />
                            {errors.zip && (
                                <p className='text-red-500 text-sm' role="alert">{errors.zip.message}</p>
                            )}
                        </div>
                    </div>
                    <div className='space-x-2 mt-4'>
                        <Checkbox id="saveInfo" className='rounded-sm border-gray-300' />
                        <Label htmlFor="saveInfo" className='font-normal'>Save this information for next time</Label>
                    </div>
                </div>
                <h3 className='text-lg font-semibold mb-2 mt-8'>Shipping method</h3>
                <div className='flex justify-center rounded-sm px-[14px] py-[13px] text-sm bg-[#F5F5F5] text-gray-500'>
                    <p>Enter your shipping address to view available shipping methods.</p>
                </div>
                <h3 className='text-lg font-semibold mb-1 mt-8'>Payment</h3>
                <p className='text-sm text-gray-500 mb-8'>All transactions are secure and encrypted.</p>
                <input className='cursor-pointer w-full py-[11px] rounded-sm bg-black hover:bg-gray-900 text-white' type="submit" value='Pay Now' />
            </form>
        </>
    );
};

export default CheckoutForm;