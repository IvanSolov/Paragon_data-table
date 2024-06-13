import { httpClient } from '@/services/httpClient';

type FetchProductParams = {
  search?: string;
  page: number;
  itemsPerPage: number;
};

type ProductRequestOptions = {
  q?: string;
  skip?: number;
  limit?: number;
};

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
  itemsPerPage,
  page,
  search
}: FetchProductParams): Promise<ProductsServerResponse> => {
  const requestParams: ProductRequestOptions = {
    limit: itemsPerPage,
    skip: (page - 1) * itemsPerPage,
    q: search || undefined
  };

  if (search) {
    return makeRequest('/products/search', requestParams);
  }
  return makeRequest('/products', requestParams);
};

export const fetchProductById = async (id: number): Promise<ProductServerType> => {
  try {
    const response = await httpClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch product by id ${id}: ${error}`);
  }
};

const makeRequest = async (url: string, params: ProductRequestOptions): Promise<ProductsServerResponse> => {
  try {
    const { data } = await httpClient.get(url, { params });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }
};
