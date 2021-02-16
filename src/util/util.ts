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

// Return val >= 0 and < max
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
        return zeroPad(Math.round(parseInt(`0x${hex}`) * 0.9).toString(16), 2);
      })
      .join('')
  );
}

export function zeroPad(number: number | string, length: number) {
  const s = `${number}`;
  const zeros = new Array(length - s.length).fill('0').join('');
  return zeros + s;
}

export function sameDay(a: Date, b: Date): boolean {
  return localDateString(a) == localDateString(b);
}

// Returns as YYYY-MM-DD
export function localDateString(date: Date): string {
  return (
    zeroPad(date.getFullYear(), 4) +
    '-' +
    zeroPad(date.getMonth() + 1, 2) +
    '-' +
    zeroPad(date.getDate(), 2)
  );
}

export function utcDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function localDateFromString(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function isInt(x: unknown) {
  return parseInt(`${x}`) === x;
}

// export function discriminate<T>(list: T[], discriminator: (item: T)=>boolean): [T[], T[]] {
//   const pass: T[] = [];
//   const fail: T[] = [];
//   list.forEach(item => discriminator(item) ? pass.push(item) : fail.push(item))
//   return [pass, fail]
// }

export function colorizeSvg(svg: string, color: string) {
  return svg.replace(/#ffffff/g, color);
}

export function count<T>(list: T[], itemToFind: T): number {
  return list.reduce(
    (count, item) => (item === itemToFind ? count + 1 : count),
    0,
  );
}
