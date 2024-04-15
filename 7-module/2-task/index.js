import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {

    this.render()
    this.addEventListeners()
  }

  render() {
    let modall = createElement(`<div class="modal">
    
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div><div class="modal__body">
      </div>
    </div>

  </div>`)
    this.elem = modall
  }

  open() {

    document.body.append(this.elem)
    document.body.classList.add(`is-modal-open`)
  }
  setTitle(string) {
    this.string = string;
    let title = this.elem.querySelector('.modal__title')
    title.textContent = this.string;
  }

  setBody(element) {
    
    let text = this.elem.querySelector('.modal__body');
    text.innerHTML = "";
    text.append(element);
  }

  close() {
    document.body.classList.remove(`is-modal-open`)
    this.elem.remove()
  }

  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      let btnClose = event.target.closest('.modal__close');
      if (btnClose) {
        this.close()
      }
    })

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') { this.close() }
    })

  }
}
