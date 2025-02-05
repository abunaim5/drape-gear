import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { BannerType, CollectionType, FootContentType, SupportType } from "@/types/types";

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

const collections: CollectionType = [
    {
        img: '/images/women.png',
        btnName: 'Women',
        path: '/products/women',
        colSpan: 2
    },
    {
        img: '/images/1.png',
        btnName: 'Men',
        path: '/products/men',
        colSpan: 2
    },
    {
        img: '/images/3.png',
        btnName: 'Kids',
        path: '/products/kids',
        colSpan: 2
    },
    {
        img: '/images/accessories.png',
        btnName: 'Accessories',
        path: '/products/accessories',
        colSpan: 3
    },
    {
        img: '/images/home-decor.png',
        btnName: 'Decor',
        path: '/products/decor',
        colSpan: 3
    },
];

const supports: SupportType = [
    {
        title: 'Fast Delivery',
        description: '70 Taka shipping on all orders',
        img: '/icons/fast-delivery.png'
    },
    {
        title: 'Safe Payment',
        description: 'We ensure cash on delivery',
        img: '/icons/payment.png'
    },
    {
        title: '24/7 Online Support',
        description: '24 hours a day, 7 days a week',
        img: '/icons/chat.png'
    },
    {
        title: 'Free Return',
        description: 'Simply return it within 7 days',
        img: '/icons/return.png'
    }
];


const footContents: FootContentType = [
    {
        name: 'Category',
        cls: 'flex-col',
        routes: [
            {
                name: 'Men',
                link: '/products/men'
            },
            {
                name: 'Women',
                link: '/products/women'
            },
            {
                name: 'Kids',
                link: '/products/kids'
            },
            {
                name: 'Accessories',
                link: '/products/accessories'
            },
            {
                name: 'Home Decor',
                link: '/products/decor'
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

export { banners, collections, supports, footContents }