function toggleText() {
  let btn = document.querySelector('.toggle-text-button')
  let needHideText = document.querySelector('#text')
  
  let btnHandler = function () {
    needHideText.hidden = !needHideText.hidden;

    // if (redFlag) {
    //   needHideText.hidden = true;
    //   redFlag = false;
    // } else {needHideText.hidden = false; redFlag = true}
  }
  btn.addEventListener('click', btnHandler)
}
