export type FetchProductParams = {
  search?: string;
  page: number;
  itemsPerPage: number;
};

export type ProductRequestOptions = {
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
