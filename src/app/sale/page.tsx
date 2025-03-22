import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Collection from '@/components/Collection/Collection';
import React from 'react';

const Sale = () => {
    return (
        <>
        <Breadcrumb />
        <div className='container mb-20'>
            <Collection />
        </div>
    </>
    );
};

export default Sale;