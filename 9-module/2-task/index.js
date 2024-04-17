import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides)
    let carouselHolder = document.querySelector('[data-carousel-holder]')
    carouselHolder.append(carousel.elem)

    let ribbonMenu = new RibbonMenu(categories)
    let ribbonHolder = document.querySelector('[data-ribbon-holder]')
    ribbonHolder.append(ribbonMenu.elem)

    let stepSlider = new StepSlider({ steps: 5, value: 3 })
    let sliderHolder = document.querySelector('[data-slider-holder]')
    sliderHolder.append(stepSlider.elem)

    let cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    let dataResponse = await fetch('products.json')

    let dataProducts = await dataResponse.json()

    let productsGrid = new ProductsGrid(dataProducts)
    let productHolder = document.querySelector('[data-products-grid-holder]');
    productHolder.innerHTML = '';
    productHolder.append(productsGrid.elem);

    this.productsGrid = productsGrid;
    this.stepSlider = stepSlider;
    this.ribbonMenu = ribbonMenu;

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
    document.body.addEventListener('product-add', (event) => {
      let prodToAdd = dataProducts.find((obj) => {
        return event.detail === obj.id
      })
      cart.addProduct(prodToAdd)
    });

    document.body.addEventListener('slider-change', (event) => {
      let value = event.detail
      this.productsGrid.updateFilter({ maxSpiciness: value })
    })

    document.body.addEventListener('ribbon-select', (event) => {
      let categoryId = event.detail;
      this.productsGrid.updateFilter({ category: categoryId })
    })

    document.querySelector("#nuts-checkbox").addEventListener('change', (event) => {
      let toCheckNuts = event.target.checked
      this.productsGrid.updateFilter({ noNuts: toCheckNuts })
    })

    document.querySelector("#vegeterian-checkbox").addEventListener('change', (event) => {
      let toCheckVeg = event.target.checked;
      this.productsGrid.updateFilter({ vegeterianOnly: toCheckVeg })
    })









  }
}
