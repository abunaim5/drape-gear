import { IoSearchOutline } from 'react-icons/io5';
import NavLink from './NavLink';
import { navLinks } from './navLinks';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';
import { PiShoppingCartSimple } from 'react-icons/pi';

const Navbar = () => {
  return (
    <nav className='bg-transparent h-fit py-8 border-b-[1px]'>
      <div className='container flex items-center'>
        <div className='flex items-center gap-2 flex-1'>
          <div className='logo flex-1 text-2xl md:text-3xl font-semibold'>
            drapeGear
          </div>
        </div>
        <div className='hidden lg:block'>
          <ul className='flex items-center justify-center gap-8'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </div>
        <div className='flex items-center justify-end gap-2 md:gap-4 text-[22px] md:text-2xl flex-1'>
          <IoSearchOutline className='cursor-pointer transition-all duration-300 hover:text-cyan-500' />
          <Link href='/login'><FiUser className='hidden md:block cursor-pointer transition-all duration-300 hover:text-cyan-500' /></Link>
          <div className='relative hidden md:block cursor-pointer group'>
            <IoMdHeartEmpty className='transition-all duration-300 group-hover:text-cyan-500' />
            <div className='absolute -top-1 -right-1.5 min-w-4 min-h-4 rounded-full flex items-center justify-center text-[10px] leading-none text-white bg-black'>1</div>
          </div>
          <div className='relative hidden md:block cursor-pointer group'>
            <PiShoppingCartSimple className='transition-all duration-300 group-hover:text-cyan-500' />
            <div className='absolute -top-1 -right-1.5 min-w-4 min-h-4 rounded-full flex items-center justify-center text-[10px] leading-none text-white bg-black'>1</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;