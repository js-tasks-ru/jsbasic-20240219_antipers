import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.addEventListeners();
  }

  render() {
    let slider = document.createElement('DIV');
    slider.classList.add('carousel');
    slider.innerHTML = (`
    <div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div>
  <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div>
  <div class="carousel__inner"></div>
  `);
    let inner = slider.querySelector('.carousel__inner');

    inner.insertAdjacentHTML('beforeend', this.slides
      .map(({ name, price, image, id }) => `
  <div class="carousel__slide" data-id="${id}">
    <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${price.toFixed(2)}</span> 
      <div class="carousel__title">${name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
      </div>
      </div>`)
      .join(''))
    this.elem = slider
  }

  addEventListeners() {
    let arrowRT = this.elem.querySelector('.carousel__arrow_right');
    let arrowLT = this.elem.querySelector('.carousel__arrow_left');
    let inner = this.elem.querySelector('.carousel__inner');
    let counter = 1;
    arrowLT.style.display = 'none';
    let len = this.slides.length;

    function checkCounter() {
      (counter >= (len)) ? arrowRT.style.display = 'none' : arrowRT.style.display = '';
      (counter === 1) ? arrowLT.style.display = 'none' : arrowLT.style.display = '';
    }

    this.elem.addEventListener('click', (event) => {
      let leftClc = event.target.closest('.carousel__arrow_left');
      let rightClc = event.target.closest('.carousel__arrow_right');
      let offsetInner = inner.offsetWidth;
      if (rightClc) {
        counter++;
        checkCounter();
        inner.style.transform = `translateX(-${offsetInner * (counter - 1)}px)`;
      }
      if (leftClc) {
        counter--;
        checkCounter();
        inner.style.transform = `translateX(-${offsetInner * (counter - 1)}px)`;
      }
    });

    

this.elem.addEventListener('click', event => {
  let cartBtn = event.target.closest('.carousel__button');
  if (cartBtn) {
    
    // let getIdElem= this.elem.querySelectorAll('.carousel__slide');
    // let getIdFromElem= getIdElem.dataset.id;
    // console.log(getIdFromElem)

    let cartEvent = new CustomEvent("product-add", {
      detail: this.slides[counter-1].id,
      bubbles: true,
    });
    this.elem.dispatchEvent(cartEvent);
  }
});
this.elem.addEventListener("product-add", () => {
  console.log('Товар добавлен в корзину:' + event.detail);
});
  }
}
