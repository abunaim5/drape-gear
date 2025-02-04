'use client'
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useAppSelector } from "@/lib/hooks";

const Wishlist = () => {
    const wishlistItems = useAppSelector((state) => state.wishlist.items);
    console.log(wishlistItems);

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-268px)]'>
                <h1>This is Wishlist page</h1>
            </div>
        </>
    );
};

export default Wishlist;