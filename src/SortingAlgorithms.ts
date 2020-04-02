// eslint-disable-next-line no-unused-vars
import Bar from './Bar';
import {mark, swap, select, unselect, markAll, reset} from './DataHelper';
import Colors from './Colors';

async function bubbleSort(data: Bar[], setData: (data: Bar[], customeTime?: number) => void, setIsPlaying: (isPlaying: boolean) => void, playing) {
  setIsPlaying(true);
  for (let i = 0; i < data.length - 1; i ++) {
    for (let j = 0; j < data.length - i - 1; j ++) {
      if (!playing.current) return await reset(data, setData);
      await select(data, setData, j, j + 1);
      if (data[j].angle > data[j + 1].angle) {
        await swap(data, setData, j, j + 1);
      }
      await unselect(data, setData, j, j + 1);
    }
  }
  setIsPlaying(false);
}

async function selectionSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void, playing) {
  setIsPlaying(true);
  for (let i: number = 0; i < data.length - 1; i ++) {
    let minimum: number = i;
    let previous: number = i;
    for (let j: number = i; j < data.length; j ++) {
      if (!playing.current) return await reset(data, setData);
      if (data[j].angle < data[minimum].angle) {
        await mark(data, setData, {[j as number]: Colors.green, [minimum as number]: Colors.black});
        minimum = j;
      } else {
        if (j === i) {
          await mark(data, setData, {[j as number]: Colors.lightBlue});
        } else {
          await mark(data, setData, {[j as number]: Colors.lightBlue, [previous as number]: 'black'});
        }
        previous = j;
      }
    }
    await swap(data, setData, i, minimum);
    await mark(data, setData, {[i as number]: Colors.black, [minimum as number]: Colors.black, [previous as number]: Colors.black});
  }
  setIsPlaying(false);
}

async function insertionSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void, playing) {
  setIsPlaying(true);
  for (let i: number = 1; i < data.length; i ++) {
    let j = i - 1;
    await mark(data, setData, {[i as number]: Colors.lightBlue}, 0);
    while (j >= 0 && data[j].angle > data[j+1].angle) {
      if (!playing.current) return await reset(data, setData);
      await mark(data, setData, {[j as number]: Colors.red});
      if (data[j].angle > data[j+1].angle) {
        await swap(data, setData, j, j+1);
      }
      if (j >= 1 && data[j-1].angle > data[j].angle) {
        await mark(data, setData, {[j as number]: Colors.lightBlue, [j+1 as number]: Colors.black}, 0);
      }
      j--;
    }
    await mark(data, setData, {[j+1 as number]: Colors.green, [j+2 as number]: Colors.green});
    await mark(data, setData, {[j+1 as number]: Colors.black, [j+2 as number]: Colors.black}, 0);
  }
  setIsPlaying(false);
}

async function mergeSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void, playing) {
  setIsPlaying(true);
  await mergeSortHelper(data, setData, 0, data.length - 1, playing);
  if (!playing.current) return await reset(data, setData);
  setIsPlaying(false);
}

async function mergeSortHelper(data: Bar[], setData: (data: Bar[]) => void, left: number, right: number, playing) {
  // left and right are inclusif
  await markAll(data, setData, [[0, left -1], [right+1, data.length]], Colors.lightGrey, 0);
  if (!playing.current) return;
  if (left === right) {
    await mark(data, setData, {[left as number]: Colors.green});
    await mark(data, setData, {[left as number]: Colors.lightGrey});
    return;
  }
  const mid = Math.floor((left + right) / 2);
  await mergeSortHelper(data, setData, left, mid, playing);
  if (!playing.current) return;
  await mergeSortHelper(data, setData, mid + 1, right, playing);
  if (!playing.current) return;
  await merge(data, setData, left, mid, right, playing);
}

