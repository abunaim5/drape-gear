'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { OrderedProductsInfoResponseType } from "@/types/types";
import generateInvoice from "@/lib/generateInvoice";

type InvoiceModalPropsType = {
    open: boolean;
    setOpen: (val: boolean) => void;
    order: OrderedProductsInfoResponseType;
}

const InvoiceModal = ({ open, setOpen, order }: InvoiceModalPropsType) => {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='max-w-2xl max-h-[80vh] sm:rounded-none overflow-y-auto' aria-describedby=''>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold text-center'>Invoice</DialogTitle>
                </DialogHeader>

                <div className='space-y-2 text-sm'>
                    <h3 className='text-2xl font-bold'>drapegear<span className='text-cyan-500 text-3xl'>.</span></h3>
                    <p><span className='font-semibold'>Date:</span> {order.createdAt}</p>
                    <p><span className='font-semibold'>Order ID:</span> {order._id}</p>
                    <p><span className='font-semibold'>Transaction ID:</span> {order.transactionId}</p>
                    <p><span className='font-semibold'>Name:</span> {order.user_name}</p>
                    <p><span className='font-semibold'>Email:</span> {order.user_email}</p>
                    <p><span className='font-semibold'>Phone:</span> {order.shippingAddress.phone}</p>
                    <p><span className='font-semibold'>Address:</span> {order.shippingAddress.address}</p>

                    <div className='mt-6'>
                        <h3 className='text-base font-semibold mb-2'>Items:</h3>
                        <div className='space-y-2'>
                            {order.items.map((item, idx) => (
                                <div key={idx} className='flex justify-between border-b pb-2'>
                                    <div>
                                        <p className='font-medium'>{item.name}</p>
                                        <p className='text-xs text-gray-500'>Qty: {item.quantity}</p>
                                    </div>
                                    <p className='font-semibold'>${item.priceAtPurchase * item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex justify-end mt-4 text-base font-semibold'>
                        <span>Total: ${order.totalAmount}</span>
                    </div>
                </div>

                <DialogFooter>
                    <button className='px-4 py-2 text-sm transition-all duration-500 bg-black text-white hover:bg-black/80 hover:text-white' onClick={() => generateInvoice(order)}>
                        Download PDF
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InvoiceModal;