import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
    this.addEventListeners()
  }
  render() {
    let container = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner"></div>
    </div>`)
    this.elem = container;
    let productsGridInner = this.elem.querySelector('.products-grid__inner');

    productsGridInner.insertAdjacentHTML('beforeend', this.products.map(({ image, price, name }) => `<div class="card">
    <div class="card__top">
      <img src="/assets/images/products/${image}" class="card__image" alt="product">
      <span class="card__price">€${(price).toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    </div>`).join(''))
  }

  updateFilter(filters) {
    this.filters = filters;

    if (!this.temp) { this.temp = {} };
    this.filters = Object.assign(this.temp, this.filters);


    let sorted = this.products.filter(obj => {
      return (((!this.filters.noNuts) || (!obj.nuts))
        && ((!this.filters.vegeterianOnly) || (obj.vegeterian === true))
        && ((!this.filters.maxSpiciness) || (obj.spiciness <= this.filters.maxSpiciness))
        && (!(this.filters.category) || (obj.category === this.filters.category)))
    })

    let output = (data) => {
      let productsGridInner = this.elem.querySelector('.products-grid__inner').innerHTML = data.map(({ image, price, name }) => `<div class="card">
    <div class="card__top">
      <img src="/assets/images/products/${image}" class="card__image" alt="product">
      <span class="card__price">€${(price).toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    </div>`).join('')
    }
    output(sorted)
  }
  addEventListeners() {
  }
}
