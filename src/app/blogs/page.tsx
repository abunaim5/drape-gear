'use client'
import BlogCard from '@/components/BlogCard/BlogCard';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { blogs } from '@/constants/constants';
import { BlogType } from '@/types/types';

const Blogs = () => {
    return (
        <>
            <Breadcrumb />
            <div className='container mb-20'>
                <div className='flex items-center gap-5 mt-12'>
                    {
                        blogs.map((blog: BlogType, idx) => <BlogCard key={idx} blog={blog} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Blogs;