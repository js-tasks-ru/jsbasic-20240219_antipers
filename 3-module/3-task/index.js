function camelize(str) {
  return str
    .split('-')
    .map((userObj, i) => i == 0 ? userObj : userObj.slice(0, 1).toUpperCase() + userObj.slice(1))
      .join('');
}

let string = '-webkit-transition';
console.log(camelize(string));

/*
вариант с костылями
function camelize(str) {
  let newArr = str.split('-')
  if (str.length === 0) {
    return str;
  }
      for (let index = 1; index < newArr.length; index++) {
      let currentWord = newArr[index];
      let firstLetter = currentWord.slice(0, 1).toUpperCase();
      let enchWord = firstLetter + currentWord.slice(1);
      newArr[index] = enchWord;
    }
  
  return newArr.join('');}*/
