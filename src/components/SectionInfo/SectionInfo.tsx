'use client';

const SectionInfo = ({title, description}: {title: string, description: string}) => {
    return (
        <div className='text-center'>
            <h1 className='text-2xl md:text-4xl'>{title}</h1>
            <h5 className='text-sm md:text-base mt-2 text-gray-600'>{description}</h5>
        </div>
    );
};

export default SectionInfo;