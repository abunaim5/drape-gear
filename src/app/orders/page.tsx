'use client';
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DashboardNav from "@/components/DashboardNav/DashboardNav";
import { fetchOrders } from "@/lib/features/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import InvoiceModal from "@/components/InvoiceModal/InvoiceModal";
import { OrderedProductsInfoResponseType } from "@/types/types";

const Orders = () => {
    const { orders } = useAppSelector((state) => state.orders);
    const [selectedOrder, setSelectedOrder] = useState<OrderedProductsInfoResponseType | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (session?.user?.email) {
            dispatch(fetchOrders({ email: session.user.email }));
        }
    }, [dispatch, session?.user.email]);
    console.log(orders);


    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-412px)] mb-20'>
                <div className='flex flex-col md:flex-row gap-8 mt-16'>
                    <DashboardNav />
                    {/* <InvoiceModal order /> */}

                    <Accordion type='multiple' className='w-full'>
                        {orders.map((order, index) => (
                            <AccordionItem value={`order-${index}`} key={order._id}>
                                {
                                    selectedOrder !== null && <InvoiceModal order={selectedOrder} open={open} setOpen={setOpen} />
                                }
                                <AccordionTrigger className='flex justify-between text-sm font-medium px-4 py-3 bg-gray-100'>
                                    <div className='text-left'>
                                        <p className='text-md font-semibold'>Order #{index + 1}</p>
                                        <div className='flex flex-col md:flex-row md:items-center gap-2 text-xs text-muted-foreground'>
                                            <span>Txn: {order.transactionId}</span>
                                            <StatusBadge status={order.status} />
                                        </div>
                                    </div>
                                    <div className='text-right text-sm'>
                                        <p>Total: <span className='font-semibold'>${order.totalAmount}</span></p>
                                        <p className='text-xs text-muted-foreground'>{order.createdAt}</p>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className='px-4 pb-4'>
                                    <div className='text-sm mb-3 space-y-1'>
                                        <p><strong>Name:</strong> {order.user_name}</p>
                                        <p><strong>Email:</strong> {order.user_email}</p>
                                        <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                                        <p><strong>Address:</strong> {order.shippingAddress.address}</p>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Image</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {order.items.map((item, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>${item.priceAtPurchase}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                            className='rounded-md object-cover'
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    <div className='mt-4 flex justify-center md:justify-end gap-2'>
                                        <button onClick={() => { setSelectedOrder(order); setOpen(!open) }} className='px-4 py-2 text-sm border transition-all duration-500 bg-white text-black hover:border-black'>
                                            View Invoice
                                        </button>
                                        <button className='px-4 py-2 text-sm transition-all duration-500 bg-red-500 text-white hover:bg-red-600 hover:text-white'>
                                            Cancel Order
                                        </button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </>
    );
};

export default Orders;