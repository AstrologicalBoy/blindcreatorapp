import { FavoriteType } from "@/types/types"
import { useMutation } from "@tanstack/react-query";

const favoritesKey = "favorites"

const saveFavorites = (favorites: FavoriteType[]) => {
    const stringify = JSON.stringify(favorites);
    localStorage.setItem(favoritesKey, stringify);
}

const getFavorites = () : FavoriteType[] | null => {
    if (typeof window !== 'undefined') {
        const favorites = localStorage.getItem(favoritesKey);
        const parsedFavorites = favorites !== null ? JSON.parse(favorites) : null;
        return parsedFavorites;
    }
    return null;
}

const isInFavorites = (favorites: FavoriteType[], id_product: number) => {
    return favorites.filter((item) => item.id === id_product);
}

const getFavoritesListWithoutItem = (favorites : FavoriteType[], item_id: number) => {
    const newFavoriteList : FavoriteType[] = [];
    favorites.forEach((item) => {
        if(item.id !== item_id) {
            newFavoriteList.push(item);
        }
    });
    return newFavoriteList;
}

export { saveFavorites, getFavorites, isInFavorites, getFavoritesListWithoutItem };