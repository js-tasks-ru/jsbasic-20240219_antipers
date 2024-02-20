/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  let regexp = /\s/;
  //  Вариант 1 обычный c if

  // if ((name == null) || (name.length < 4) || (name.match(regexp))) {
  //   return false;
  // } else {
  //   return true;
  // }

  //Вариант 2 с тернарным оператором-- 
  return ((name == null)) || (name.length < 4) || (name.match(regexp) ) ? false : true;

}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}


sayHello();