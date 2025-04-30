import { BlogType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

type BlogPropType = {
    blog: BlogType
}

const BlogCard = ({ blog }: BlogPropType) => {
    return (
        <div className='max-w-[525px] group'>
            <div className='overflow-hidden'>
                <Image width={900} height={500} alt="blog image" src={blog.img} className='group-hover:scale-110 transform transition-transform ease-in-out duration-1000 cursor-pointer' />
            </div>
            <p className='text-sm text-gray-600 mt-4 mb-[10px]'>By <span className='text-black'>admin</span> on <span className='text-black'>{blog.date}</span></p>
            <Link href='/' className='text-lg transition-all duration-300 hover:text-cyan-500'>{blog.title}</Link>
            <p className='mt-2 text-gray-600'>{blog.description}</p>
        </div>
    );
};

export default BlogCard;