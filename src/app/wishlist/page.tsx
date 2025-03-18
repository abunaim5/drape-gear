'use client';
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ProductCard from "@/components/ProductCard/ProductCard";
import { fetchWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProductType } from "@/types/types";
import { useEffect } from "react";

const Wishlist = () => {
    const { itemIds, wishlistItems, loading } = useAppSelector((state) => state.wishlist);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchWishlist(itemIds))
    }, [dispatch, itemIds]);

    console.log(wishlistItems);

    if(loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-268px)] mb-20'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-16'>
                    {
                        wishlistItems.map((product: ProductType, idx: number) => <ProductCard key={idx} _id={product._id} name={product.name} image={product.image} price={product.price} availability={product.availability} category={product.category} collection={product.collection} description={product.description} createdAt={product.createdAt} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Wishlist;