import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchProducts, fetchProductById } from '@/services/apiServices/ProductApi/productService';
import { httpClient } from '@/services/httpClient';

vi.mock('@/services/httpClient', () => ({
  httpClient: {
    get: vi.fn()
  }
}));

describe('Product API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches products successfully', async () => {
    const mockProductsResponse = {
      products: [{ id: 1, title: 'Product 1', description: 'Description 1', price: 100 }],
      total: 1,
      skip: 0,
      limit: 25
    };

    (httpClient.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: mockProductsResponse
    });

    const response = await fetchProducts({ itemsPerPage: 25, page: 1, search: '' });
    expect(response).toEqual(mockProductsResponse);
    expect(httpClient.get).toHaveBeenCalledWith('/products', {
      params: { limit: 25, skip: 0, q: undefined }
    });
  });

  it('fetches product by id successfully', async () => {
    const mockProductResponse = {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      price: 100
    };

    (httpClient.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: mockProductResponse
    });

    const response = await fetchProductById(1);
    expect(response).toEqual(mockProductResponse);
    expect(httpClient.get).toHaveBeenCalledWith('/products/1');
  });

  it('handles error when fetching products', async () => {
    (httpClient.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchProducts({ itemsPerPage: 25, page: 1, search: '' })).rejects.toThrow(
      'Failed to fetch products: Error: Network error'
    );
  });

  it('handles error when fetching product by id', async () => {
    (httpClient.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchProductById(1)).rejects.toThrow(
      'Failed to fetch product by id 1: Error: Network error'
    );
  });
});
