function factorial(n) {
  if (n === 0 || n === 1) {
    return n = 1;
  }
  else {
    for (let fact = n; fact >= 2; fact--) {
       n *= (fact - 1);
    }
    return n;
  }
}


//factorial(5)