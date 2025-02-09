import { IconType } from "react-icons"

type BannerType = {
    title: string,
    subtitle: string,
    img: string
}[];

type ProductType = {
    _id: string,
    name: string,
    image: string,
    description: string,
    category: string,
    price: number,
    createdAt: string,
    availability: boolean,
    collection: string
}[];

type ProductListType = {
    _id: string,
    name: string,
    image: string,
    price: number
};

type CollectionType = {
    img: string,
    btnName: string,
    path: string,
    colSpan: number
}[];

type SupportType = {
    title: string,
    description: string,
    img: string
}[];

type FootContentType = {
    name: string,
    cls: string,
    description?: string,
    routes: {
        name: string | IconType,
        link: string
    }[];
}[];

export type { BannerType, ProductType, ProductListType, CollectionType, SupportType, FootContentType };