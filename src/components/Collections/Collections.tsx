'use client';
import { collections } from "@/constants/constants";
import Link from "next/link";

const Collections = () => {
    return (
        <div className='min-h-screen grid grid-cols-6 grid-rows-1 md:grid-rows-2 gap-4 mt-16'>
            {
                collections.map((collection, idx) => {
                    let colSpanClass = '';
                    switch (collection.colSpan) {
                        case 2:
                            colSpanClass = 'md:col-span-2';
                            break;
                        case 3:
                            colSpanClass = 'md:col-span-3'
                            break;
                        default:
                            colSpanClass = 'md:col-span-1'
                    }
                    return (
                        <Link href={collection.path} key={idx} className={`relative col-span-6 ${colSpanClass} overflow-hidden group`}>
                            <div className='h-[50vh] lg:h-[85vh] bg-no-repeat bg-top bg-cover group-hover:scale-110 transform transition-transform ease-in-out duration-1000' style={{ backgroundImage: `url(${collection.img})` }} />

                            <button className='absolute bottom-8 z-10 left-1/2 transform -translate-x-1/2 right-0 w-[119px] md:w-[145px] lg:w-[190px] text-sm md:text-base py-2 md:py-3 lg:py-4 transition-all duration-500 bg-white text-black hover:bg-black hover:text-white'>
                                {collection.btnName}
                            </button>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default Collections;