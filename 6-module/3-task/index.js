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

    inner.insertAdjacentHTML('beforeend', this.slides.map(({ name, price, image, id }) => `
  <div class="carousel__slide" data-id="${id}">
    <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">${price}</span> 
      <div class="carousel__title">${name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
      </div>
      </div>
  `).join(''))   // ДОБАВИТЬ НОРМАЛЬНУЮ ЦЕНУ
    this.elem = slider
  }

  addEventListeners() {


    let arrowRT = this.elem.querySelector('.carousel__arrow_right');
    let arrowLT = this.elem.querySelector('.carousel__arrow_left');
    let inner = this.elem.querySelector('.carousel__inner');
    let counter = 1;
    arrowLT.style.display = 'none';
    console.log(this.slides.length)

    this.elem.addEventListener('click', (event) => {
      let leftClc = event.target.closest('.carousel__arrow_left');
      let rightClc = event.target.closest('.carousel__arrow_right');
      let offsetInner = inner.offsetWidth;
      if (rightClc) {
        if (counter === 1) {
          inner.style.transform = `translateX(-${offsetInner}px)`;
          arrowLT.style.display = '';
          counter++;
        }
        else if (counter === 2) {
          inner.style.transform = `translateX(-${offsetInner * counter}px)`;
          counter++;
        }
        else if (counter === 3) {
          inner.style.transform = `translateX(-${offsetInner * counter}px)`;
          arrowRT.style.display = 'none';
          counter++;
        }
      }
      if (leftClc) {
        if (counter === 4) {
          counter--;
          inner.style.transform = `translateX(-${offsetInner * (counter - 1)}px)`;
          arrowRT.style.display = '';
        }
        else if (counter === 3) {
          counter--;
          inner.style.transform = `translateX(-${offsetInner * (counter - 1)}px)`;
        }
        else if (counter === 2) {
          counter--;
          inner.style.transform = `translateX(-${offsetInner * (counter - 1)}px)`;
          arrowLT.style.display = 'none';
        }

      }
    })
  }
}
