import { httpClient } from '../httpClient';

type FetchParams = {
  search?: string;
  page?: number;
  limit?: number;
}

export type ProductServerType = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export type ProductsServerResponse = {
  products: ProductServerType[];
  total: number;
  skip: number;
  limit: number;
};

export const fetchProducts = async ({
  search,
  page = 1,
  limit = 100
}: FetchParams): Promise<ProductsServerResponse> => {
  try {
    const { data } = await httpClient.get('/products', {
      params: {
        q: search,
        limit,
        skip: (page - 1) * limit
      }
    });
    return {
      products: data?.products || [],
      total: data?.total || 0,
      skip: data?.skip || false,
      limit: data?.limit || 100
    };
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }
};

export const fetchProductById = async (id: number): Promise<ProductServerType> => {
  try {
    const response = await httpClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch product by id ${id}: ${error}`);
  }
};
