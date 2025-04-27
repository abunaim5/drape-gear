import { blogs } from "@/constants/constants";
import BlogCard from "../BlogCard/BlogCard";
import SectionInfo from "../SectionInfo/SectionInfo";

const Blog = () => {
    return (
        <section className='container mt-12 md:mt-28'>
            <SectionInfo title='Blog Post' description='The freshest and most exciting news about fashion trending.' />
            <div className='grid grid-flow-row md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12'>
                {
                    blogs.map((blog, idx) => <BlogCard key={idx} blog={blog} />)
                }
            </div>
        </section>
    );
};

export default Blog;