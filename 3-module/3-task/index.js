function camelize(str) {
  let newArr = str.split('-')
  if (str.length === 0) {
    return str;
  }
  if (string[0] === '-') {
    for (let index = 0; index < newArr.length; index++) {
      let currentWord = newArr[index];
      if (currentWord === '') {
        continue
      }
      let firstLetter = currentWord.slice(0, 1).toUpperCase();
      let enchWord = firstLetter + currentWord.slice(1);
      newArr[index] = enchWord;
    }
  } else {
    for (let index = 1; index < newArr.length; index++) {
      let currentWord = newArr[index];
      let firstLetter = currentWord.slice(0, 1).toUpperCase();
      let enchWord = firstLetter + currentWord.slice(1);
      newArr[index] = enchWord;
    }
  }
  return newArr.join('');
}

let string = 'list-style-image';
camelize(string);



// короткая запись
// function camelize(str) {
//   let arr = str.match(/-./g).map(userObj => userObj.toUpperCase())
//   return arr
// }


//let fff = str.match(/\W\w/g).map(userObj => userObj.toUpperCase());

//let temp = newArr.join(fff[1].toUpperCase());


// let upper = arr.map((userObj) => {
//   return userObj.toUpperCase()
// })