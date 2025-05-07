'use client'
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DashboardNav from "@/components/DashboardNav/DashboardNav";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PiTrashLight } from "react-icons/pi";
import { MdOutlineUpdate } from "react-icons/md";
import Image from "next/image";
import { fetchProductCount, removeProduct } from "@/lib/features/products/productsSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { ProductType } from "@/types/types";
import UpdateProductModal from "@/components/UpdateProductModal/UpdateProductModal";

const AllProducts = () => {
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const { allProducts } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    const handleRemoveProduct = async (id: string) => {
        await dispatch(removeProduct(id));
        if (allProducts.success) {
            await dispatch(fetchProductCount({ collection: 'all' }));
            toast.success('Item has been deleted.');
        }
    };

    const handleWarning = (id: string) => {
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col items-center justify-center gap-4 p-4 ring-1 ring-black ring-opacity-5`}>
                <div className='text-center'>
                    <p className="text-lg font-semibold text-gray-900">Are you sure?</p>
                    <p className="mt-1 text-sm text-gray-500">You won&apos;t be able to revert this!</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => {handleRemoveProduct(id); toast.dismiss(t.id)}}
                        className="max-w-fit text-sm transform transition-all duration-500 text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-sm"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="max-w-fit text-sm transform transition-all duration-500 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ))
    }

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-384px)] my-8 lg:my-16'>
                <div className='flex flex-col md:flex-row gap-8'>
                    <DashboardNav />
                    {
                        selectedProduct !== null && <UpdateProductModal product={selectedProduct} open={open} setOpen={setOpen} />
                    }
                    <Table className='border'>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">#</TableHead>
                                <TableHead className="w-[100px]">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Collection</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Availability</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className='text-right'>Manage</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allProducts?.products?.map((product, idx) => (
                                <TableRow key={product._id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>
                                        <Image width={50} height={50} src={product.image} alt={`${product.name} image`} />
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.collection}</TableCell>
                                    <TableCell>{new Date(product.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>{product.availability ? 'In stock' : 'Out of stock'}</TableCell>
                                    <TableCell>${product.sale_price}</TableCell>
                                    <TableCell className='text-right'>
                                        <button className={`text-center text-base px-5 py-2 transition-all duration-500 bg-black text-white hover:bg-gray-800 hover:text-green-500 $`} onClick={() => { setSelectedProduct(product); setOpen(!open) }}><MdOutlineUpdate /></button>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button className={`text-center text-base px-5 py-2 transition-all duration-500 bg-red-500 text-white hover:bg-red-600`} onClick={() => handleWarning(product._id)}><PiTrashLight /></button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default AllProducts;