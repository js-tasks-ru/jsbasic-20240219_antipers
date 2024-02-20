function ucFirst(str) {
  if (str == "") {
    return str = "";
  }
  else {
    let firstLetter = str[0].toUpperCase();
    let newStr = firstLetter + str.slice(1);
    return newStr;
  }
}


console.log(ucFirst(" "))