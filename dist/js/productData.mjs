const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}

  async getCategories() {
    try {
      const response = await fetch(`${baseURL}products/categories`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  async getAllProducts() {
    try {
      const response = await fetch(`${baseURL}products/all`);
      const data = await convertToJson(response);
  
      // Ensure each product has 8+ attributes
      return data.Result.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        brand: product.brand,
        rating: product.rating,
        created_at: product.created_at,
        images: product.images || [] // Ensure it's always an array
      }));
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  }
  

  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  }
}
