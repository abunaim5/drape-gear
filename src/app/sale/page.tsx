'use client'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Collection from '@/components/Collection/Collection';

const Sale = () => {
    return (
        <>
        <Breadcrumb />
        <div className='container my-8 lg:my-16'>
            <Collection />
        </div>
    </>
    );
};

export default Sale;