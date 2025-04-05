"use client"

import { useAppContext } from "@/app/contexts/context"
import { getFavoritesListWithoutItem, isInFavorites, saveFavorites } from "@/app/utils/favorites";
import { getAllProducts } from "@/app/utils/products";
import { ProductType } from "@/types/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";


const Page = () => {

  const { showDrawer, setShowDrawer, favorites, setFavorites } = useAppContext();

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites])

  // Favoritos ----------------------------------------------------------

  const { mutate: deleteFromFavorites } = useMutation({
    mutationFn: async (id: number) => {
      setFavorites(getFavoritesListWithoutItem(favorites, id));
      saveFavorites(favorites);
    }
  })

  const { data: Products } = useQuery({
    queryKey: ["get-favorites"],
    queryFn: () => getAllProducts()
  })

  return (
    <>
      {Products &&
        <div className="px-5 py-8 dark:bg-darkMainBg min-h-screen">
          <h1 className="text-center text-4xl dark:text-darkTextColor1 mb-5">Favoritos</h1>
          <h3 className="text-center font-light text-xl dark:text-white mb-5">{favorites.length} elementos</h3>
          {favorites.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Products.map((product: ProductType) => {
                if (isInFavorites(favorites, product.id).length > 0) {
                  return (
                    <div key={product.id} className="relative dark:bg-darkKeypadBg px-5 py-10 rounded-md shadow-md flex flex-col justify-center items-center">
                      <Link onClick={() => setShowDrawer(!showDrawer)} prefetch href={`/products/${product.id}`} className="text-center">
                        <div>
                          <Image width={200} height={300} src={product.image} alt={`${product.id}-image`} className="h-[200px] w-auto mx-auto mb-4" />
                        </div>
                        <p className="dark:text-white font-bold line-clamp-1" title={product.title}>{product.title}</p>
                        <p className="dark:text-white text-sm">$<span className="text-xl">{product.price}</span></p>
                      </Link>
                      {isInFavorites(favorites, product.id).length > 0 && <button className="absolute top-2 right-2 text-red-600 text-center" title="Eliminar de favoritos" onClick={() => deleteFromFavorites(product.id)}>
                          <Heart />
                        </button>
                      }
                      <div className="mt-3">
                      </div>
                    </div>
                  )
                }
              })}
            </div>
            :
            <p className="text-center dark:text-white">Agrega algunos productos desde el carrito o desde el inicio</p>
          }
        </div>
      }
    </>
  )
}

export default Page