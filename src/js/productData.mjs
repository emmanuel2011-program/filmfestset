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
      const uniqueCategories = [...new Set(data.Result.map(product => product.category))];
      return uniqueCategories;
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
