import { LayoutDashboard, MapPinHouse } from 'lucide-react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { PiShoppingCartSimple } from 'react-icons/pi';
export const dashboardLinks = [
    { label: 'Dashboard', href: '/account', icon: LayoutDashboard },
    { label: 'Addresses', href: '/addresses', icon: MapPinHouse },
    { label: 'Wishlist', href: '/wishlist', icon: IoMdHeartEmpty },
    { label: 'Cart', href: '/cart', icon: PiShoppingCartSimple },
];