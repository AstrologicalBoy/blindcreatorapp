import { useAppContext } from '@/app/contexts/context';
import { ProductType } from '@/types/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const PaginationBar = ({ products, filter, page }: { products: ProductType[], filter: string | undefined, page: number }) => {
    const [paginate, setPaginate] = useState(page ?? 1);
    const { actualPage, setActualPage } = useAppContext();

    // Pagination
    const totalPages = products && Math.ceil(products.length / 9);

    const increase = (a: number): number => {
        return +a + +1;
    }

    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center items-center gap-5 mt-5 p-12 dark:bg-darkScreenBg dark:text-white">

            {actualPage && paginate > 1 &&
                <Link
                    href={`/products?${filter === undefined ? `page=${page - 1}` : `category=${filter}&page=${page - 1}`}`}
                    onClick={() => {
                        setPaginate(page - 1);
                        setActualPage(page - 1);
                    }}
                >
                    Anterior
                </Link>
            }

            {actualPage && pages.map((item, index) => {
                
                return (
                    <Link
                        href={`/products?${filter === undefined ? `page=${item}` : `category=${filter}&page=${item}`}`}
                        key={index}
                        onClick={() => {
                            setPaginate(item);
                            setActualPage(item);
                        }}
                        className={`${actualPage === item && "font-bold text-lg dark:text-darkTextColor1"}`}
                    >
                        {item}
                    </Link>
                )
            })}

            {actualPage && paginate < totalPages &&
                <Link
                    href={`/products?${filter === undefined ? `page=${increase(page)}` : `category=${filter}&page=${increase(page)}`}`}
                    onClick={() => {
                        setPaginate(increase(page));
                        setActualPage(increase(page));
                    }}
                >
                    Siguiente
                </Link>}
        </div>
    )
}

export default PaginationBar