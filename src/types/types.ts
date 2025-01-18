import { IconType } from "react-icons"

export type BannerType = {
    title: string,
    subtitle: string,
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