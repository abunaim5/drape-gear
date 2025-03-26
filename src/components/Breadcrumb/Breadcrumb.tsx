import { MdArrowForwardIos } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
    const location = usePathname();
    const path = location.split('/');
    let route = ''
    if (location === '/login' || location === '/register' || location === '/collections' || location === '/sale' || location === '/blogs' || location === '/cart' || location === '/account' || location === '/addresses' || location === '/users' || location === '/allproducts' || location === '/wishlist') {
        route = path[1].charAt(0).toUpperCase() + path[1].slice(1);
    } else {
        route = path[2].charAt(0).toUpperCase() + path[2].slice(1);
    }

    let currentRoute = ''
    if (route === 'All') {
        currentRoute = 'Products'
    } else {
        currentRoute = route;
    }

    return (
        <div style={{ backgroundImage: `url('/images/men.png')` }} className='text-white bg-no-repeat bg-cover bg-center'>
            <div className='w-full h-full flex flex-col items-center gap-2 justify-center py-8 2xl:py-16 bg-black/20'>
                <h1 className='text-xl'>{currentRoute}</h1>
                <div className='flex items-center gap-1 text-sm'>
                    <Link className='hover:text-gray-100' href='/'>Home</Link>
                    <MdArrowForwardIos />
                    <span>{currentRoute}</span>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;