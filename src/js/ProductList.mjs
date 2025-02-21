import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class  ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement; 
    }

    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        let limitedList = this.filterList(list);
        this.renderList(limitedList);
        document.querySelector(".title").innerHTML = this.category;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    filterList(list){
      let limitedList = [];
      list.forEach(element => {
        if (element.Id != "989CG" && element.Id != "880RT"){
          limitedList.push(element)
        };  
      });
      return limitedList;
    }
}
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded.");

  // Select location button and display
  const locationButton = document.getElementById("getLocation");
  const locationDisplay = document.getElementById("location");

  console.log("Checking if #getLocation button exists...", locationButton);
  console.log("Checking if #location display exists...", locationDisplay);

  if (locationButton) {
      locationButton.addEventListener("click", function () {
          console.log("Location button clicked!");

          if (navigator.geolocation) {
              console.log("Geolocation is supported.");

              navigator.geolocation.getCurrentPosition(
                  function (position) {
                      console.log("Geolocation success!", position);
                      const latitude = position.coords.latitude;
                      const longitude = position.coords.longitude;
                      locationDisplay.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
                  },
                  function (error) {
                      console.error("Geolocation error:", error);
                      locationDisplay.innerHTML = `Error: ${error.message}`;
                  }
              );
          } else {
              console.error("Geolocation is not supported by this browser.");
              locationDisplay.innerHTML = "Geolocation is not supported by this browser.";
          }
      });
  } else {
      console.error("Element #getLocation not found!");
  }
});
