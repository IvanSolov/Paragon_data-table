import { httpClient } from '@/services/httpClient';
import type {
  FetchProductParams,
  ProductsServerResponse,
  ProductRequestOptions,
  ProductServerType
} from './types';

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
    const { data } = await httpClient.get(`/products/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch product by id ${id}: ${error}`);
  }
};

const makeRequest = async (
  url: string,
  params: ProductRequestOptions
): Promise<ProductsServerResponse> => {
  try {
    const { data } = await httpClient.get(url, { params });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }
};
