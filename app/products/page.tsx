"use client"

import { use, useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "@/app/utils/products";
import { useQuery } from "@tanstack/react-query";
import PaginationBar from "@/components/PaginationBar";
import PaginationProducts from "@/components/PaginationProducts";
import { GridLoader } from "react-spinners";
import IsClient from "@/components/IsClient";

// Categories
const categories = ["all products", "electronics", "jewelery", "men's clothing", "women's clothing"];

// Component ----------------------------------------------------------------------------------------
const Page = ({ searchParams }: { searchParams: Promise<{ category?: string, page?: number | undefined }> }) => {

    const { category } = use(searchParams);
    const { page } = use(searchParams);

    const [filter, setFilter] = useState(category ?? "all products");
    const [paginate, setPaginate] = useState(page ?? 1);

    useEffect(() => {
        if (page !== undefined) {
            setPaginate(page);
        }
    }, [page])

    const setQuery = (category: string) => {
        if (category === "all products") {
            return getAllProducts();
        } else {
            return getProductsByCategory(category);
        }
    }

    // TanStack
    // get products
    const products = useQuery({ queryKey: ["get-all-products"], queryFn: () => setQuery(filter) });

    // Pagination
    const resultsPerPage = 9;
    const totalPages = products.data && Math.ceil(products.data.length / resultsPerPage);

    return (
        <div className="dark:bg-darkMainBg pt-10 min-h-screen">
            <h1 className="text-center text-4xl dark:text-darkTextColor1 mb-5">Productos disponibles</h1>
            <div className="p-4">
                <form method="GET" action={"/products"} className="flex flex-col md:flex-row justify-center gap-3">
                    <select name="category" defaultValue={category} onChange={(e) => setFilter(e.target.value)} className="p-4 dark:bg-darkKey3Bg dark:text-white">
                        {categories.map((category, index) => (
                            <option key={`category/${index}`} value={category} className="capitalize">{category}</option>
                        ))}
                    </select>
                    <button
                        disabled={category === "" || category === filter ? true : false}
                        className="font-semibold bg-lightKey2Bg text-white hover:bg-lightKey2Shadow dark:bg-darkKey1Shadow dark:hover:bg-darkKey1Bg px-4 py-2 rounded-sm transition-colors duration-200"
                    >
                        Apply filters
                    </button>
                </form>
            </div>

            {products.isLoading && products.isFetching &&
                <IsClient>
                    <div className="flex justify-center items-center">
                        <GridLoader color={'#bc15f4'} />
                    </div>
                </IsClient>
            }

            {products.data && !products.isFetching &&
                <>
                    {/* Showing products */}
                    <PaginationProducts page={paginate} products={products.data} resultsPerPage={9} totalPages={totalPages} />

                    {/* Pagination bar */}
                    <PaginationBar filter={category} page={paginate} products={products.data} />
                </>
            }
        </div>
    )
}

export default Page
