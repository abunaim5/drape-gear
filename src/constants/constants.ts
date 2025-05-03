import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { BannerType, BlogType, CollectionType, FootContentType, SupportType } from "@/types/types";

const banners: BannerType = [
    {
        title: 'Fashion For Him',
        subtitle: 'New Arrival',
        img: '/images/banner-men.png'
    },
    {
        title: 'Fashion For Her',
        subtitle: 'New Arrival',
        img: '/images/banner-women.png'
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
        img: '/images/men.png',
        btnName: 'Men',
        path: '/products/men',
        colSpan: 2
    },
    {
        img: '/images/kids.png',
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

const blogs: BlogType[] = [
    {
        title: 'Spring – Summer Trending Collections This Year',
        img: '/images/blog-1.png',
        description: 'This spring, fashion merges the uniqueness of retro and modern styles, creating individualistic outfits, ...',
        date: 'January 27, 2025'
    },
    {
        title: 'The Easiest Way to Break Out on Top',
        img: '/images/blog-2.png',
        description: 'During this summer, accessories like hair bows and statement necklaces highlight cute and trendy styles, ...',
        date: 'January 27, 2025'
    },
    {
        title: 'Latest Swimsuit Model For Next Year',
        img: '/images/blog-3.png',
        description: 'Get ready to make a splash this summer with the hottest swimwear trends next year, ...',
        date: 'January 27, 2025'
    },
]

const supports: SupportType = [
    {
        title: 'Fast Delivery',
        description: 'Free shipping on all orders',
        img: '/icons/fast-delivery.png'
    },
    {
        title: 'Safe Payment',
        description: 'We ensure secure payment with stripe',
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

export { banners, collections, blogs, supports, footContents }