export type ProductsServerResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductServerType = {
  id: number;
  title: string;
  description: string;
  price: number;
};
