# @agarimo/bench
Benchmark code.

## Measure one algorithm

```javascript
const { Bench } = require('@agarimo/bench');

function init() {
  return [7, 12, 0, -3, 4, 9, 11, 5, 3, 6, -2, 8];
}

function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    for (let j = 1; j <= i; j += 1) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
      }
    }
  }
  return arr;
}

(async() => {
  const bench = new Bench({ duration: 50 });
  bench.add('Bubble', bubbleSort, init);
  const result = await bench.measure(bench.algorithms[0]);
  console.log(result);
})();
```

This will show this in console:
```
{                                             
  name: 'Bubble',                             
  runs: 149270,                               
  transactions: 149270,                       
  elapsed: 50.0001,                           
  timePerRun: 0.0003349641589066792,          
  timePerTransaction: 0.0003349641589066792,  
  runsPerSecond: 2985394.029211941,           
  transactionsPerSecond: 2985394.029211941,   
  resultIteration: [                          
    -3, -2, 0, 3, 4,                          
     5,  6, 7, 8, 9,                          
    11, 12                                    
  ]                                           
}
```                                            

## Bench several algorithms

```javascript
const { Bench } = require('@agarimo/bench');

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

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // eslint-disable-next-line no-param-reassign
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

(async () => {
  const bench = new Bench({ duration: 50 });
  bench.add('Bubble', bubbleSort, init);
  bench.add('Selection', selectionSort, init);
  const result = await bench.run();
  console.log(result);
})();
```

This will show in console:

```
[                                               
  {                                             
    name: 'Selection',                          
    runs: 152039,                               
    transactions: 152039,                       
    elapsed: 50,                                
    timePerRun: 0.00032886298910148054,         
    timePerTransaction: 0.00032886298910148054, 
    runsPerSecond: 3040780,                     
    transactionsPerSecond: 3040780,             
    resultIteration: [                          
      -3, -2, 0, 3, 4,                          
       5,  6, 7, 8, 9,                          
      11, 12                                    
    ]                                           
  },                                            
  {                                             
    name: 'Bubble',                             
    runs: 137003,                               
    transactions: 137003,                       
    elapsed: 50,                                
    timePerRun: 0.00036495551192309656,         
    timePerTransaction: 0.00036495551192309656, 
    runsPerSecond: 2740060,                     
    transactionsPerSecond: 2740060,             
    resultIteration: [                          
      -3, -2, 0, 3, 4,                          
       5,  6, 7, 8, 9,                          
      11, 12                                    
    ]                                           
  }                                             
]                                               
```