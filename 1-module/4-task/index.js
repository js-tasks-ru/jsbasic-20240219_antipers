function checkSpam(str) {

  //  через тернарный оператор

  //let strLower = str.toLowerCase();
  // let spamWord1 = '1xBet'.toLowerCase();
  // let spamWord2 = 'XXX'.toLowerCase();
  //  return (strLower.includes(spamWord1) || strLower.includes(spamWord2)) ? true : false;

  //через функцию конвертор. Не знаю есть ли от этого преимущество, но попрактиковался :) 
  let strLower = convertor(str);
  let spamWord1 = '1xBet';
  let spamWord2 = 'XXX';
  return (strLower.includes(convertor(spamWord1)) || strLower.includes(convertor(spamWord2))) ? true : false;
  

  // Вариант через if
  //if ((strLower.includes(spamWord1))  || (strLower.includes(spamWord2))) {
  //   return true;
  // }
  // else return false;
}

console.log(checkSpam('1XBET'));



function convertor(string) {
  return string.toLowerCase()
}