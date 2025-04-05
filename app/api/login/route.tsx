import { cookies } from "next/headers";

export const POST = async (request: Request) => {
    const data = await request.json();
    const cookieStore = await cookies();
    if(data.email === "admin@admin.com" && data.password === "12345678") {
        cookieStore.set("login", "true");
        return new Response(JSON.stringify({ success: true }), {
            headers: {
                "Content-Type" : "application/json"
            }
        })
    } else {
        return new Response(JSON.stringify({ success: false }), {
            headers: {"Content-Type" : "application/json"}
        })
    }
}
