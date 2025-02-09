'use client';
import { ProductListType } from "@/types/types";
import ProductCard from "../ProductCard/ProductCard";
import SectionInfo from "../SectionInfo/SectionInfo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/features/products/productsSlice";

const NewArrivals = () => {
    const { products, loading } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts({ currentPage: 1, itemsPerPage: 5, collection: 'all', sortPriceVal: 'default' }));
    }, [dispatch]);

    if (loading) return <h1>Loading...</h1>;

    return (
        <section className='mt-12 md:mt-28'>
            <SectionInfo
                title='New Arrivals'
                description='Here’s some of our most popular products people are in love with.'
            />
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-12'>
                {
                    products.map((product: ProductListType, idx: number) => <ProductCard key={idx} _id={product._id} name={product.name} image={product.image} price={product.price} />)
                }
            </div>
        </section>
    );
};

export default NewArrivals;