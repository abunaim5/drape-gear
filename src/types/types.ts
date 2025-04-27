import { IconType } from "react-icons"

type BannerType = {
    title: string;
    subtitle: string;
    img: string
}[];

type ProductType = {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: string;
    old_price: number;
    sale_price: number;
    createdAt: string;
    availability: boolean;
    collection: string
};

type ProductResponseType = {
    success: boolean;
    products: ProductType[];
};

type ProductListType = {
    name: string;
    image: string;
    description: string;
    category: string;
    old_price: number;
    sale_price: number;
    createdAt: Date;
    availability: boolean;
    collection: string;
};

type CategoryType = {
    category: string;
    totalProducts: number;
};

type AvailabilityType = {
    availability: boolean;
    totalAvailability: number;
};

type CartProductType = {
    _id: string;
    productId: string;
    email: string;
    name: string;
    image: string;
    old_price: number;
    sale_price: number;
    availability: boolean;
    quantity: number
}[];

type CartProductResponseType = {
    success: boolean;
    products: CartProductType
}

type CartProductListType = {
    productId: string;
    email: string;
    name: string;
    image: string;
    old_price: number;
    sale_price: number;
    availability: boolean;
    quantity: number
};

type OrderedProductsInfoType = {
    user_name: string;
    user_email: string;
    items: OrderedProductsType[];
    totalAmount: number;
    createdAt: string;
    shippingAddress: {
        name: string,
        address: string,
        phone: number
    };
    transactionId: string
    status: string;
};

type OrderedProductsInfoResponseType = {
    _id: string;
    user_name: string;
    user_email: string;
    items: OrderedProductsType[];
    totalAmount: number;
    createdAt: string;
    shippingAddress: {
        name: string,
        address: string,
        phone: number
    };
    transactionId: string;
    status: string
}

type OrderedProductsType = {
    productId: string;
    name: string;
    image: string;
    quantity: number;
    priceAtPurchase: number
};

type CollectionType = {
    img: string;
    btnName: string;
    path: string;
    colSpan: number
}[];

type BlogType = {
    title: string;
    description: string;
    img: string;
    date: string;
}

type SupportType = {
    title: string;
    description: string;
    img: string
}[];

type FootContentType = {
    name: string;
    cls: string;
    description?: string;
    routes: {
        name: string | IconType,
        link: string
    }[];
}[];

export type { BannerType,ProductType, ProductListType, ProductResponseType, CategoryType, AvailabilityType, CartProductType, CartProductResponseType, CartProductListType, OrderedProductsInfoType, OrderedProductsInfoResponseType, OrderedProductsType, CollectionType, BlogType, SupportType, FootContentType };