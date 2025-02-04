'use client';
import { IoSearchOutline } from 'react-icons/io5';
import NavLink from './NavLink';
import { navLinks } from './navLinks';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import SideDrawer from '../SideDrawer/SideDrawer';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import DrawerCard from '../DrawerCard/DrawerCard';
import { fetchSearchProducts } from '@/lib/features/searchProducts/searchSlice';

const Navbar = () => {
  const { searchProducts } = useAppSelector((state) => state.searchProducts);
  const [searchText, setSearchText] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSearchDrawer = () => {
    setOpen(true)
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target as HTMLInputElement;
    setSearchText(text.value);
  };

  useEffect(() => {
    dispatch(fetchSearchProducts({ searchText: searchText }));
  }, [dispatch, searchText]);

  const searchDrawerElem = <>
    <label htmlFor='search' className='flex items-center gap-2 px-[14px] py-[10px] my-5 mx-4 group border focus-within:border-black'>
      <input
        id='search'
        name='search'
        className='rounded-none w-full text-sm focus:outline-none'
        placeholder="Search"
        autoComplete='search'
        onChange={handleSearch}
      />
      <IoSearchOutline className='text-lg' />
    </label>
    <h1 className='shadow-md text-base font-bold px-4 py-[9px]'>Search results</h1>
    <div className='max-h-[74.813vh] overflow-y-auto custom-scrollbar'>
      <div className={`flex items-center justify-center h-96 ${searchProducts?.length ? 'hidden' : ''}`}>
        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
        <p>Empty</p>
      </div>
      <div className='flex flex-col gap-6 mt-6'>
        {
          searchProducts?.map(product => <DrawerCard key={product._id} name={product.name} image={product.image} price={product.price} />)
        }
      </div>
    </div>
  </>


  return (
    <nav className='bg-transparent h-fit py-6'>
      <SideDrawer title='Search Products' place='right' open={open} setOpen={setOpen} drawerElem={searchDrawerElem} />
      <div className='container flex items-center'>
        <div className='flex items-center gap-2 flex-1'>
          <HiOutlineMenuAlt1 className='block lg:hidden text-3xl' />
          <div className='logo flex-1 text-2xl md:text-3xl font-semibold'>
            drapegear.
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
          <IoSearchOutline onClick={handleSearchDrawer} className='cursor-pointer transition-all duration-[400ms] hover:text-cyan-500' />
          <Link href='/login'><FiUser className='hidden md:block cursor-pointer transition-all duration-[400ms] hover:text-cyan-500' /></Link>
          <div className='relative hidden md:block cursor-pointer group'>
            <Link href='/wishlist'><IoMdHeartEmpty className='transition-all duration-[400ms] group-hover:text-cyan-500' /></Link>
            <div className='absolute -top-1 -right-1.5 min-w-4 min-h-4 rounded-full flex items-center justify-center text-[10px] leading-none text-white bg-black'>1</div>
          </div>
          <div className='relative cursor-pointer group'>
            <PiShoppingCartSimple className='transition-all duration-[400ms] group-hover:text-cyan-500' />
            <div className='absolute -top-1 -right-1.5 min-w-4 min-h-4 rounded-full flex items-center justify-center text-[10px] leading-none text-white bg-black'>1</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;