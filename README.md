# Paragon Data-Table

This project is a Data-Table application built with Vue 3, TypeScript, Pinia, and Vuetify. It allows users to view a table of products, search, paginate through products, and view detailed information about each product. It fetches data from the [Dummy JSON API](https://dummyjson.com/docs/products).

## Features

- **Product Listing**: View a table of products with columns for name, description, and price.
- **Search**: Search for products using a search field.
- **Pagination**: Navigate through pages of products.
- **Product Details**: View detailed information about a product by clicking on a table row.
- **Error Handling**: Display error messages when data fetching fails.

## Tech Stack

- [Vue 3](https://v3.vuejs.org/) (Composition API)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) (State Management)
- [Vuetify](https://vuetifyjs.com/en/) (UI Library)
- [Vite](https://vitejs.dev/) (Build Tool)

## Project Structure

```
src/
├── assets/
├── components/
│   ├── ProductDetail.vue
│   └── ProductTable.vue
├── composables/
│   └── useProductFetch.ts
├── models/
│   └── Product.ts
├── router/
│   └── index.ts
├── services/
│   └── apiServices/
│       └── ProductApi/
│           ├── productService.ts
│           └── httpClient.ts
├── stores/
│   └── productStore.ts
├── tests/
│   └── components/
│       ├── ProductDetail.spec.ts
│       └── ProductTable.spec.ts
├── App.vue
├── main.ts
└── env.d.ts
```

## Installation

```sh
git clone https://github.com/your-username/product-dashboard.git
```
```sh
cd product-dashboard
```

```sh
npm install
```

```sh
npm run dev
```

Usage
-----

1. Open the application in your browser.
2. Use the search bar to filter products.
3. Click on product rows to view detailed information.
4. Navigate through pages using the pagination controls.
