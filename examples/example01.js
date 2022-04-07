const { Bench } = require('../src');

function init() {
  return [7, 12, 0, -3, 4, 9, 11, 5, 3, 6, -2, 8];
}

function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    for (let j = 1; j <= i; j += 1) {
      if (arr[j - 1] > arr[j]) {
        // eslint-disable-next-line no-param-reassign
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      }
    }
  }
  return arr;
}

(async () => {
  const bench = new Bench({ duration: 50 });
  bench.add('Bubble', bubbleSort, init);
  const result = await bench.measure(bench.algorithms[0]);
  console.log(result);
})();
