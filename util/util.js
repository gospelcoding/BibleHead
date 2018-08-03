export function isValidInteger(str, options) {
  const n = parseInt(str);
  if (isNaN(n)) return false;
  if (options.min && n < options.min) return false;
  if (options.max && n > options.max) return false;
  return true;
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function swap(array, i, j) {
  if (i == j) return;
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; --i) {
    let swapIndex = randInt(i);
    swap(array, i, swapIndex);
  }
}

export function intArray(max) {
  let array = new Array(max);
  for (let i = 1; i <= max; ++i) {
    array[i - 1] = i;
  }
  return array;
}
