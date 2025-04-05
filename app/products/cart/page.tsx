"use client"

import { useEffect } from "react";
import { useAppContext } from "@/app/contexts/context";
import { decreaseQuantity, getCartWithoutItem, getIndexOfItem, increaseQuantity, saveCart } from "@/app/utils/cart";
import { getFavoritesListWithoutItem, isInFavorites, saveFavorites } from "@/app/utils/favorites";
import Link from "next/link";
import IsClient from "@/components/IsClient";
import { useMutation } from "@tanstack/react-query";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

const Page = () => {

  const { cart, favorites, setCart, setFavorites } = useAppContext();

  useEffect(() => {
    saveCart(cart);
  }, [cart])

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites])

  // Carrito de compras ----------------------------------------------
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

  let subTotal = 0;

  cart.forEach((item) => {
    subTotal = subTotal + (item.price * item.quantity);
  })

  return (
    <>
      <div className="dark:bg-darkMainBg min-h-[100dvh] py-12 px-5">
        <h1 className="text-center text-4xl dark:text-darkTextColor1 mb-5">Carrito de compras</h1>
        <IsClient>
          {cart.length > 0 && cart.map((product) => (
            <div key={product.id} className={`relative dark:bg-darkKeypadBg p-5 rounded-md shadow-md flex flex-col md:flex-row gap-5 justify-center items-center mb-5`}>
              <Image className="h-[200px] w-auto" src={product.image} alt="product-image" width={200} height={300} />
              <div>
                <Link prefetch href={`/products/${product.id}`}>
                  <h2 className="dark:text-white font-bold line-clamp-1">{product.name}</h2>
                  <p className="text-center md:text-left mt-5 text-sm dark:text-darkTextColor1">$<span className="text-lg">{product.price}</span></p>
                </Link>
                <div className="flex justify-center md:justify-start items-center gap-5 mt-5">
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
                </div>
              </div>

              {isInFavorites(favorites, product.id).length > 0 && <button className="absolute top-2 right-2 text-red-600" onClick={() => deleteFromFavorites(product.id)}>
                  <Heart />
                </button>
              }
              {isInFavorites(favorites, product.id).length === 0 && <button className="absolute top-2 right-2 text-gray-300" onClick={() => addProductToFavorites(product.id)}>
                  <Heart />
                </button>
              }

            </div>
          )
          )}

          {cart.length === 0 &&
            <div>
              <h3 className="text-white text-center text-xl my-10">Parece que no has agregado productos</h3>
            </div>
          }

          <div className="flex flex-col gap-5 justify-center px-4">
            <div>
              <p className="dark:text-white"><b className="dark:text-darkTextColor1">Sub-total:</b> ${(subTotal).toFixed(2)}</p>
              <p className="dark:text-white"><b className="dark:text-darkTextColor1">Tax fee (12%):</b> ${(subTotal * 0.12).toFixed(2)}</p>
              <p className="dark:text-white"><b className="dark:text-darkTextColor1">Total:</b> ${(subTotal * 0.12 + subTotal).toFixed(2)}</p>
            </div>
            <div>
              <button className="w-full font-semibold bg-lightKey2Bg text-white hover:bg-lightKey2Shadow dark:bg-darkKey1Shadow dark:hover:bg-darkKey1Bg px-4 py-2 rounded-sm transition-colors duration-200">Pagar</button>
            </div>
          </div>
        </IsClient>
      </div>
    </>
  )
}

export default Page