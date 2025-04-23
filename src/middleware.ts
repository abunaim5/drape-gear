import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
    const currentPath = req.nextUrl.pathname;

    if (!req.auth) {
        return NextResponse.redirect(
            new URL(`/login?next=${currentPath}`, req.url)
        );
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/account', '/addresses', '/allproducts', '/addproduct', '/cart', '/orders', '/payment', '/users', ]
};