"use client"

import { CartType, ContextType, FavoriteType } from "@/types/types";
import { useContext } from "react";
import { createContext, useState } from "react";
import { getCart } from "../utils/cart";
import { getFavorites } from "../utils/favorites";

const appContext = createContext<ContextType>({
    cart: [],
    favorites: [],
    actualPage: 1,
    showDrawer: false,
    setActualPage: () => {},
    setCart: () => {},
    setFavorites: () => {},
    setShowDrawer: () => {}
});

export const AppWrapper = ({ children } : { children: React.ReactNode }) => {

    const [cart, setCart] = useState<CartType[]>(getCart() ?? []);
    const [actualPage, setActualPage] = useState<number>(1);
    const [favorites, setFavorites] = useState<FavoriteType[]>(getFavorites() ?? []);
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <appContext.Provider value={{
            cart,
            favorites,
            actualPage,
            showDrawer,
            setCart,
            setFavorites,
            setActualPage,
            setShowDrawer
        }}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = () : ContextType => {
    return useContext(appContext);
}