type CartType = {
    id: number,
    name: string,
    image: string,
    price: number,
    quantity: number
}

type ContextType = {
    cart: CartType[],
    favorites: FavoriteType[],
    actualPage: number,
    showDrawer: boolean,
    setActualPage: React.Dispatch<React.SetStateAction<number>>,
    setCart: React.Dispatch<React.SetStateAction<CartType[]>>,
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteType[]>>,
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>,
}

type ProductType = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

type FavoriteType = {
    id: number
}

export type { CartType, ContextType, ProductType, FavoriteType }