import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();

  }

  addProduct(product) {
    if (!product) { return }
    let temp = {
      product: product,
      count: 1,
    }
    let cartItem = this.cartItems.find((n) => n.product.id === product.id);
    if (cartItem) {
      cartItem.count += 1;
    } else {
      this.cartItems.push(temp)
    }
    this.onProductUpdate(cartItem)
    //console.log(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((n) => n.product.id === productId)
    cartItem.count += amount;
    if (cartItem.count <= 0) {
      let toDelIndex = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(toDelIndex, 1);
    }
    this.onProductUpdate(cartItem)
  }

  isEmpty() {
    for (let item of this.cartItems) {
      return false
    }
    return true
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, currentCount) => totalCount + currentCount.count,
      0
    )
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrices, currentPrice) => totalPrices + (currentPrice.product.price * currentPrice.count),
      0
    )
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    this.modal = modal;
    modal.setTitle('Your order');
    this.modalBody = document.createElement('div')
    let temp = this.cartItems.map((obj) => {
      this.modalBody.append(this.renderProduct(obj.product, obj.count));
    });
    this.modalBody.append(this.renderOrderForm())
    modal.setBody(this.modalBody);// удалил createElement, может понадобится вернуть для прохождения проверок

    modal.open();

    this.modalBody.addEventListener('click', (event) => {
      let btnsMinus = event.target.closest('.cart-counter__button_minus');
      let btnsPlus = event.target.closest('.cart-counter__button_plus');
      let targetItem = event.target.closest('.cart-product').dataset.productId;

      let cartItem = this.cartItems.find((n) => n.product.id === targetItem)
      if (btnsMinus) {
        this.updateProductCount(targetItem, -1)
      }
      if (btnsPlus) {
        this.updateProductCount(targetItem, 1)
      }
      this.onProductUpdate(cartItem)
    })

    let cartForm = document.querySelector('.cart-form')
    cartForm.addEventListener('submit', (event) => {
      this.onSubmit(event)
    })
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      console.log(this.cartItems)

      let productId = cartItem.product.id;
      let modalBody = this.modalBody;
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`)
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      console.log(productPrice);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`
      infoPrice.innerHTML = `€${(this.getTotalPrice()).toFixed(2)}`;
    }

    if (this.getTotalPrice() === 0) { this.modal.close() }

    this.cartIcon.update(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    let btnSubmit = this.modalBody.querySelector('button[type="submit"]');
    let cartForm = document.querySelector('.cart-form');
    let fd = new FormData(cartForm);
    btnSubmit.classList.add('is-loading')
    await fetch(`https://httpbin.org/post`, {
      method: 'POST',
      body: fd,
    })

    this.modal.setTitle("Success!");
    btnSubmit.classList.remove('is-loading')
    this.cartItems.length = 0;
    this.cartIcon.update(this);
    this.modalBody.innerHTML = `<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`;


  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

