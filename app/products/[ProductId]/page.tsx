import ProductLayout from "@/components/ProductLayout";

const page = async ({ params } : { params: Promise<{ ProductId: string }> }) => {

    const productId = (await params).ProductId;

    return (
        <ProductLayout productId={productId} />
    )
}

export default page