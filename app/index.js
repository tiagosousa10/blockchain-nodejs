const sum = (a,b) => {
  if(a <= 0 || b <= 0) {
    throw new Error('a and b must be positive')
  } else {
    return a + b;
  }
}
