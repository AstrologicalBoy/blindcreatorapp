import Login from "@/components/Login";
import RedirectToHome from "@/components/RedirectToHome";
import { cookies } from "next/headers";

export default async function Home() {

  const cookieStore = await cookies();
  const isLogged = cookieStore.get("login");  
  
  if(isLogged) {
    return (
      <RedirectToHome />
    )
  } else {
    return (
      <Login />
    )
  }
}
