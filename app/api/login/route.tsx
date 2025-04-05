import { users } from "@/app/utils/fake_db";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
    const data = await request.json();
    const cookieStore = await cookies();
    if(data.email === users[0].email && data.password === users[0].password) {
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