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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { fetchProducts } from "@/lib/features/products/productsSlice";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Products = () => {
    const { products, productCount } = useAppSelector((state) => state.products);
    const [sortPriceVal, setSortPriceVal] = useState('default');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(productCount / itemsPerPage);
    const dispatch = useAppDispatch();
    const location = usePathname();
    const collection = location.split('/')[2];
    console.log(currentPage)
    const handleFilterDrawer = () => {

    };

    // handle pagination
    const handlePageAndItemsPerPage = (page: number) => {
        setCurrentPage(page);
        // setItemsPerPage(pageSize);
    };

    // handle sorting by price
    const handleSortByPrice = (value: string) => {
        setSortPriceVal(value);
    };

    useEffect(() => {
        dispatch(fetchProducts({ itemsPerPage, collection, sortPriceVal }));
    }, [dispatch, itemsPerPage, collection, sortPriceVal]);

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
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                            onClick={() => handlePageAndItemsPerPage(currentPage - 1)}
                        />
                    </PaginationItem>
                    {
                        [...Array(totalPages).keys()].map(page => <PaginationItem
                            className={currentPage === page + 1 ? 'pointer-events-none opacity-50' : undefined}
                            key={page + 1}
                            onClick={() => currentPage !== page - 1 ? handlePageAndItemsPerPage(currentPage + 1) : handlePageAndItemsPerPage(currentPage - 1)}
                        >
                            <PaginationLink isActive={currentPage === page + 1} href="#">{page + 1}</PaginationLink>
                        </PaginationItem>)
                    }
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                            onClick={() => handlePageAndItemsPerPage(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default Products;