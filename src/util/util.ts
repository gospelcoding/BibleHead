export function isValidInteger(
  str: string,
  options: {min?: number; max?: number},
) {
  const n = parseInt(str);
  if (isNaN(n)) return false;
  if (options.min && n < options.min) return false;
  if (options.max && n > options.max) return false;
  return true;
}

export function randInt(max: number) {
  return Math.floor(Math.random() * max);
}

function swap<T>(array: T[], i: number, j: number) {
  if (i == j) return;
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; --i) {
    let swapIndex = randInt(i + 1);
    swap(array, i, swapIndex);
  }
}

export function intArray(min: number, max: number) {
  let array = new Array(max - min + 1);
  for (let i = min; i <= max; ++i) {
    array[i - min] = i;
  }
  return array;
}

export function aShadeDarker(color: string) {
  return (
    '#' +
    [color.slice(1, 3), color.slice(3, 5), color.slice(5, 7)]
      .map((hex) => {
        return Math.round(parseInt(`0x${hex}`) * 0.9).toString(16);
      })
      .join('')
  );
}

export function zeroPad(number: number, length: number) {
  const s = `${number}`;
  const zeros = new Array(length - s.length).fill('0').join('');
  return zeros + s;
}
