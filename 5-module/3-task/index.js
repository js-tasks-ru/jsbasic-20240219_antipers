function initCarousel() {
  let arrowRT = document.querySelector('.carousel__arrow_right');
  let arrowLT = document.querySelector('.carousel__arrow_left');
  let inner = document.querySelector('.carousel__inner');
  let counter = 1;
  let offsetInner = inner.offsetWidth;

  arrowLT.style.display = 'none';
  arrowRT.style.display = '';

  let arrowRtHandler = function () {
    switch (counter) {
      case 1:
        inner.style.transform = `translateX(-${offsetInner}px)`;
        counter++;
        arrowLT.style.display = '';
        break;
      case 2:
        inner.style.transform = `translateX(-${offsetInner * 2}px)`;
        counter++;
        break;
      case 3:
        inner.style.transform = `translateX(-${offsetInner * 3}px)`;
        counter++;
        arrowRT.style.display = 'none';
        break;
    }
  }

  let arrowLtHandler = function () {
    switch (counter) {
      case 4:
        inner.style.transform = `translateX(-${offsetInner * 2}px)`;
        counter--;
        arrowRT.style.display = '';
        break;
      case 3:
        inner.style.transform = `translateX(-${offsetInner}px)`;
        counter--;
        break;
      case 2:
        inner.style.transform = `translateX(0px)`;
        counter--;
        arrowLT.style.display = 'none';
        break;
    }
  }
  arrowRT.addEventListener('click', arrowRtHandler)
  arrowLT.addEventListener('click', arrowLtHandler)
}


// вариант с if

//let arrowRtHandler = function () {
// if (counter === 1) {
//   inner.style.transform = `translateX(-${offsetInner}px)`;
//   counter += 1;
//   arrowLT.style.display = '';
// }
// else if (counter === 2) {
//   inner.style.transform = `translateX(-${offsetInner *2}px)`;
//   counter += 1;
// }
// else if (counter === 3) {
//   inner.style.transform = `translateX(-${offsetInner *3}px)`;
//   counter += 1;
//   arrowRT.style.display = 'none';
// }
//}

//let arrowLtHandler = function () {
// if (counter === 4) {
//   inner.style.transform = `translateX(-${offsetInner * 2}px)`;
//   counter -= 1;
//   arrowRT.style.display = '';
// }
// else if (counter === 3) {
//   inner.style.transform = `translateX(-${offsetInner}px)`;
//   counter -= 1;
// }
// else if (counter === 2) {
//   inner.style.transform = `translateX(0px)`;
//   counter -= 1;
//   arrowLT.style.display = 'none';
// }
//}
