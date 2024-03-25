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
    /* Мое решение без подсказок из текста задачи
    this.elem.addEventListener('click', (event) => {
      let targetSlider = event.target.closest('.slider');
      let previousTarget = this.elem.querySelector('.slider__step-active');
      if (targetSlider) {
        if (previousTarget) { previousTarget.classList.remove('slider__step-active') }
        let coords = this.getCoords(targetSlider)
        let targetSliderWidth = targetSlider.offsetWidth;
        let spanList = this.elem.querySelectorAll('.slider__steps span');
        let segment = targetSliderWidth / ((this.steps - 1) * 2)

        if ((event.clientX > coords.left)
          && (event.clientX < coords.left + segment)) {
          this.value = 0;
          spanList[this.value].classList.add('slider__step-active')
        }
        else if ((event.clientX > (coords.left + segment))
          && (event.clientX < coords.left + segment * 3)) {
          this.value = 1;
          spanList[this.value].classList.add('slider__step-active')
        }
        else if ((event.clientX > (coords.left + segment * 2))
          && (event.clientX < coords.left + segment * 5)) {
          this.value = 2;
          spanList[this.value].classList.add('slider__step-active')
        }
        else if ((event.clientX > (coords.left + segment * 3))
          && (event.clientX < coords.left + segment * 7)) {
          this.value = 3;
          spanList[this.value].classList.add('slider__step-active')
        }
        else if ((event.clientX > (coords.left + segment * 4))
          && (event.clientX < coords.right)) {
          this.value = 4;
          spanList[this.value].classList.add('slider__step-active')
        }

        let currentValue = this.elem.querySelector('.slider__value');
        currentValue.textContent = this.value;

        let thumb = this.elem.querySelector('.slider__thumb');
        let progress = this.elem.querySelector('.slider__progress');
        let leftPercents = (100 / (this.steps - 1)) * this.value;

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`
        let customEvent = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        });
        this.elem.dispatchEvent(customEvent);
      }
    });
    this.elem.addEventListener('slider-change', (event) => {
      console.log(event.detail);
    });*/

    this.elem.addEventListener('click', (event) => {
      let targetSlider = event.target.closest('.slider');
      let previousTarget = this.elem.querySelector('.slider__step-active');
      if (targetSlider) {
        if (previousTarget) { previousTarget.classList.remove('slider__step-active') }
        let left= event.clientX- this.elem.getBoundingClientRect().left;        
        let leftRelative= left/ targetSlider.offsetWidth;        
        let approximateValue= leftRelative*(this.steps-1)        
        let value= Math.round(approximateValue)
        
        this.value=value;
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
      this.elem.addEventListener('slider-change', (event) => {
        console.log(event.detail);
      });
    });
  }

  // функция к моему варианту getCoords(elem) {
  //   let box = elem.getBoundingClientRect();
  //   return {
  //     right: box.right + window.scrollX,
  //     left: box.left + window.scrollY
  //   };
  // }
}
