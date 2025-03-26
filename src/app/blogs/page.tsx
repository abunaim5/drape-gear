'use client'
import BlogCard from '@/components/BlogCard/BlogCard';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

const Blogs = () => {
    return (
        <>
            <Breadcrumb />
            <div className='container mb-20'>
                <div className='flex items-center gap-5 mt-12'>
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>
            </div>
        </>
    );
};

export default Blogs;