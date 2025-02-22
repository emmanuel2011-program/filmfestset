import{r as o,a as s,l as r}from"./utils-CXNovQD3.js";import{P as c}from"./productData-tnxPLk_d.js";function l(t){return`<li class="product-card">
    <a href="/product_pages/index.html?product=${t.id}">
      <img src="${t.images[0]}" alt="Image of ${t.name}" />
      <h3 class="card__brand">${t.brand}</h3>
      <h2 class="card__name">${t.name}</h2>
      <p class="product-card__price">$${t.price.toFixed(2)}</p>
      <p class="card__stock">Stock: ${t.stock}</p>
      <p class="card__rating">Rating: ${t.rating} ⭐</p>
      <p class="card__date">Added on: ${new Date(t.created_at).toLocaleDateString()}</p>
    </a>
  </li>`}class d{constructor(i,a,n){this.category=i,this.dataSource=a,this.listElement=n}async init(){const a=(await this.dataSource.getData(this.category)).map(e=>({id:e.Id,name:e.Name,category:e.Category||"Unknown",price:e.FinalPrice,stock:e.Stock||0,brand:e.Brand.Name,rating:e.Rating||"N/A",created_at:e.CreatedAt||new Date().toISOString(),images:e.Images?[e.Images.PrimaryMedium]:["placeholder.jpg"]}));let n=this.filterList(a);this.renderList(n),document.querySelector(".title").innerHTML=this.category}renderList(i){o(l,this.listElement,i)}filterList(i){return i.filter(a=>a.id!=="989CG"&&a.id!=="880RT")}}document.addEventListener("DOMContentLoaded",function(){console.log("DOM fully loaded.");const t=document.getElementById("getLocation"),i=document.getElementById("location");t&&t.addEventListener("click",function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(a){const n=a.coords.latitude,e=a.coords.longitude;i.innerHTML=`Latitude: ${n}, Longitude: ${e}`},function(a){i.innerHTML=`Error: ${a.message}`}):i.innerHTML="Geolocation is not supported by this browser."})});const g=s("category"),m=new c,u=document.querySelector(".product-list"),L=new d(g,m,u);r();L.init();
