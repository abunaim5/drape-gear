'use client'
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DashboardNav from "@/components/DashboardNav/DashboardNav";
import { useSession } from "next-auth/react";

const Addresses = () => {
    const { data: session } = useSession();

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-384px)] my-8 lg:my-16'>
                <div className='flex flex-col md:flex-row gap-8'>
                    <DashboardNav />
                    <div className='mx-auto text-center'>
                        <button className='text-sm px-[15px] py-[11px] transition-all duration-500 bg-black text-white hover:bg-gray-800 hover:text-white'>
                            Add a New Address
                        </button>
                        <div className='text-center mt-12'>
                            <h5 className='mb-4 font-semibold'>Default</h5>
                            <p className='text-sm text-gray-500 mb-1'>{session?.user.name}</p>
                            <p className='text-sm text-gray-500'>United States</p>
                            <div className='flex items-center gap-4 mt-7'>
                                <button className='w-[90px] text-sm py-[11px] transition-all duration-500 bg-black text-white hover:bg-gray-800 hover:text-white'>
                                    Edit
                                </button>
                                <button className='w-[90px] text-sm py-[11px] border transition-all duration-500 bg-white text-black hover:border-black'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Addresses;