import { IconType } from "react-icons"

export type footContentType = {
    name: string,
    cls: string,
    description?: string,
    routes: {
        name: string | IconType,
        link: string
    }[];
}[];