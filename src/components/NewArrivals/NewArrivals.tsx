'use client';

import { productListType } from "@/types/types";
import ProductCard from "../ProductCard/ProductCard";
import SectionInfo from "../SectionInfo/SectionInfo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/features/products/productsSlice";

const NewArrivals = () => {
    const { products } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts({currentPage: 1, itemsPerPage: 10, collection: 'all', sortPriceVal: 'default'}));
    }, [dispatch]);

    return (
        <div className='mb-10 mt-16'>
            <SectionInfo
                title='New Arrivals'
                description='Here’s some of our most popular products people are in love with.'
            />
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-12'>
                {
                    products.map((product: productListType, idx: number) => <ProductCard key={idx} name={product.name} image={product.image} price={product.price} />)
                }
            </div>
        </div>
    );
};

export default NewArrivals;