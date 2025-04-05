import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const middleware = async (request: NextRequest) => {
    const cookieStore = await cookies();
    const loginCookie = cookieStore.get("login");
    if(!loginCookie) {
        console.log("No existe la cookie")
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
}

export const config = {
    matcher: ["/products", "/products/:ProductId", "/cart", "/profile", "/favorites"]
}