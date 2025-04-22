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

const AllProducts = () => {
    const { allProducts } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    const handleRemoveProduct = (id: string) => {
        dispatch(removeProduct(id));
        if (allProducts.success) {
            dispatch(fetchProductCount({collection: 'all'}));
            toast.success('Item has been deleted.');
        }
    };

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-412px)] mb-20'>
                <div className='flex flex-col md:flex-row gap-8 mt-16'>
                    <DashboardNav />
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
                            {allProducts.products.map((product, idx) => (
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
                                        <button className={`text-center text-base px-5 py-2 transition-all duration-500 bg-black text-white hover:bg-gray-800 hover:text-green-500 $`}><MdOutlineUpdate /></button>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button className={`text-center text-base px-5 py-2 transition-all duration-500 bg-red-500 text-white hover:bg-red-600`} onClick={() => handleRemoveProduct(product._id)}><PiTrashLight /></button>
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