'use client'
import { fetchSingleProduct } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { use, useEffect } from "react";

type ProductId = {
    params: Promise<{ id: string }>
}

const Product = ({ params }: ProductId) => {
    const { product } = useAppSelector((state) => state.products)
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
        <div className='container min-h-[calc(100vh-84px)] mb-20'>

        </div>
    )
};

export default Product;