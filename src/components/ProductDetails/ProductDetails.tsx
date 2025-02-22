import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaTelegramPlane, FaTumblr } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { ProductType } from "@/types/types";
import { useState } from "react";

const ProductDetails = ({ name, image, price, description, availability, category, collection }: ProductType) => {
    const [count, setCount] = useState<number>(1);

    return (
        <div>
            <div className='flex flex-col md:flex-row gap-8'>
                <Image className='flex-1 border' alt={`${name} image`} src={image} width={400} height={500} />
                <div className='flex-1'>
                    <h3 className='font-semibold'>{name}</h3>
                    <div className='flex items-center gap-3 text-xl mt-2'>
                        <h5 className='text-gray-400 line-through'>&#2547;{price}</h5>
                        <h5 className='text-[#F85712]'>&#2547;{price}</h5>
                    </div>
                    <p className='text-sm my-5 text-gray-500'>{description}</p>
                    <div className='flex gap-3'>
                        <div className='flex items-center gap-6 max-w-max text-lg font-semibold px-4 py-[6px] rounded-full border border-black'>
                            <button onClick={() => setCount(count - 1)} className={`hover:text-cyan-500 ${count === 1 ? 'pointer-events-none' : ''}`}><Minus size={20} /></button>
                            <span>{count}</span>
                            <button onClick={() => setCount(count + 1)} className='hover:text-cyan-500'><Plus size={20} /></button>
                        </div>
                        <button className='px-9 py-[10px] bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-sm animate-bounce hidden lg:block'>ADD TO CART</button>
                        <button className='px-[10px] text-black rounded-full border border-black hover:border-cyan-500 hover:text-cyan-500 text-xl'><IoMdHeartEmpty /></button>
                    </div>
                    <button className='w-full py-[10px] mt-5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-sm animate-bounce lg:hidden'>ADD TO CART</button>
                    <div className='flex gap-5 text-sm font-semibold mt-10'>
                        <Link href='/'>Delivery & Return</Link>
                        <Link href='/'>Ask a Question</Link>
                    </div>
                    <div className='flex flex-col gap-2 text-sm mt-5'>
                        <p><span className='text-gray-500'>SKU:</span> FS-26</p>
                        <p><span className='text-gray-500'>Availability:</span> {availability === true ? 'In Stock' : 'Out of Stock'}</p>
                        <p><span className='text-gray-500'>Category:</span> {category}</p>
                        <p><span className='text-gray-500'>Tags:</span> {category}, {collection}</p>
                    </div>
                    <div className='flex items-center gap-5 text-lg mt-5'>
                        <Link href='/'><FaFacebookF /></Link>
                        <Link href='/'><FaXTwitter /></Link>
                        <Link href='/'><FaPinterestP /></Link>
                        <Link href='/'><FaTumblr /></Link>
                        <Link href='/'><FaTelegramPlane /></Link>
                        <Link href='/'><SiGmail /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;