"use client"

import { useEffect, useState } from "react";

const IsClient = ({ children } : { children : React.ReactNode }) => {

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && children}
        </>
    )

}

export default IsClient