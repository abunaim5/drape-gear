import { SubmitHandler, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CircleAlert, Store, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Link from "next/link";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { OrderedProductsInfoType, OrderedProductsType } from "@/types/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getAxiosSecure } from "@/lib/axiosSecure";

interface IFormInput {
    name: string,
    phone: number,
    city: string,
    zip: number,
    address: string,
    apartment: string,
    country: string,
    state: string
};

const countries = ['Bangladesh', 'Canada', 'France', 'Germany', 'United States', 'United Kingdom'];
const states = ['Dhaka', 'Chattogram', 'Barishal', 'Khulna', 'Rajshahi', 'Rangpur', 'Mymensingh', 'Sylhet']

const CheckoutForm = ({ orderedProducts, totalAmount }: { orderedProducts: OrderedProductsType[], totalAmount: number }) => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const iClass = `w-full rounded-sm px-[14px] py-[10px] border focus:outline-none focus:border-[#1773B0]`
    const [paymentSuccessStatus, setPaymentSuccessStatus] = useState<string>('');
    const [deliveryStatus, setDeliveryStatus] = useState<string>('ship');
    const [clientSecret, setClientSecret] = useState<string>('');
    const { data: session } = useSession();
    const router = useRouter();
    const elements = useElements();
    const stripe = useStripe();
    const isDisabled = deliveryStatus !== 'ship' || !stripe || !clientSecret || paymentSuccessStatus;
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
    const currentDate = new Date().toLocaleDateString('en-us', options);
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            if (!stripe || !elements) {
                return;
            }

            const card = elements.getElement(CardElement);

            if (!card) {
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });

            if (error?.message) {
                console.error('[Payment error]', error);
                toast.error(error.message);
                // setError(error.message);
            } else {
                console.log('[PaymentMethod]', paymentMethod);
                // setError('');
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: session?.user.name || 'anonymous',
                        email: session?.user.email || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                console.error('[Payment Intent Error]', error);
            } else {
                // console.log('[PaymentIntent]', paymentIntent);
                const axiosSecure = await getAxiosSecure();
                if (paymentIntent.status === 'succeeded') {
                    toast.success('Payment successful');
                    setPaymentSuccessStatus(paymentIntent.status);
                    const fullAddress = [data.address, data.apartment, data.city, data.state, data.country, data.zip].filter(Boolean).join(', ');
                    const orderedProductsInfo: OrderedProductsInfoType = {
                        user_name: session?.user.name ?? '',
                        user_email: session?.user.email ?? '',
                        items: orderedProducts,
                        totalAmount: totalAmount,
                        createdAt: currentDate,
                        shippingAddress: {
                            name: data.name,
                            address: fullAddress,
                            phone: data.phone
                        },
                        transactionId: paymentIntent.id,
                        status: 'Pending'
                    };
                    await axiosSecure.post('/orderedProducts', orderedProductsInfo);
                    router.push('/orders');
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
        }
    };
    // console.log(orderedProducts, totalAmount)

    useEffect(() => {
        const createPaymentIntent = async () => {
            const axiosSecure = await getAxiosSecure();
            axiosSecure.post('/create-payment-intent', { price: totalAmount })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
        createPaymentIntent();
    }, [totalAmount]);
    // console.log(clientSecret);

    const handleDeliveryStatus = (value: string) => {
        setDeliveryStatus(value);
    }

    return (
        <>
            <form className='mb-10 text-sm' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='phone' className='text-lg font-semibold block mb-2'>Contact</label>
                <input
                    id='phone'
                    className={`${iClass} ${errors.phone ? 'border-red-500' : ''} ${errors.phone ? 'focus:border-red-500' : 'focus:border-black'}`}
                    type='number'
                    {...register("phone", {
                        required: 'Enter your phone number!',
                        minLength: 11,
                        // pattern: {
                        //     value: /^\S+@\S+$/i,
                        //     message: 'Invalid email format.'
                        // }
                    }
                    )}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    placeholder='Phone'
                    autoComplete='phone'
                />
                {errors.phone && (
                    <p className='text-red-500 text-sm' role="alert">{errors.phone.message}</p>
                )}
                <div className='space-x-2 mt-4 mb-8'>
                    <Checkbox id="terms" className='rounded-sm border-gray-300' />
                    <Label htmlFor="terms" className='font-normal'>Email me with news and offers</Label>
                </div>

                {/* delivery method */}
                <h3 className='text-lg font-semibold mb-2'>Delivery</h3>
                <RadioGroup onValueChange={handleDeliveryStatus} defaultValue="ship" className='gap-0'>
                    <Label htmlFor="ship" className={`flex items-center space-x-2 px-[14px] py-[13px] border rounded-t-sm cursor-pointer ${deliveryStatus === 'ship' ? 'bg-[#1773B0]/5 border-[#1773B0]' : ''}`}>
                        <RadioGroupItem value="ship" id="ship" className={`${deliveryStatus === 'ship' ? 'border-none bg-[#1773B0]' : ''}`} />
                        <span className='flex flex-1 items-center justify-between space-x-2 font-normal'>
                            Ship <Truck size={18} className={`${deliveryStatus === 'ship' ? 'text-[#1773B0]' : ''}`} />
                        </span>
                    </Label>
                    <Label htmlFor="store" className={`flex items-center space-x-2 px-[14px] py-[13px] border rounded-b-sm cursor-pointer ${deliveryStatus === 'store' ? 'bg-[#1773B0]/5 border-[#1773B0]' : ''}`}>
                        <RadioGroupItem value="store" id="store" className={`${deliveryStatus === 'store' ? 'border-none bg-[#1773B0]' : ''}`} />
                        <span className='flex flex-1 items-center justify-between space-x-2 font-normal'>
                            Store <Store size={18} className={`${deliveryStatus === 'store' ? 'text-[#1773B0]' : ''}`} />
                        </span>
                    </Label>
                </RadioGroup>
                {
                    deliveryStatus !== 'ship' ? (<div className='mt-8'>
                        <h3 className='text-lg font-semibold mb-2'>Store location</h3>
                        <div className='flex items-center gap-3 rounded-sm px-[14px] py-[13px] text-sm border bg-red-600/5 border-red-600/20'>
                            <CircleAlert className='text-red-600/70' />
                            <p className='font-semibold'>Your items aren&apos;t available for store pickup</p>
                        </div>
                    </div>) : (<>
                        <div className='mt-8 space-y-3'>
                            <div>
                                <Select onValueChange={(value) => setValue('country', value, { shouldValidate: true })}>
                                    <SelectTrigger className={`w-full px-[14px] h-[46px] rounded-sm ${errors.country ? 'border-red-500' : ''} ${errors.country ? 'focus:border-red-500' : 'focus:border-black'}`}>
                                        <SelectValue placeholder="Country/Region" />
                                    </SelectTrigger>
                                    <SelectContent className='' {...register("country", { required: 'Select a country!' })}>
                                        {
                                            countries.map((country, idx) => <SelectItem key={idx} value={country}>{country}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                                {errors.country && (
                                    <p className='text-red-500 text-sm' role="alert">{errors.country.message}</p>
                                )}
                            </div>
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
                            <div className='flex flex-col md:flex-row items-start justify-between gap-3'>
                                <div className='flex-1 w-full'>
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
                                <div className='flex-1 w-full'>
                                    <Select onValueChange={(value) => setValue('state', value, { shouldValidate: true })}>
                                        <SelectTrigger className={`px-[14px] h-[42px] rounded-sm ${errors.state ? 'border-red-500' : ''} ${errors.state ? 'focus:border-red-500' : 'focus:border-black'}`}>
                                            <SelectValue placeholder="State" />
                                        </SelectTrigger>
                                        <SelectContent {...register("state", { required: 'Select a state!' })}>
                                            {
                                                states.map((state, idx) => <SelectItem key={idx} value={state}>{state}</SelectItem>)
                                            }
                                        </SelectContent>
                                    </Select>
                                    {errors.state && (
                                        <p className='text-red-500 text-sm' role="alert">{errors.state.message}</p>
                                    )}
                                </div>
                                <div className='flex-1 w-full'>
                                    <input
                                        id='zip'
                                        className={`${iClass} ${errors.zip ? 'border-red-500' : ''} ${errors.zip ? 'focus:border-red-500' : 'focus:border-black'}`}
                                        type='number'
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
                        {/* shipping method */}
                        <h3 className='text-lg font-semibold mb-2 mt-8'>Shipping method</h3>
                        <div className='flex items-center justify-between gap-2 rounded-sm px-[14px] py-[13px] text-sm border bg-[#1773B0]/5 border-[#1773B0] text-gray-500'>
                            <p>Free Shipping</p>
                            <p className='font-semibold'>FREE</p>
                        </div>
                    </>)
                }

                {/* payment method */}
                <h3 className='text-lg font-semibold mb-1 mt-8'>Payment</h3>
                <p className='text-sm text-gray-500 mb-2'>All transactions are secure and encrypted.</p>
                <CardElement
                    className='border rounded-sm px-[14px] py-[12px]'
                    options={{
                        style: {
                            base: {
                                fontSize: '14px',
                                fontFamily: 'Futura, sans-serif',
                                '::placeholder': {
                                    color: '#6B7280',
                                },
                            },
                            invalid: {
                                color: '#EF4444',
                            },
                        },
                    }}
                />
                <input className={`cursor-pointer w-full mt-8 py-[11px] rounded-sm bg-black hover:bg-gray-900 text-white ${isDisabled ? 'pointer-events-none bg-gray-500' : ''}`} type="submit" value='Pay Now' />
            </form>
            <div className='border-b' />
            <div className='space-x-4 my-4 text-sm text-[#1773B0] underline'>
                <Link href='/'>Refund policy</Link>
                <Link href='/'>Privacy policy</Link>
                <Link href='/'>Terms of service</Link>
                <Link href='/'>Contact information</Link>
            </div>
        </>
    );
};

export default CheckoutForm;