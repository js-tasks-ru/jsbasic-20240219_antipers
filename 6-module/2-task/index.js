import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.render();
    this.addEventListeners();
  }

  render() {
    let container = createElement(`
<div class="card">
<div class="card__top">
  <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
  <span class="card__price">€${(this.product.price).toFixed(2)}</span>
</div>
<div class="card__body">
  <div class="card__title">${this.product.name}</div>
  <button type="button" class="card__button">
    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
  </button>
</div>
</div>`
    );
    this.elem = container;
  }
  addEventListeners() {
    this.elem.addEventListener('click', event => {
      let cartBtn = event.target.closest('.card__button');
      if (cartBtn) {
        let cartEvent = new CustomEvent("product-add", {
          detail: this.product.id,
          bubbles: true,
        });
        this.elem.dispatchEvent(cartEvent);
      }
    });
    this.elem.addEventListener("product-add", () => {
      console.log('Товар добавлен в корзину:' + this.product.id);
    });
  }
}


