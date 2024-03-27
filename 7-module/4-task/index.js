export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.render();
    this.addEventListeners()
  }
  render() {
    let slider = document.createElement('DIV');
    slider.classList.add('slider');
    slider.insertAdjacentHTML("beforeend", `  
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
    </div>
    
    <div class="slider__progress" style="width: 50%;"></div>
    
    <div class="slider__steps">
      <span class="slider__step-active"></span>      
    </div>
  `)
    let stepsNum = slider.querySelector('.slider__steps')
    for (let index = 0; index < this.steps - 1; index++) {
      stepsNum.insertAdjacentHTML('beforeEnd', `<span></span>`)
    }
    this.elem = slider
  }


  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      let targetSlider = event.target.closest('.slider');
      let previousTarget = this.elem.querySelector('.slider__step-active');
      if (targetSlider) {
        if (previousTarget) { previousTarget.classList.remove('slider__step-active') }
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / targetSlider.offsetWidth;
        let approximateValue = leftRelative * (this.steps - 1)
        let value = Math.round(approximateValue)

        this.value = value;
        let spanList = this.elem.querySelectorAll('.slider__steps span');
        spanList[this.value].classList.add('slider__step-active')

        let currentValue = this.elem.querySelector('.slider__value');
        currentValue.textContent = this.value;

        let thumb = this.elem.querySelector('.slider__thumb');
        let progress = this.elem.querySelector('.slider__progress');
        let leftPercents = (100 / (this.steps - 1)) * this.value;
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        let customEvent = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        });
        this.elem.dispatchEvent(customEvent);
      }
    });


    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    this.elem.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      let progress = this.elem.querySelector('.slider__progress');
      let spanList = this.elem.querySelectorAll('.slider__steps span');
      this.elem.classList.add('slider_dragging');
      thumb.style.position = 'absolute';
      thumb.style.zIndex = 99999999;     


      let mouseMove = (event) => {
        event.preventDefault();

        let left = event.clientX - this.elem.getBoundingClientRect().left
        let leftRelative = left / this.elem.offsetWidth;
        if (leftRelative < 0) { leftRelative = 0 }
        if (leftRelative > 1) { leftRelative = 1 }


        let approximateValue = leftRelative * (this.steps - 1);
        let value = Math.round(approximateValue);

        let previousTarget = this.elem.querySelector('.slider__step-active');
        if (previousTarget) { previousTarget.classList.remove('slider__step-active') }
        spanList[value].classList.add('slider__step-active')

        let currentValue = this.elem.querySelector('.slider__value');
        currentValue.textContent = value;
        this.value = value

        let leftPercents = 100 * leftRelative;
        progress.style.width = `${leftPercents}%`;
        thumb.style.left = `${leftPercents}%`;
      }
      document.addEventListener('pointermove', mouseMove);

      let mouseUp = (event) => {
        event.preventDefault();
        let finalPercents = (100 / (this.steps - 1)) * this.value;

        thumb.style.left = `${finalPercents}%`;
        progress.style.width = `${finalPercents}%`;

        let customEvent = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        });
        this.elem.dispatchEvent(customEvent);

        document.removeEventListener('pointermove', mouseMove);
        this.elem.onpointerup = null;
        this.elem.classList.remove('slider_dragging');
      }
      document.addEventListener('pointerup', mouseUp);
    })
  }
}