'use client';
import ProductCard from "@/components/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { productListType } from "@/types/types";
import { CiFilter } from "react-icons/ci";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { fetchProducts } from "@/lib/features/products/productsSlice";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Products = () => {
    const { products } = useAppSelector((state) => state.products);
    const [sortPriceVal, setSortPriceVal] = useState('default');
    const dispatch = useAppDispatch();
    const location = usePathname();
    const collection = location.split('/')[2];
    console.log(collection);

    const handleFilterDrawer = () => {

    };

    // handle sorting by price
    const handleSortByPrice = (value: string) => {
        setSortPriceVal(value);
    };

    useEffect(() => {
        dispatch(fetchProducts({ sortPriceVal, collection }));
    }, [dispatch, sortPriceVal, collection]);

    return (
        <div className='mb-16'>
            <div className='container my-16'>
                <div className='flex gap-4 items-center justify-between'>
                    <div onClick={handleFilterDrawer} className='flex items-center gap-1 text-2xl hover:text-[#00BADB] cursor-pointer'>
                        <CiFilter />
                        <h4 className='text-lg'>Filter</h4>
                    </div>
                    <Select onValueChange={handleSortByPrice}>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Sort by price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="low">Low to High</SelectItem>
                            <SelectItem value="high">High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-12`}>
                    {
                        products.map((product: productListType, idx) => <ProductCard key={idx} name={product.name} image={product.image} price={product.price} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;