export interface Product {
    id?: string;
    title: string;
    description?: string;
    price: number;
    media?: string[];
    tags?: string[];
    productType?: string;
}