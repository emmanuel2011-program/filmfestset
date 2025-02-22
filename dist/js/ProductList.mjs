import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.id}">
      <img src="${product.images[0]}" alt="Image of ${product.name}" />
      <h3 class="card__brand">${product.brand}</h3>
      <h2 class="card__name">${product.name}</h2>
      <p class="product-card__price">$${product.price.toFixed(2)}</p>
      <p class="card__stock">Stock: ${product.stock}</p>
      <p class="card__rating">Rating: ${product.rating} ⭐</p>
      <p class="card__date">Added on: ${new Date(product.created_at).toLocaleDateString()}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Fetch product data
    const list = await this.dataSource.getData(this.category);

    // Ensure data follows the required structure
    const formattedList = list.map(product => ({
      id: product.Id,
      name: product.Name,
      category: product.Category || "Unknown",
      price: product.FinalPrice,
      stock: product.Stock || 0,
      brand: product.Brand.Name,
      rating: product.Rating || "N/A",
      created_at: product.CreatedAt || new Date().toISOString(),
      images: product.Images ? [product.Images.PrimaryMedium] : ["placeholder.jpg"]
    }));

    // Apply filter & render the list
    let limitedList = this.filterList(formattedList);
    this.renderList(limitedList);

    // Update the page title
    document.querySelector(".title").innerHTML = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  filterList(list) {
    return list.filter(product => product.id !== "989CG" && product.id !== "880RT");
  }
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded.");

  // Select location button and display elements
  const locationButton = document.getElementById("getLocation");
  const locationDisplay = document.getElementById("location");

  if (locationButton) {
    locationButton.addEventListener("click", function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            locationDisplay.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
          },
          function (error) {
            locationDisplay.innerHTML = `Error: ${error.message}`;
          }
        );
      } else {
        locationDisplay.innerHTML = "Geolocation is not supported by this browser.";
      }
    });
  }
});
