import { cookies } from "next/headers"

export const GET = async () => {
    const CookieStore = await cookies();
    CookieStore.delete("login");
    return new Response(JSON.stringify({ success: true }), {
        headers: {
            "Content-Type" : "application/json"
        }
    })
}