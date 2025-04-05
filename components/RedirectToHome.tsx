"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectToHome = () => {
    const router = useRouter();

    useEffect(() => {
        if(router){
            router.push("/products");
        }
    }, []);

    return null;
}

export default RedirectToHome