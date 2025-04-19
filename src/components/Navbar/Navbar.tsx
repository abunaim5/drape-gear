'use client';
import { IoSearchOutline } from 'react-icons/io5';
import NavLink from './NavLink';
import { navLinks } from './navLinks';
import Link from 'next/link';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { IoMdClose, IoMdHeartEmpty } from 'react-icons/io';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { VscMenu } from "react-icons/vsc";
import SideDrawer from '../SideDrawer/SideDrawer';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import DrawerCard from '../DrawerCard/DrawerCard';
import { fetchSearchProducts } from '@/lib/features/searchProducts/searchSlice';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react';
import { LayoutDashboard, LogOut, Settings, User, MapPinHouse } from "lucide-react"
import { fetchCartProducts } from '@/lib/features/cart/cartSlice';
import { usePathname, useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

const Navbar = () => {
  const { searchProducts } = useAppSelector((state) => state.searchProducts);
  const { cart } = useAppSelector((state) => state.cart);
  const itemIds = useAppSelector((state) => state.wishlist.itemIds);
  const [searchText, setSearchText] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const linkCls = 'px-4 py-[15px] border-b text-black hover:bg-[#F3F3F3] transition-all duration-[400ms]'

  const handleSearchDrawer = () => {
    setOpen(true);
  };

  const handleNavMenu = () => {
    setMenuOpen(true);
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target as HTMLInputElement;
    setSearchText(text.value);
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  useEffect(() => {
    dispatch(fetchSearchProducts({ searchText: searchText }));
    if (session?.user?.email) {
      dispatch(fetchCartProducts({ email: session.user.email }));
    }
  }, [dispatch, searchText, session?.user?.email]);

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
    <h1 className='shadow-md text-base px-4 py-[9px]'>Search results</h1>
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
      <SideDrawer title='Search' place='right' open={open} setOpen={setOpen} drawerElem={searchDrawerElem} />
      <div className='container flex items-center'>
        <div className='flex items-center gap-2 flex-1'>
          <button onClick={handleNavMenu} className='block lg:hidden'><VscMenu className='text-2xl' /></button>
          <Drawer direction='left' open={menuOpen} onOpenChange={() => setMenuOpen(!menuOpen)}>
            <DrawerContent className='max-h-[100vh] rounded-none w-full md:w-[340px]' aria-describedby="">
              <DrawerHeader className='border-b flex items-center justify-between'>
                <DrawerTitle className='text-base tracking-normal font-normal'>MENU</DrawerTitle>
                <DrawerClose>
                  <IoMdClose className='text-2xl' />
                </DrawerClose>
              </DrawerHeader>
              <div className='flex-1 flex flex-col text-sm text-gray-500'>
                {
                  navLinks.map((link, idx) => <Link key={idx} href={link.href} className={`${linkCls} ${pathname === link.href ? 'bg-[#F3F3F3]' : ''}`}>{link.label}</Link>)
                }
                <Link href='/wishlist' className={`flex items-center gap-[5px] ${linkCls} ${pathname === '/wishlist' ? 'bg-[#F3F3F3]' : ''}`}><IoMdHeartEmpty className='text-lg' /> <span>Wishlist</span></Link>
                {
                  session?.user ? (<Link href='/account' className={`flex items-center gap-[5px] ${linkCls} ${pathname === '/account' ? 'bg-[#F3F3F3]' : ''}`}><FiUser className='text-lg' /> <span>My account</span></Link>) : (<Link href='/login' className={`flex items-center gap-[5px] ${linkCls} ${pathname === '/login' ? 'text-black' : ''} ${pathname === '/login' ? 'bg-[#F3F3F3]' : ''}`}><FiUser className='text-lg' /> <span>Login / Register</span></Link>)
                }
                {
                  session?.user ? (<button onClick={() => { handleLogout(); setMenuOpen(!menuOpen) }} className={`flex items-center gap-[5px] ${linkCls}`}><FiLogOut className='text-lg' /> Logout</button>) : ('')
                }

              </div>
              {/* <DrawerFooter className='border-t mt-0'>
                <Link href='/products/all' className='flex items-center gap-2 hover:text-cyan-500'>
                  View all
                  <IoMdArrowForward />
                </Link>
              </DrawerFooter> */}
            </DrawerContent>
          </Drawer>
          <Link href='/' className='logo flex-1 text-2xl md:text-3xl font-semibold hidden lg:block'>
            drapegear.
          </Link>
        </div>
        <Link href='/' className='logo flex-1 text-2xl md:text-3xl text-center font-semibold lg:hidden'>
          drapegear.
        </Link>
        <div className='hidden lg:block'>
          <ul className='flex items-center justify-center gap-8'>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </div>
        <div className='flex items-center justify-end gap-2 md:gap-4 text-[22px] md:text-2xl flex-1'>
          <IoSearchOutline onClick={handleSearchDrawer} className='cursor-pointer transition-all duration-300 hover:text-cyan-500' />
          {
            session?.user ? (<DropdownMenu>
              <DropdownMenuTrigger>
                <FiUser className='hidden md:block cursor-pointer transition-all duration-300 hover:text-cyan-500' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56 rounded-none mt-[26px] text-gray-500'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/account')} className='cursor-pointer'>
                  <User />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/account')} className='cursor-pointer'>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/addresses')} className='cursor-pointer'>
                  <MapPinHouse />
                  <span>Addresses</span>
                  <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/addresses')} className='cursor-pointer'>
                  <Settings />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
                  <LogOut />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>) : (<Link href='/login'><FiUser className='hidden md:block cursor-pointer transition-all duration-300 hover:text-cyan-500' /></Link>)
          }
          <div className='relative hidden md:block cursor-pointer group'>
            <Link href='/wishlist'><IoMdHeartEmpty className='transition-all duration-300 group-hover:text-cyan-500' /></Link>
            <div className='absolute -top-1 -right-1.5 min-w-4 min-h-4 rounded-full flex items-center justify-center text-[10px] leading-none text-white bg-black'>{itemIds.length}</div>
          </div>
          <div className='relative cursor-pointer group'>
            <Link href='/cart'><PiShoppingCartSimple className='transition-all duration-300 group-hover:text-cyan-500' /></Link>
            <div className='absolute -top-1 -right-1.5 min-w-4 min-h-4 rounded-full flex items-center justify-center text-[10px] leading-none text-white bg-black'>{cart?.products.length}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;