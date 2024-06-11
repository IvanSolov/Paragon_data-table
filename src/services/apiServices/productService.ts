import type { ProductsServerResponse } from '@/types/api/product';
import { httpClient } from '../httpClient';

type FetchParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export const fetchProducts = async ({
  search = '',
  page = 1,
  limit = 10
}: FetchParams = {}): Promise<ProductsServerResponse[]> => {
  try {
    const response = await httpClient.get<ProductsServerResponse[]>('/products', {
      params: {
        q: search,
        limit,
        skip: (page - 1) * limit
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }
};

// export const fetchProductById = async (id: number): Promise<Product> => {
//   try {
//     const response = await httpClient.get<Product>(`/products/${id}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(`Failed to fetch product by id ${id}: ${error}`);
//   }
// };
