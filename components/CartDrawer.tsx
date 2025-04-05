"use client"

import { useAppContext } from "@/app/contexts/context"
import { decreaseQuantity, getCartWithoutItem, getIndexOfItem, increaseQuantity, saveCart } from "@/app/utils/cart";
import { getFavoritesListWithoutItem, isInFavorites, saveFavorites } from "@/app/utils/favorites";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
import IsClient from "./IsClient";
import { usePathname } from "next/navigation";
import { Heart, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

// Component
const CartDrawer = () => {

  const { cart, setCart, favorites, setFavorites, showDrawer, setShowDrawer } = useAppContext();
  const pathName = usePathname();

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
    <div className={`fixed overflow-scroll shadow-md p-4 top-0 h-full w-full md:w-2/3 transition-all duration-200 bg-white/35 backdrop-blur-md ${!showDrawer ? "right-[-100%]" : "right-0"}`}>
      <button onClick={() => setShowDrawer(!showDrawer)}><X /></button>
      <h2 className="text-2xl text-center mb-5 font-bold dark:text-darkTextColor1">Resumen del carrito</h2>
      <IsClient>
        {cart.length > 0 && cart.map((product) => (
          <div key={product.id} className={`relative bg-gray-50 dark:bg-darkKeypadBg p-5 rounded-md shadow-md flex justify-center items-center mb-5`}>
            <div>
              <Link prefetch href={`/products/${product.id}`}>
                <h2 className="dark:text-white font-bold line-clamp-1">{product.name}</h2>
              </Link>
              <p className="text-center mt-5 text-sm dark:text-darkTextColor1">$<span className="text-lg">{product.price}</span></p>
              <div className="flex justify-center items-center gap-5 mt-5">
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

            {isInFavorites(favorites, product.id).length > 0 && <button className="absolute top-2 right-2 text-red-600" title="Eliminar de favoritos" onClick={() => deleteFromFavorites(product.id)}>
              <Heart />
            </button>
            }
            {isInFavorites(favorites, product.id).length === 0 && <button className="absolute top-2 right-2 text-gray-300" title="Agregar a favoritos" onClick={() => addProductToFavorites(product.id)}>
              <Heart />
            </button>
            }

          </div>
        ))}

        {cart.length === 0 &&
          <div>
            <h2 className="text-center text-xl mb-10 dark:text-darkTextColor3">No has agregado productos</h2>
          </div>
        }
      </IsClient>

      {pathName !== "/products/cart" &&
        <Link className="flex gap-3 items-center justify-center w-full font-semibold bg-lightKey2Bg text-white hover:bg-lightKey2Shadow dark:bg-darkKey1Shadow dark:hover:bg-darkKey1Bg px-4 py-2 rounded-sm transition-colors duration-200" onClick={() => setShowDrawer(false)} href="/products/cart">
          <ShoppingCart /> Ir al carrito
        </Link>
      }
    </div>
  )
}

export default CartDrawer