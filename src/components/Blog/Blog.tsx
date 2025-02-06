import BlogCard from "../BlogCard/BlogCard";
import SectionInfo from "../SectionInfo/SectionInfo";

const Blog = () => {
    return (
        <section className='container mt-12 md:mt-28'>
            <SectionInfo title='Blog Post' description='The freshest and most exciting news about fashion trending.' />
            <div className='flex items-center gap-5 mt-12'>
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
        </section>
    );
};

export default Blog;