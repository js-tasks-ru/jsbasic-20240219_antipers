let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false,
}

function sumSalary(salaries) {
  let cash = 0;
  for (let key in salaries) {
    if (Number.isFinite(salaries[key])) {
      cash += salaries[key];
    }
  }
  if (cash === 0) { return 0 }
  else return cash
}