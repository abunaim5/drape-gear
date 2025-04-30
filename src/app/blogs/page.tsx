'use client'
import BlogCard from '@/components/BlogCard/BlogCard';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { blogs } from '@/constants/constants';
import { BlogType } from '@/types/types';

const Blogs = () => {
    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-324px)] '>
                <div className='grid grid-flow-row md:grid-cols-2 xl:grid-cols-3 gap-4 my-8 lg:my-16'>
                    {
                        blogs.map((blog: BlogType, idx) => <BlogCard key={idx} blog={blog} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Blogs;