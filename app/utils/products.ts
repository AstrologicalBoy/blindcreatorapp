import { ProductType } from "@/types/types";

export const getAllProducts = async () => {
    const query = await fetch("https://fakestoreapi.com/products");
    return query.json();
}

export const getProductById = async (id: string) : Promise<ProductType> => {
    const query = await fetch(`https://fakestoreapi.com/products/${id}`);
    return query.json();
}

export const getProductsByCategory = async (category: string) => {
    const query = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return query.json();
}
