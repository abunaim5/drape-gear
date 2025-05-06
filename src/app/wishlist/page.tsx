'use client';
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ProductCard from "@/components/ProductCard/ProductCard";
import { fetchWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProductType } from "@/types/types";
import Image from "next/image";
import { useEffect } from "react";

const Wishlist = () => {
    const { itemIds, wishlistItems } = useAppSelector((state) => state.wishlist);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchWishlist(itemIds))
    }, [dispatch, itemIds]);

    // if (loading) {
    //     return <p>Loading...</p>
    // }

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-260px)] content-center text-center'>
                {
                    wishlistItems.length ? (<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 my-8'>
                        {
                            wishlistItems.map((product: ProductType, idx: number) => <ProductCard key={idx} _id={product._id} name={product.name} image={product.image} old_price={product.old_price} sale_price={product.sale_price} availability={product.availability} category={product.category} collection={product.collection} description={product.description} createdAt={product.createdAt} />)
                        }
                    </div>) : (<div className='flex flex-col items-center justify-center gap-6 my-8'>
                        <Image width={150} height={150} alt='wishlist empty' src='/icons/wishlist-empty.png' />
                        <h3 className='text-3xl font-semibold'>Wishlist is empty.</h3>
                        <p className='text-sm text-gray-500'>You don&apos;t have any products in the wishlist yet. You will find a lot of interesting products on our &quot;Shop&quot; page.</p>
                    </div>)
                }
            </div>
        </>
    );
};

export default Wishlist;