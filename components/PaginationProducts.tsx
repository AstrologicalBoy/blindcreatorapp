"use client"

import { useAppContext } from "@/app/contexts/context";
import { getFavoritesListWithoutItem, isInFavorites, saveFavorites } from "@/app/utils/favorites";
import { ProductType } from "@/types/types"
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const PaginationProducts = ({ resultsPerPage, page, products }: { resultsPerPage: number, page: number, products: ProductType[], totalPages: number }) => {

  const { showDrawer, setShowDrawer, favorites, setFavorites } = useAppContext()

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites])

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

  const results = [];
  for (let i = (page * resultsPerPage) - resultsPerPage; i < (page * resultsPerPage); i++) {
    if (products[i] === undefined) {
      break;
    }

    results[i] = products[i];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
      {results.map((product) => (
        <div key={product.id} className="relative  dark:bg-darkKeypadBg px-5 py-10 rounded-md shadow-md flex flex-col justify-center items-center">
          <Link onClick={() => showDrawer && setShowDrawer(false)} prefetch href={`/products/${product.id}`} className="text-center">
            <div>
              <Image width={200} height={350} src={product.image} alt={`${product.id}-image`} className="h-[200px] w-auto mx-auto mb-4" />
            </div>
            <p className="dark:text-white font-bold line-clamp-1" title={product.title}>{product.title}</p>
            <p className="dark:text-white text-sm">$<span className="text-xl">{product.price}</span></p>
          </Link>
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
    </div>
  )
}

export default PaginationProducts