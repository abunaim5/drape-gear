import { IconType } from "react-icons"

export type ProductType = {
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

export type ProductListType = {
    _id: string,
    name: string,
    image: string,
    price: number
};

export type BannerType = {
    title: string,
    subtitle: string,
    img: string
}[];

export type CollectionType = {
    img: string,
    btnName: string,
    path: string,
    colSpan: number
}[];

export type SupportType = {
    title: string,
    description: string,
    img: string
}[];

export type FootContentType = {
    name: string,
    cls: string,
    description?: string,
    routes: {
        name: string | IconType,
        link: string
    }[];
}[];