'use client'
import { fetchSingleProduct } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { use, useEffect } from "react";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

type ProductId = {
    params: Promise<{ id: string }>
}

const Product = ({ params }: ProductId) => {
    const { product } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const { id } = use(params);

    useEffect(() => {
        dispatch(fetchSingleProduct(id))
    }, [dispatch, id]);

    if (!product) {
        return <div className='container'>
            Product Not found.
        </div>
    }

    return (
        <>
            <div className='mb-8 py-5 bg-[#F6F6F6]'>
                <div className='container flex items-center gap-1 text-sm'>
                    <Link className='hover:text-cyan-500' href='/'>Home</Link>
                    <MdArrowForwardIos />
                    <span className='text-gray-500'>{product.name}</span>
                </div>
            </div>
            <div className='container mb-20 mt-4'>
                <ProductDetails
                    _id={product._id}
                    name={product.name}
                    old_price={product.old_price}
                    sale_price={product.sale_price}
                    image={product.image}
                    category={product.category}
                    collection={product.collection}
                    createdAt={product.createdAt}
                    description={product.description}
                    availability={product.availability}
                />
            </div>
        </>
    )
};

export default Product;