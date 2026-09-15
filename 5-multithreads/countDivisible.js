export function countDivisible({ divisor = 1, array = [] }) {
  if (divisor === 1) return array.length;
  var result = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % divisor === 0) {
      result += 1;
    }
  }
  return result;
}
