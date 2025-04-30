'use client'
import { fetchSingleProduct } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { use, useEffect } from "react";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";

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
        return <div className='flex flex-col items-center justify-center gap-3 min-h-[calc(100vh-76px)] bg-gray-50'>
            <FaBoxOpen className='text-4xl text-gray-500' />
            <p>Product Not found.</p>
        </div>
    }

    return (
        <>
            <div className='py-5 bg-[#F6F6F6]'>
                <div className='container flex items-center gap-1 text-sm'>
                    <Link className='hover:text-cyan-500' href='/'>Home</Link>
                    <MdArrowForwardIos />
                    <span className='text-gray-500'>{product.name}</span>
                </div>
            </div>
            <div className='container min-h-[calc(100vh-130px)] my-8 lg:my-16'>
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