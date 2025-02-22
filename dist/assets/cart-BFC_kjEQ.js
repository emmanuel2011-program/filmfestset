import{g as d,s as m,l as u}from"./utils-CXNovQD3.js";function s(r,t){var e,a;return`
    <li class="cart-card divider" data-index="${t}">
        <button class="removeButton" data-index="${t}" aria-label="Remove item">Remove Item;</button>
        <a href="#" class="cart-card__image">
            <img src="${r.Image}" alt="Image of ${r.Name}" />
        </a>
        <div class="cart-card__details">
            <h2 class="card__name">${r.Name}</h2>
            <p class="cart-card__color">${((a=(e=r.Colors)==null?void 0:e[0])==null?void 0:a.ColorName)||"No color specified"}</p>
            <p class="cart-card__quantity">qty: 1</p>
            <p class="cart-card__price">$${r.FinalPrice}</p>
        </div>
    </li>`}function p(r,t){if(r!==null){const e=r.map(a=>s(a));document.querySelector(t).innerHTML=e.join("")}return r.reduce((e,a)=>e+a.FinalPrice,0)}class h{constructor(t,e){this.key=t,this.parentSelector=e}renderCartContents(){const t=d(this.key)||[];if(t.length===0){this.displayEmptyCartMessage();return}const e=t.map((i,l)=>s(i,l)),a=document.querySelector(this.parentSelector);a.innerHTML=e.join(""),document.querySelector(".cart-footer").classList.remove("hide");const o=p(t,this.parentSelector),c=document.querySelector(".cart-total");c.textContent=`Total: $${o.toFixed(2)}`,this.attachRemoveItemListeners(t)}attachRemoveItemListeners(t){document.querySelector(this.parentSelector).querySelectorAll(".removeButton").forEach(n=>{n.addEventListener("click",o=>{const c=o.target.getAttribute("data-index");t.splice(c,1),m(this.key,t),this.renderCartContents()})})}displayEmptyCartMessage(){const t=document.querySelector(this.parentSelector);t.innerHTML="<p>Your cart is empty.</p>"}}u();const y=new h("so-cart",".product-list");y.renderCartContents();
