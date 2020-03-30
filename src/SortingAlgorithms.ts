// eslint-disable-next-line no-unused-vars
import Bar from './Bar';
import {mark, swap, select, unselect} from './DataHelper';
import Colors from './Colors';

export async function bubbleSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void) {
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

export async function selectionSort(data: Bar[], setData: (data: Bar[]) => void, setIsPlaying: (isPlaying: boolean) => void) {
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
