// eslint-disable-next-line no-unused-vars
import Bar from './Bar';
import {mark, swap, select, unselect, markAll} from './DataHelper';
import Colors from './Colors';

async function bubbleSort(data: Bar[], setData: (data: Bar[], customeTime?: number) => void, setIsPlaying: (isPlaying: boolean) => void) {
  setIsPlaying(true);
  for (let i = 0; i < data.length - 1; i ++) {
    for (let j = 0; j < data.length - i - 1; j ++) {
      await select(data, setData, j, j + 1);
      if (data[j].angle > data[j + 1].angle) {
        await swap(data, setData, j, j + 1);
      }
      await unselect(data, setData, j, j + 1);
    }
  }
  setIsPlaying(false);
}

async function selectionSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void) {
  setIsPlaying(true);
  for (let i: number = 0; i < data.length - 1; i ++) {
    let minimum: number = i;
    let previous: number = i;
    for (let j: number = i; j < data.length; j ++) {
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

async function insertionSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void) {
  setIsPlaying(true);
  for (let i: number = 1; i < data.length; i ++) {
    let j = i - 1;
    await mark(data, setData, {[i as number]: Colors.lightBlue}, 0);
    while (j >= 0 && data[j].angle > data[j+1].angle) {
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

async function mergeSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void) {
  setIsPlaying(true);
  await mergeSortHelper(data, setData, 0, data.length - 1);
  setIsPlaying(false);
}

async function mergeSortHelper(data: Bar[], setData: (data: Bar[]) => void, left: number, right: number) {
  // left and right are inclusif
  await markAll(data, setData, [[0, left -1], [right+1, data.length]], Colors.lightGrey, 0);
  if (left === right) {
    await mark(data, setData, {[left as number]: Colors.green});
    await mark(data, setData, {[left as number]: Colors.lightGrey});
    return;
  }
  const mid = Math.floor((left + right) / 2);
  await mergeSortHelper(data, setData, left, mid);
  await mergeSortHelper(data, setData, mid + 1, right);
  await merge(data, setData, left, mid, right);
}

async function merge(data: Bar[], setData: (data: Bar[]) => void, left: number, mid: number, right: number) {
  await markAll(data, setData, [[left, right]], Colors.black, 0);
  const start = left;
  while (left < right) {
    let min = left;
    for (let i: number = left; i <= right; i++) {
      if (data[i].angle < data[min].angle) {
        min = i;
      }
    }
    if (min == left) {
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

async function quickSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void) {
  setIsPlaying(true);
  await quickSortHelper(data, setData, 0, data.length - 1);
  await markAll(data, setData, [[0, data.length]], Colors.black, 0);
  setIsPlaying(false);
}

async function quickSortHelper(data: Bar[], setData: (data: Bar[]) => void, low: number, high: number) {
  await markAll(data, setData, [[0, low -1], [high+1, data.length]], Colors.lightGrey, 0);
  if (low < high) {
    const pivot = await partition(data, setData, low, high);
    await quickSortHelper(data, setData, low, pivot-1);
    await quickSortHelper(data, setData, pivot, high);
  }
}

async function partition(data: Bar[], setData: (data: Bar[]) => void, low: number, high: number) {
  await markAll(data, setData, [[low, high]], Colors.black, 0);
  let leftwall = low - 1;
  const pivot = data[high].angle;
  await mark(data, setData, {[high as number]: Colors.lightBlue});
  for (let i: number = low; i <= high; i++) {
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

export default [
  ['Sorting Algorithms', bubbleSort],
  ['Bubble Sort', bubbleSort],
  ['Selection Sort', selectionSort],
  ['Insertion Sort', insertionSort],
  ['Merge Sort', mergeSort],
  ['Quick Sort', quickSort],
  ['Heap Sort', bubbleSort],
];
