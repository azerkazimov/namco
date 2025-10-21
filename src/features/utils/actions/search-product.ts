import { ProductProps } from "@/features/helpers/interfaces/products"

export async function searchProducts(query: string): Promise<ProductProps[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/items?q=${encodeURIComponent(query)}`)

    if (!response.ok) {
        throw new Error("Failed to fetch search products")
    }

    return response.json()
}