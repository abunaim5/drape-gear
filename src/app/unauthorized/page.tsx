'use client';

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-76px)] text-center px-4 bg-gray-50">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-red-600">Unauthorized</h1>
            <p className="text-base md:text-lg text-gray-700">You do not have permission to access this page.</p>
        </div>
    );
};

export default Unauthorized;