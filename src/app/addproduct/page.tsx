'use client';
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DashboardNav from "@/components/DashboardNav/DashboardNav";
import { addProduct, fetchProductCount } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProductListType } from "@/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormInput {
    name: string;
    image: string;
    category: string;
    oldPrice: string;
    salePrice: string;
    collection: string;
    description: string;
    availability: string;
};

const AddProduct = () => {
    const iClass = `w-full rounded-none px-[14px] py-[10px] mt-2 border focus:outline-none`
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const { allProducts } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const newProduct: ProductListType = {
            name: data.name,
            image: data.image,
            category: data.category,
            collection: data.collection,
            description: data.description,
            createdAt: new Date(),
            old_price: parseFloat(data.oldPrice),
            sale_price: parseFloat(data.salePrice),
            availability: data.availability.trim().toLowerCase() === 'true',
        }
        await dispatch(addProduct(newProduct));
        if(allProducts.success){
            await dispatch(fetchProductCount({collection: 'all'}));
            toast.success('New product added to the list!');
        }
    };

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-412px)] mb-20'>
                <div className='flex flex-col md:flex-row gap-8 mt-16'>
                    <DashboardNav />

                    <form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='name'>Name <span className='text-red-500'>*</span></label>
                                <input
                                    id='name'
                                    className={`${iClass} ${errors.name ? 'border-red-500' : ''} ${errors.name ? 'focus:border-red-500' : 'focus:border-black'}`}
                                    type='text'
                                    {...register("name", { required: 'Please input product name!' })}
                                    aria-invalid={errors.name ? 'true' : 'false'}
                                    placeholder='name'
                                    autoComplete='name'
                                />
                                {errors.name && (
                                    <p className='text-red-500' role="alert">{errors.name.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='image'>Image URL <span className='text-red-500'>*</span></label>
                                <input
                                    id='image'
                                    className={`${iClass} ${errors.image ? 'border-red-500' : ''} ${errors.image ? 'focus:border-red-500' : 'focus:border-black'}`}
                                    type='url'
                                    {...register("image", { required: 'Please input image url!' })}
                                    aria-invalid={errors.image ? 'true' : 'false'}
                                    placeholder='https://'
                                    autoComplete='image'
                                />
                                {errors.image && (
                                    <p className='text-red-500' role="alert">{errors.image.message}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='category'>Category <span className='text-red-500'>*</span></label>
                                <input
                                    id='category'
                                    className={`${iClass} ${errors.category ? 'border-red-500' : ''} ${errors.category ? 'focus:border-red-500' : 'focus:border-black'}`}
                                    type='text'
                                    {...register("category", { required: 'Please input product category!' })}
                                    aria-invalid={errors.category ? 'true' : 'false'}
                                    placeholder='category'
                                    autoComplete='category'
                                />
                                {errors.category && (
                                    <p className='text-red-500' role="alert">{errors.category.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='collection'>Collection <span className='text-red-500'>*</span></label>
                                <input
                                    id='collection'
                                    className={`${iClass} ${errors.collection ? 'border-red-500' : ''} ${errors.collection ? 'focus:border-red-500' : 'focus:border-black'}`}
                                    type='text'
                                    {...register("collection", { required: 'Please input collection name!' })}
                                    aria-invalid={errors.collection ? 'true' : 'false'}
                                    placeholder='collection'
                                    autoComplete='collection'
                                />
                                {errors.collection && (
                                    <p className='text-red-500' role="alert">{errors.collection.message}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='oldPrice'>Old Price <span className='text-red-500'>*</span></label>
                                <input
                                    id='oldPrice'
                                    className={`${iClass} ${errors.oldPrice ? 'border-red-500' : ''} ${errors.oldPrice ? 'focus:border-red-500' : 'focus:border-black'}`}
                                    type='text'
                                    {...register("oldPrice", { required: 'Please input product previous price!' })}
                                    aria-invalid={errors.oldPrice ? 'true' : 'false'}
                                    placeholder='$00.00'
                                    autoComplete='oldPrice'
                                />
                                {errors.oldPrice && (
                                    <p className='text-red-500' role="alert">{errors.oldPrice.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='salePrice'>Sale Price <span className='text-red-500'>*</span></label>
                                <input
                                    id='salePrice'
                                    className={`${iClass} ${errors.salePrice ? 'border-red-500' : ''} ${errors.salePrice ? 'focus:border-red-500' : 'focus:border-black'}`}
                                    type='text'
                                    {...register("salePrice", { required: 'Please input product current price!' })}
                                    aria-invalid={errors.salePrice ? 'true' : 'false'}
                                    placeholder='$00.00'
                                    autoComplete='salePrice'
                                />
                                {errors.salePrice && (
                                    <p className='text-red-500' role="alert">{errors.salePrice.message}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='availability'>Availability <span className='text-red-500'>*</span></label>
                                <input
                                    id='availability'
                                    className={`${iClass} ${errors.availability ? 'border-red-500' : ''} ${errors.availability ? 'focus:border-red-500' : 'focus:border-black'}`}
                                    type='text'
                                    {...register("availability", { required: 'Please input product availability!' })}
                                    aria-invalid={errors.availability ? 'true' : 'false'}
                                    placeholder='true/false'
                                    autoComplete='availability'
                                />
                                {errors.availability && (
                                    <p className='text-red-500' role="alert">{errors.availability.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='description'>Description <span className='text-red-500'>*</span></label>
                                <input
                                    id='description'
                                    className={`${iClass} ${errors.description ? 'border-red-500' : ''} ${errors.description ? 'focus:border-red-500' : 'focus:border-black'}`}
                                    type='text'
                                    {...register("description", { required: 'Please input product description!' })}
                                    aria-invalid={errors.description ? 'true' : 'false'}
                                    placeholder='description'
                                    autoComplete='description'
                                />
                                {errors.description && (
                                    <p className='text-red-500' role="alert">{errors.description.message}</p>
                                )}
                            </div>
                        </div>

                        <input className='w-full cursor-pointer py-[10px] bg-black hover:bg-gray-900 text-white' type="submit" value='Submit' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;