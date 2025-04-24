import { Boxes, LayoutDashboard, MapPinHouse, PackagePlus, ShoppingBag, Users } from 'lucide-react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { PiShoppingCartSimple } from 'react-icons/pi';
const adminDashboardLinks = [
    { label: 'Dashboard', href: '/account', icon: LayoutDashboard },
    { label: 'Addresses', href: '/addresses', icon: MapPinHouse },
    { label: 'Add product', href: '/addproduct', icon: PackagePlus },
    { label: 'Users', href: '/users', icon: Users },
    { label: 'Products', href: '/allproducts', icon: Boxes },
    { label: 'Orders', href: '/orders', icon: ShoppingBag },
];

const userDashboardLinks = [
    { label: 'Dashboard', href: '/account', icon: LayoutDashboard },
    { label: 'Addresses', href: '/addresses', icon: MapPinHouse },
    { label: 'Orders', href: '/orders', icon: ShoppingBag },
    { label: 'Wishlist', href: '/wishlist', icon: IoMdHeartEmpty },
    { label: 'Cart', href: '/cart', icon: PiShoppingCartSimple },
];

export { adminDashboardLinks, userDashboardLinks }