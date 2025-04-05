"use client"

import { logout } from "@/server/session";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { useAppContext } from "@/app/contexts/context";
import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const makeLogout = useMutation({ mutationFn: logout, onSuccess: () => router.push("/") });

  const [isClient, setIsClient] = useState(false);

  const { cart, setActualPage, showDrawer, setShowDrawer } = useAppContext();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="relative z-10 bg-lightScreenBg dark:bg-darkScreenBg shadow-md dark:shadow-darkKey2Bg/20 transition-all duration-300">
      <div className="flex flex-col gap-3 md:flex-row justify-between items-center p-4">
        <a
          href="/products"
          onClick={() => {
            setActualPage(1);
            setShowDrawer(false);
          }
          }
          className="font-bold text-3xl md:text-base text-lightTextColor1 dark:text-darkTextColor1">Blind Creator</a>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <Link onClick={() => setShowDrawer(false)} href="/products/favorites" className="text-center md:text-left md:mr-4 text-lightTextColor1 hover:text-black dark:text-darkKey2Shadow dark:hover:text-darkKey2Bg transition-colors duration-200">Favoritos</Link>
          {pathName === "/products/cart" ?

            <button className="text-center md:text-left md:mr-4 text-lightTextColor1 hover:text-black dark:text-darkKey2Shadow dark:hover:text-darkKey2Bg transition-colors duration-200">Mi carrito {isClient && cart.length > 0 && `(${cart.length})`}</button>
            :
            <button onClick={() => setShowDrawer(!showDrawer)} className="text-center md:text-left md:mr-4 text-lightTextColor1 hover:text-black dark:text-darkKey2Shadow dark:hover:text-darkKey2Bg transition-colors duration-200">Mi carrito {isClient && cart.length > 0 && `(${cart.length})`}</button>
          }
          <button onClick={() => makeLogout.mutate()} title="Cerrar sesión" className="font-bold px-4 py-2 mt-5 md:mt-0 text-red-600 hover:text-red-800 transition-colors duration-200 rounded-md"><LogOut /></button>
        </div>
      </div>
      <CartDrawer />
    </nav>
  )
}

export default Navbar