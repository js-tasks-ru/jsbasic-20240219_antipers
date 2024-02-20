function truncate(str, maxlength) {
  //Вариант 1

  // if (str.length > maxlength) {
  //   let shortString = str.slice(0, maxlength-1) + "…";
  //   return shortString;
  // }
  // else return str;

//Вариант 2

  let shortString;
  return (str.length > maxlength) ?  shortString = str.slice(0, maxlength-1) + "…" : str ;
}


