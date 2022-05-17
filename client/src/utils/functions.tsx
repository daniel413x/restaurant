export function makeId(string: string) {
  const id = string.toLowerCase().split(' ').join(' ');
  return id;
}

export function standardizePriceFormat(price: number, discount?: number) {
  let returnedPrice = price;
  if (discount) {
    returnedPrice = ((price) * (100 - (discount * 100)));
    returnedPrice *= 0.01;
  }
  return `$${returnedPrice.toFixed(2)}`;
}
