import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Store, Truck } from "lucide-react";
import React, { useState } from "react";

interface IFormInput {
    email: string,
    password: string
};

const CheckoutForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const iClass = `w-full rounded-sm px-[14px] py-[10px] mt-2 border focus:outline-none focus:border-blue-600`
    const [deliveryStatus, setDeliveryStatus] = useState<string>('ship');

    const handleDeliveryStatus = (value: string) => {
        setDeliveryStatus(value);
    }

    return (
        <form>
            <label htmlFor='email' className='text-lg block'>Contact</label>
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
            <div className='flex items-center space-x-2 mt-4 mb-8'>
                <Checkbox id="terms" className='rounded-sm border-gray-300' />
                <Label htmlFor="terms" className='font-normal'>Email me with news and offers</Label>
            </div>
            <h3 className='text-lg mb-2'>Delivery</h3>
            <RadioGroup onValueChange={handleDeliveryStatus} defaultValue="ship" className='gap-0'>
                <Label htmlFor="ship" className={`flex items-center space-x-2 px-[14px] py-[13px] border rounded-t-sm cursor-pointer ${deliveryStatus === 'ship' ? 'bg-blue-600/5 border-blue-600' : ''}`}>
                    <RadioGroupItem value="ship" id="ship" />
                    <span className='flex flex-1 items-center justify-between space-x-2 font-normal'>
                        Ship <Truck size={18} className={`${deliveryStatus === 'ship' ? 'text-blue-600' : ''}`} />
                    </span>
                </Label>
                <Label htmlFor="store" className={`flex items-center space-x-2 px-[14px] py-[13px] border rounded-b-sm cursor-pointer ${deliveryStatus === 'store' ? 'bg-blue-600/5 border-blue-600' : ''}`}>
                    <RadioGroupItem value="store" id="store" />
                    <span className='flex flex-1 items-center justify-between space-x-2 font-normal'>
                        Ship <Store size={18} className={`${deliveryStatus === 'store' ? 'text-blue-600' : ''}`} />
                    </span>
                </Label>
            </RadioGroup>
        </form>
    );
};

export default CheckoutForm;