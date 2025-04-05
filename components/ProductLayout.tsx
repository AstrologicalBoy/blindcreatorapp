"use client"

import { getProductById, getProductsByCategory } from "@/app/utils/products"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAppContext } from "@/app/contexts/context"
import { CartType } from "@/types/types"
import { ProductType } from "@/types/types"
import { decreaseQuantity, getCartWithoutItem, getCart, getIndexOfItem, increaseQuantity, saveCart, isInCart } from "@/app/utils/cart"
import { getFavoritesListWithoutItem, isInFavorites, saveFavorites } from "@/app/utils/favorites"
import { Heart, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { GridLoader } from "react-spinners"

// Component
const ProductLayout = ({ productId }: { productId: string }) => {
    const { cart, favorites, showDrawer, setShowDrawer, setCart, setFavorites } = useAppContext();

    useEffect(() => {
        setShowDrawer(false);
    }, [])

    useEffect(() => {
        saveCart(cart);
    }, [cart])

    useEffect(() => {
        saveFavorites(favorites);
    }, [favorites])

    // Router
    const router = useRouter();

    // Tanstack

    // Queries
    const { data: product, isLoading: loadingProduct, isError: errorLoadingProduct, error: productError, isRefetching: productRefetching } = useQuery({ queryKey: ["get-product"], queryFn: async () => getProductById(productId) });
    const { data: relatedProducts, isLoading: loadingRelatedProducts, isError: errorLoadingRelatedProducts, error: relatedProductsError } = useQuery({
        queryKey: ["get-related-products"],
        queryFn: () => product && getProductsByCategory(product.category),
        enabled: !!product
    })

    // Mutations

    // Carrito de compras ----------------------------------------------
    // Agregar elemento al carrito
    const { mutate: addNewProduct } = useMutation({
        mutationFn: async (product: CartType) => {
            setCart([...cart, product]);
            setShowDrawer(true);
        }
    })

    // Aumentar cantidad de un elemento en el carrito
    const { mutate: increaseProduct } = useMutation({
        mutationFn: async (id: number) => {
            setCart(increaseQuantity(cart, id));
            saveCart(cart);
        }
    })

    // Disminuir cantidad de un elemento en el carrito
    const { mutate: decreaseProduct } = useMutation({
        mutationFn: async (id: number) => {
            setCart(decreaseQuantity(cart, id));
            saveCart(cart);
        }
    })

    // Eliminar elemento del carrito
    const { mutate: deleteProduct } = useMutation({
        mutationFn: async (id: number) => {
            setCart(getCartWithoutItem(cart, id));
            saveCart(cart);
        }
    })

    // Eliminar todo del carrito
    const { mutate: cleanCart } = useMutation({
        mutationFn: async (id: number) => {
            setCart([]);
            console.log(cart);
        }
    })

    // Favoritos ----------------------------------------------------------
    const { mutate: addProductToFavorites } = useMutation({
        mutationFn: async (id: number) => {
            setFavorites([...favorites, { id }]);
        }
    })

    const { mutate: deleteFromFavorites } = useMutation({
        mutationFn: async (id: number) => {
            setFavorites(getFavoritesListWithoutItem(favorites, id));
            saveFavorites(favorites);
        }
    })

    return (
        <>

            {loadingProduct || productRefetching &&
                <div className="h-screen flex justify-center items-center">
                    <GridLoader color={'#bc15f4'} />
                </div>
            }

            {product && !productRefetching &&
                <div className="dark:bg-darkMainBg p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 items-center w-5/6 md:w-3/5 mx-auto">
                        <img className="md:w-full mx-auto min-w-[200px]" src={product.image} />

                        <div className="relative flex flex-col justify-center items-start py-10">
                            <h1 className="text-center md:text-left text-4xl dark:text-darkTextColor1 mb-5">{product.title}</h1>
                            <p className="text-center md:text-left dark:text-darkTextColor3 mb-5">{product.description}</p>
                            <p className="w-full text-center md:text-left dark:text-darkTextColor3 mb-5"><b className="dark:text-darkTextColor1">Category:</b> <span className="capitalize">{product.category}</span></p>

                            {/* Botones referentes al carrito de compra */}
                            {(isInCart(cart, product.id)).length === 0 ?
                                <button onClick={() => addNewProduct({
                                    id: product.id,
                                    name: product.title,
                                    image: product.image,
                                    price: product.price,
                                    quantity: 1,
                                })}
                                    className="font-semibold flex gap-3 items-center w-full md:w-auto text-center md:text-left bg-lightKey2Bg text-white hover:bg-lightKey2Shadow dark:bg-darkKey1Shadow dark:hover:bg-darkKey1Bg px-4 py-2 rounded-sm transition-colors duration-200"
                                >
                                    <ShoppingCart /> Agregar al carrito
                                </button>
                                :
                                <div className="flex gap-3 justify-center md:justify-start items-center w-full md:w-auto">
                                    <div className="flex justify-center items-center gap-5 w-auto border border-lightKey1Bg rounded-sm py-1 px-3">
                                        {cart[getIndexOfItem(cart, product.id)].quantity > 1 && <button className="dark:text-white" title="Restar una unidad" onClick={() => decreaseProduct(product.id)}><Minus /></button>}
                                        {cart[getIndexOfItem(cart, product.id)].quantity === 1 && <button className="dark:text-white" title="Eliminar del carrito" onClick={() => deleteProduct(product.id)}><Trash2 /></button>}

                                        <div className="flex items-center justify-center h-8 w-8 text-center bg-lightKey1Bg text-white rounded-md">
                                            <span className="">
                                                {cart[getIndexOfItem(cart, product.id)].quantity}
                                            </span>
                                        </div>

                                        <button className="dark:text-white" title="Agregar una unidad" onClick={() => increaseProduct(product.id)}><Plus /></button>
                                    </div>
                                    <p className="dark:text-darkKey2Bg">Unidad/es en el carrito</p>
                                </div>
                            }

                            {/* Agregar o eliminar de mis favoritos */}
                            {isInFavorites(favorites, product.id).length > 0 && <button className="absolute top-2 right-2 text-red-600" title="Eliminar de favoritos" onClick={() => deleteFromFavorites(product.id)}>
                                <Heart />
                            </button>
                            }
                            {isInFavorites(favorites, product.id).length === 0 && <button className="absolute top-2 right-2 text-gray-300" title="Agregar a favoritos" onClick={() => addProductToFavorites(product.id)}>
                                <Heart />
                            </button>
                            }

                        </div>
                    </div>

                    <h3 className="text-center text-4xl dark:text-darkTextColor1 mt-10 mb-5">Related products</h3>

                    {loadingRelatedProducts &&
                        <div className="h-screen flex justify-center items-center">
                            <GridLoader color={'#bc15f4'} />
                        </div>
                    }

                    {relatedProducts &&
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {relatedProducts.map((relatedProduct: ProductType) => {
                                if (product.id !== relatedProduct.id) {
                                    return (
                                        <div key={`related/${relatedProduct.id}`} className="relative bg-gray-50 dark:bg-darkKeypadBg px-5 py-10 rounded-md shadow-md flex flex-col justify-center items-center">
                                            <Link prefetch href={`/products/${relatedProduct.id}`}>
                                                <div>
                                                    <img src={relatedProduct.image} alt={`${relatedProduct.id}-image`} className="h-[200px] mx-auto mb-4" />
                                                </div>
                                                <p className="text-center dark:text-white font-bold line-clamp-1" title={relatedProduct.title}>{relatedProduct.title}</p>
                                                <p className="text-center dark:text-white text-sm">$<span className="text-xl">{relatedProduct.price}</span></p>
                                            </Link>
                                            {isInFavorites(favorites, relatedProduct.id).length > 0 && <button className="absolute top-2 right-2 text-red-600" onClick={() => deleteFromFavorites(relatedProduct.id)}>
                                                <Heart />
                                            </button>
                                            }
                                            {isInFavorites(favorites, relatedProduct.id).length === 0 && <button className="absolute top-2 right-2 text-gray-300" onClick={() => addProductToFavorites(relatedProduct.id)}>
                                                <Heart />
                                            </button>
                                            }

                                        </div>
                                    )
                                }
                            })}
                        </div>
                    }
                    
                </div>
            }

            {errorLoadingProduct &&
                <p className="text-3xl text-center">Parece que ha ocurrido un error</p>
            }
        </>
    )
}

export default ProductLayout