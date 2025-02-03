'use client'
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Collection from "@/components/Collection/Collection";

const Collections = () => {
    return (
        <>
            <Breadcrumb />
            <div className='container mb-20'>
                <Collection />
            </div>
        </>
    );
};

export default Collections;