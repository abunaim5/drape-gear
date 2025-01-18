import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { footContents } from "@/constants/constants";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='text-base lg:text-lg bg-[#F6F6F8]'>
            <div className='flex justify-between flex-col md:flex-row gap-2 px-4 xl:px-16 py-12 lg:py-20 xl:py-28'>
                {
                    footContents.map((content, idx) => <div key={idx} className='flex-1'>
                        <h1 className='text-xl lg:text-2xl mb-4'>{content.name}</h1>
                        <p className=''>{content.description}</p>
                        <div className={`flex gap-2 ${content.cls}`}>
                            {
                                content.routes.map((route, idx) => <Link key={idx} href='/' className={`text-gray-500 w-fit hover:text-[#00BADB] ${route.name === FaFacebookSquare ? 'mt-2 text-2xl lg:text-3xl' : route.name === FaInstagramSquare ? 'mt-2 text-2xl lg:text-3xl' : ''}`}>{typeof route.name === 'function' ? <route.name /> : route.name}</Link>)
                            }
                        </div>
                    </div>)
                }
            </div>
            <div className='flex items-center justify-between flex-col lg:flex-row gap-2 px-4 xl:px-16 py-4 bg-white'>
                <p className='text-center'>All Rights Reserved &copy; {currentYear} DrapeGear - Developed by <a href='https://hello-abu-naim.web.app' target='_blank' className='underline'>Abu Naim</a></p>
                <div className='flex items-center gap-5'>
                    <Link href='/'>Shop</Link>
                    <Link href='/'>About Us</Link>
                    <Link href='/'>Contact Us</Link>
                    <Link href='/'>Blog</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;