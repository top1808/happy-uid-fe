import useLocalStorage from './useLocalStorage';
import { Product } from '../types/productType';

const useProducts = () => {
  const { storedValue: products, setValue, loading, error } = useLocalStorage<Product[]>('products', []);

  const createProduct = (product: Product) => {
    setValue((prevProducts) => [...(prevProducts || []), product]);
  };

  const fetchProducts = () => {
    return products;
  };

  const fetchProductById = (id: string) => {
    return products?.find((product) => product.id === id);
  };

  const getAllTags = () => {
    return Array.from(new Set(products?.flatMap((product) => product.tags)))
  };

  const filterProducts = (tags: string[]) => {
    return products?.filter((product) => tags.every((tag) => product?.tags?.includes(tag)));
  };

  return { products, createProduct, fetchProducts, fetchProductById, loading, error, getAllTags, filterProducts };
};

export default useProducts;
