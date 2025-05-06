'use client';
import ProductCard from "@/components/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AvailabilityType, CategoryType, ProductType } from "@/types/types";
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
import { fetchCategories, fetchProductCount, fetchProducts } from "@/lib/features/products/productsSlice";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import SideDrawer from "@/components/SideDrawer/SideDrawer";
import { FaBoxOpen } from "react-icons/fa";

const Products = () => {
    const { queryProducts, productCount, categories, availabilityData } = useAppSelector((state) => state.products);
    const [sortPriceVal, setSortPriceVal] = useState<string>('default');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedAvailability, setSelectedAvailability] = useState<boolean[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const itemsPerPage: number = 10;
    const totalPages = Math.ceil(productCount / itemsPerPage);
    const dispatch = useAppDispatch();
    const location = usePathname();
    const collection = location.split('/')[2];

    const handleFilterDrawer = () => {
        setOpen(true);
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
        dispatch(fetchProducts({ currentPage, itemsPerPage, collection: collection, sortPriceVal, category: selectedCategory, availability: selectedAvailability }));
        if (!selectedCategory.length && !selectedAvailability.length) {
            dispatch(fetchProductCount({ collection: collection }));
            dispatch(fetchCategories({ collection: collection }));
        }
    }, [dispatch, currentPage, itemsPerPage, collection, selectedCategory, selectedAvailability, sortPriceVal]);

    if (!queryProducts.products.length) {
        return <div className='flex flex-col items-center justify-center gap-3 min-h-[calc(100vh-76px)] bg-gray-50'>
            <FaBoxOpen className='text-4xl text-gray-500' />
            <p>No products found in this collection.</p>
        </div>
    }

    const filterDrawerElem = <>
        <div className='px-4 py-5 border-b'>
            <h1 className='text-base'>Availability</h1>
            <div className='w-14 border-b-2 border-black mt-1' />
            <div className='flex flex-col gap-3 mt-5'>
                {
                    availabilityData.map((available: AvailabilityType, idx) => <div key={idx} className="items-top flex space-x-2">
                        <Checkbox
                            checked={selectedAvailability.includes(available.availability)}
                            onCheckedChange={(checked) => {
                                return checked ? setSelectedAvailability([...selectedAvailability, available.availability]) : setSelectedAvailability(selectedAvailability.filter(avail => avail !== available.availability))
                            }}
                            id={available.availability ? 'inStock' : 'outStock'}
                        />
                        <div className="leading-none">
                            <label
                                htmlFor={available.availability ? 'inStock' : 'outStock'}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {available?.availability ? 'In Stock' : 'Out Of Stock'} ({available?.totalAvailability})
                            </label>
                        </div>
                    </div>)
                }
            </div>
        </div>
        <div className='px-4 py-5 border-b'>
            <h1 className='text-base'>Categories</h1>
            <div className='w-14 border-b-2 border-black mt-1' />
            <div className='flex flex-col gap-3 mt-5'>
                {
                    categories?.map((category: CategoryType, idx) => <div key={idx} className="items-top flex space-x-2">
                        <Checkbox
                            checked={selectedCategory.includes(category.category)}
                            onCheckedChange={(checked) => {
                                return checked ? setSelectedCategory([...selectedCategory, category.category]) : setSelectedCategory(selectedCategory.filter(cat => cat !== category.category))
                            }}
                            id={category.category}
                        />
                        <div className="leading-none">
                            <label
                                htmlFor={category.category}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {category?.category?.charAt(0).toUpperCase() + category?.category?.slice(1)} ({category?.totalProducts})
                            </label>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </>

    return (
        <div className='mb-8 lg:mb-16' id={`${currentPage}`}>
            <Breadcrumb />
            <SideDrawer title='Filter' place='left' open={open} setOpen={setOpen} drawerElem={filterDrawerElem} />
            <div className='container my-8 lg:my-16'>
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
                        queryProducts.products.map((product: ProductType, idx) => <ProductCard key={idx} _id={product._id} name={product.name} image={product.image} old_price={product.old_price} sale_price={product.sale_price} availability={product.availability} category={product.category} collection={product.collection} description={product.description} createdAt={product.createdAt} />)
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