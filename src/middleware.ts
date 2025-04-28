import { NextResponse } from "next/server";
import { auth } from "./auth";

const roleProtectedRoutes: { path: string, role: string[] }[] = [
    { path: '/account', role: ['admin', 'user'] },
    { path: '/addresses', role: ['admin', 'user'] },
    { path: '/allproducts', role: ['admin'] },
    { path: '/addproduct', role: ['admin'] },
    { path: '/cart', role: ['user'] },
    { path: '/orders', role: ['admin', 'user'] },
    { path: '/payment', role: ['user'] },
    { path: '/users', role: ['admin'] }
];

export default auth((req) => {
    const currentPath = req.nextUrl.pathname;
    const session = req.auth;

    const protectedRoute = roleProtectedRoutes.find(route => currentPath === route.path);

    if (protectedRoute) {
        if (!session) {
            return NextResponse.redirect(
                new URL(`/login?next=${currentPath}`, req.url)
            );
        };

        const userRole = session?.user?.role;
        if (!protectedRoute.role.includes(userRole)) {
            return NextResponse.redirect(
                new URL('/unauthorized', req.url)
            )
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: roleProtectedRoutes.map(route => route.path)
};