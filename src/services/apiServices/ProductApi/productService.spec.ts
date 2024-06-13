import { describe, it, expect, vi, afterEach } from 'vitest';
import { httpClient } from '@/services/httpClient';
import {
  fetchProducts,
  fetchProductById,
  type ProductsServerResponse,
  type ProductServerType
} from './productService';

vi.mock('@/services/httpClient');

const mockedHttpClient = httpClient as vi.Mocked<typeof httpClient>;

describe('productService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchProducts', () => {
    it('fetches products correctly without search query', async () => {
      const mockResponse: ProductsServerResponse = {
        products: [
          { id: 1, title: 'Product 1', description: 'Description 1', price: 1000 },
          { id: 2, title: 'Product 2', description: 'Description 2', price: 2000 }
        ],
        total: 2,
        skip: 0,
        limit: 10
      };

      mockedHttpClient.get.mockResolvedValue({ data: mockResponse });

      const params = { itemsPerPage: 10, page: 1, search: '' };
      const result = await fetchProducts(params);

      expect(mockedHttpClient.get).toHaveBeenCalledWith('/products', {
        params: { limit: 10, skip: 0, q: undefined }
      });
      expect(result).toEqual(mockResponse);
    });

    it('fetches products correctly with search query', async () => {
      const mockResponse: ProductsServerResponse = {
        products: [
          { id: 1, title: 'Product 1', description: 'Description 1', price: 1000 },
          { id: 2, title: 'Product 2', description: 'Description 2', price: 2000 }
        ],
        total: 2,
        skip: 0,
        limit: 10
      };

      mockedHttpClient.get.mockResolvedValue({ data: mockResponse });

      const params = { itemsPerPage: 10, page: 1, search: 'Product' };
      const result = await fetchProducts(params);

      expect(mockedHttpClient.get).toHaveBeenCalledWith('/products/search', {
        params: { limit: 10, skip: 0, q: 'Product' }
      });
      expect(result).toEqual(mockResponse);
    });

    it('handles error during fetch products', async () => {
      mockedHttpClient.get.mockRejectedValue(new Error('Network Error'));

      const params = { itemsPerPage: 10, page: 1, search: '' };

      await expect(fetchProducts(params)).rejects.toThrow(
        'Failed to fetch products: Error: Network Error'
      );
    });
  });

  describe('fetchProductById', () => {
    it('fetches product by id correctly', async () => {
      const mockProduct: ProductServerType = {
        id: 1,
        title: 'Product 1',
        description: 'Description 1',
        price: 1000
      };

      mockedHttpClient.get.mockResolvedValue({ data: mockProduct });

      const result = await fetchProductById(1);

      expect(mockedHttpClient.get).toHaveBeenCalledWith('/products/1');
      expect(result).toEqual(mockProduct);
    });

    it('handles error during fetch product by id', async () => {
      mockedHttpClient.get.mockRejectedValue(new Error('Network Error'));

      await expect(fetchProductById(1)).rejects.toThrow(
        'Failed to fetch product by id 1: Error: Network Error'
      );
    });
  });
});
