import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { BannerType, FootContentType } from "@/types/types";

const banners: BannerType = [
    {
        title: 'Fashion For Her',
        subtitle: 'New Arrival',
        img: '/images/banner1.png'
    },
    {
        title: 'Fashion For Him',
        subtitle: 'New Arrival',
        img: '/images/banner2.png'
    },
];

const footContents: FootContentType = [
    {
        name: 'Category',
        cls: 'flex-col',
        routes: [
            {
                name: 'Men',
                link: '/'
            },
            {
                name: 'Women',
                link: '/'
            },
            {
                name: 'Kids',
                link: '/'
            },
            {
                name: 'Accessories',
                link: '/'
            },
            {
                name: 'Home Decor',
                link: '/'
            },
        ],
    },
    {
        name: 'Information',
        cls: 'flex-col',
        routes: [
            {
                name: 'Latest News',
                link: '/'
            },
            {
                name: 'My Account',
                link: '/'
            },
            {
                name: 'Size Guide',
                link: '/'
            },
            {
                name: 'FAQs',
                link: '/'
            },
        ],
    },
    {
        name: 'About',
        cls: 'flex-col',
        routes: [
            {
                name: 'About Us',
                link: '/'
            },
            {
                name: 'Contact Us',
                link: '/'
            },
            {
                name: 'Store Location',
                link: '/'
            },
            {
                name: 'Orders Tracking',
                link: '/'
            },
        ],
    },
    {
        name: 'Services',
        cls: 'flex-col',
        routes: [
            {
                name: 'Terms & Conditions',
                link: '/'
            },
            {
                name: 'Return & Exchanges',
                link: '/'
            },
            {
                name: 'Shipping & Delivery',
                link: '/'
            },
            {
                name: 'Privacy Policy',
                link: '/'
            },
        ],
    },
    {
        name: 'Follow Us',
        cls: 'flex-row',
        description: 'Feel free to connect with us on social media for latest updates.',
        routes: [
            {
                name: FaFacebookSquare,
                link: '/'
            },
            {
                name: FaInstagramSquare,
                link: '/'
            }
        ],
    },
];

export { banners, footContents }