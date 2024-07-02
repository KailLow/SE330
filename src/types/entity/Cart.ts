import Product from "./Product";

export interface CartProduct {
    productId: string;
    quantity: number;
}

export interface CartProductResponse {
    product: Product;
    quantity: number;
}