import { LayoutDashboard, MapPinHouse, ShoppingBag, Users } from 'lucide-react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { PiShoppingCartSimple } from 'react-icons/pi';
export const dashboardLinks = [
    { label: 'Dashboard', href: '/account', icon: LayoutDashboard },
    { label: 'Addresses', href: '/addresses', icon: MapPinHouse },
    { label: 'Users', href: '/users', icon: Users },
    { label: 'Orders', href: '/orders', icon: ShoppingBag },
    { label: 'Wishlist', href: '/wishlist', icon: IoMdHeartEmpty },
    { label: 'Cart', href: '/cart', icon: PiShoppingCartSimple },
];