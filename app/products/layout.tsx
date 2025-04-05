import Navbar from "@/components/Navbar"

const ProductsLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}

export default ProductsLayout;