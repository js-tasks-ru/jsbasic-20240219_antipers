function factorial(n) {
  for (let index = 0; index <= n; index++) {
    n *= n - index;
    
  }
  return n;
}

console.log(factorial(4));