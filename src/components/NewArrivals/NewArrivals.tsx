'use client';
import { ProductType } from "@/types/types";
import ProductCard from "../ProductCard/ProductCard";
import SectionInfo from "../SectionInfo/SectionInfo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/features/products/productsSlice";

const NewArrivals = () => {
    const { queryProducts } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts({ currentPage: 1, itemsPerPage: 5, collection: 'all', sortPriceVal: 'default' }));
    }, [dispatch]);

    // if (loading) return <h1>Loading...</h1>;

    return (
        <section className='mt-12 md:mt-28'>
            <SectionInfo
                title='New Arrivals'
                description='Here’s some of our most popular products people are in love with.'
            />
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-4 mt-12'>
                {
                    queryProducts.products.map((product: ProductType, idx: number) => <ProductCard key={idx} _id={product._id} name={product.name} image={product.image} old_price={product.old_price} sale_price={product.sale_price} availability={product.availability} category={product.category} collection={product.collection} description={product.description} createdAt={product.createdAt} />)
                }
            </div>
        </section>
    );
};

export default NewArrivals;