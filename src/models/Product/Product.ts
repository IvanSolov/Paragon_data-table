import type { ProductServerType } from '@/services/apiServices/productService';

// The product model is used to separate and transform untyped and uncontrolled server response data to a familiar data type.

export class Product {
  id: number;
  title: string;
  description: string;
  price: number;

  constructor({ id, title, description, price }: ProductServerType) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
