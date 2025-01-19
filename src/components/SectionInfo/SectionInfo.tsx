
const SectionInfo = ({title, description}: {title: string, description: string}) => {
    return (
        <div className='text-center'>
            <h1 className='text-4xl'>{title}</h1>
            <h5 className="text-base mt-2">{description}</h5>
        </div>
    );
};

export default SectionInfo;