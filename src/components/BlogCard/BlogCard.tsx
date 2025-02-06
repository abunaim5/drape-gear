import Image from "next/image";
import Link from "next/link";

const BlogCard = () => {
    return (
        <div className='max-w-[525px]'>
            <Image width={525} height={500} alt="blog image" src='/images/banner1.png' />
            <p className='text-sm text-gray-600 mt-4 mb-[10px]'>By <span className='text-black'>admin</span> on <span className='text-black'>January 27, 2025</span></p>
            <Link href='/' className='text-lg hover:text-cyan-500'>Spring – Summer Trending Collections This Year</Link>
            <p className='mt-2 text-gray-600'>This spring, fashion merges the uniqueness of retro and modern styles, creating individualistic outfits, ...</p>
        </div>
    );
};

export default BlogCard;