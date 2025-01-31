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
import { fetchProductCount, fetchProducts } from "@/lib/features/products/productsSlice";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

const Products = () => {
    const { products, productCount } = useAppSelector((state) => state.products);
    const [sortPriceVal, setSortPriceVal] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(productCount / itemsPerPage);
    const dispatch = useAppDispatch();
    const location = usePathname();
    const collection = location.split('/')[2];
    // console.log(products, productCount);

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
        dispatch(fetchProducts({ currentPage, itemsPerPage, collection: collection, sortPriceVal }));
        dispatch(fetchProductCount({collection: collection}));
    }, [dispatch, currentPage, itemsPerPage, collection, sortPriceVal]);

    return (
        <div className='mb-16' id={`${currentPage}`}>
            <Breadcrumb />
            <div className='container my-16'>
                <div className='flex gap-4 items-center justify-between'>
                    <div onClick={handleFilterDrawer} className='flex items-center gap-[2px] text-xl hover:text-[#00BADB] cursor-pointer'>
                        <CiFilter />
                        <h4 className='text-base'>Filter</h4>
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
            <Pagination className={!productCount ? 'hidden' : undefined}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={`#${currentPage}`}
                            className={`rounded-none ${currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}`}
                            onClick={() => handlePageAndItemsPerPage(currentPage - 1)}
                        />
                    </PaginationItem>
                    {
                        [...Array(totalPages).keys()].map(page => <PaginationItem key={page + 1}>
                            <PaginationLink
                                className={`rounded-none ${currentPage === page + 1 ? 'pointer-events-none opacity-50' : undefined}`}
                                isActive={currentPage === page + 1}
                                href={`#${currentPage}`}
                                onClick={() => currentPage < page + 1 ? handlePageAndItemsPerPage(currentPage + 1) : handlePageAndItemsPerPage(currentPage - 1)}
                            >{page + 1}</PaginationLink>
                        </PaginationItem>)
                    }
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href={`#${currentPage}`}
                            className={`rounded-none ${currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}`}
                            onClick={() => handlePageAndItemsPerPage(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default Products;