async function merge(data: Bar[], setData: (data: Bar[]) => void, left: number, mid: number, right: number, playing) {
  await markAll(data, setData, [[left, right]], Colors.black, 0);
  const start = left;
  while (left < right) {
    let min = left;
    for (let i: number = left; i <= right; i++) {
      if (!playing.current) return;
      if (data[i].angle < data[min].angle) {
        min = i;
      }
    }
    if (min === left) {
    } else {
      await select(data, setData, left, min);
      if (data[left].angle > data[min].angle) {
        await swap(data, setData, left, min);
      }
      await unselect(data, setData, left, min, 0);
    }

    left ++;
  }
  await markAll(data, setData, [[start, right+1]], Colors.green);
  await markAll(data, setData, [[start, right+1]], Colors.black, 0);
}

async function quickSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void, playing) {
  setIsPlaying(true);
  await quickSortHelper(data, setData, 0, data.length - 1, playing);
  if (!playing.current) return await reset(data, setData);
  await markAll(data, setData, [[0, data.length]], Colors.black, 0);
  setIsPlaying(false);
}

async function quickSortHelper(data: Bar[], setData: (data: Bar[]) => void, low: number, high: number, playing) {
  await markAll(data, setData, [[0, low -1], [high+1, data.length]], Colors.lightGrey, 0);
  if (low < high) {
    if (!playing.current) return;
    const pivot = await partition(data, setData, low, high, playing);
    await quickSortHelper(data, setData, low, pivot as number-1, playing);
    await quickSortHelper(data, setData, pivot as number, high, playing);
  }
}

async function partition(data: Bar[], setData: (data: Bar[]) => void, low: number, high: number, playing) {
  await markAll(data, setData, [[low, high]], Colors.black, 0);
  let leftwall = low - 1;
  const pivot = data[high].angle;
  await mark(data, setData, {[high as number]: Colors.lightBlue});
  for (let i: number = low; i <= high; i++) {
    if (!playing.current) return;
    if (data[i].angle < pivot) {
      leftwall++;
      await mark(data, setData, {[i as number]: Colors.red});
      await swap(data, setData, i, leftwall);
      await unselect(data, setData, i, leftwall, 0);
    } else {
      await mark(data, setData, {[i as number]: Colors.green});
      await mark(data, setData, {[i as number]: Colors.black}, 0);
    }
  }
  await swap(data, setData, high, leftwall + 1);
  return leftwall + 1;
}

async function heapSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void, playing) {
  setIsPlaying(true);
  await buildHeap(data, setData, playing);
  if (!playing.current) return await reset(data, setData);
  for (let i: number = data.length - 1; i > 0; i --) {
    if (!playing.current) return await reset(data, setData);
    await swap(data, setData, 0, i);
    await heapify(data, setData, i, 0, playing);
  }
  setIsPlaying(false);
}

async function buildHeap(data: Bar[], setData: (data: Bar[]) => void, playing) {
  for (let i: number = Math.floor(data.length / 2); i >= 0; i --) {
    await heapify(data, setData, data.length, i, playing);
    if (!playing.current) return;
  }
}

async function heapify(data: Bar[], setData: (data: Bar[]) => void, n: number, i: number, playing) {
  if (!playing.current) return;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let max = i;
  if (left < n && data[i].angle < data[left].angle) {
    max = left;
  }
  if (right < n && data[max].angle < data[right].angle) {
    max = right;
  }
  if (max != i) {
    await mark(data, setData, {[i as number]: Colors.red, [max as number]: Colors.red});
    await swap(data, setData, i, max);
    await unselect(data, setData, i, max, 0);
    await heapify(data, setData, n, max, playing);
  }
}
export default [
  ['Sorting Algorithms', bubbleSort],
  ['Bubble Sort', bubbleSort],
  ['Selection Sort', selectionSort],
  ['Insertion Sort', insertionSort],
  ['Merge Sort', mergeSort],
  ['Quick Sort', quickSort],
  ['Heap Sort', heapSort],
];
