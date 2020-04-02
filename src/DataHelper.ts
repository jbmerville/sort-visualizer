// eslint-disable-next-line no-unused-vars
import Bar from './Bar';
import Colors from './Colors';
import {spacing} from './index';

export function getInitialAngle(barsCount: number, index: number): number {
  return (- Math.floor(barsCount / 2) + index);
}

export function getInitialPosition(index: number): number {
  return index * spacing;
}
export function mark(data: Bar[], setData:(data: Bar[], customeTime?: number) => void, toMark: object, customeTime?: number) {
  for (const index in toMark) {
    if (toMark.hasOwnProperty(index)) {
      const bar = data[index];
      bar.highlight(toMark[index]);
    }
  }
  if (customeTime) {
    return setData(data, customeTime);
  }
  return setData(data);
}

export function markAll(data: Bar[], setData:(data: Bar[], customeTime?: number) => void, bounds: number[][], color: string, customeTime?: number) {
  for (const bound of bounds) {
    for (let i: number = bound[0]; i < bound[1]; i++) {
      data[i].highlight(color);
    }
  }
  if (customeTime) {
    return setData(data, customeTime);
  }
  return setData(data);
}

export function select(data: Bar[], setData:(data: Bar[]) => void, index1: number, index2: number) {
  if (data[index1].angle < data[index2].angle) {
    data[index1].highlight(Colors.green);
    data[index2].highlight(Colors.green);
  } else {
    data[index1].highlight(Colors.red);
    data[index2].highlight(Colors.red);
  }
  return setData(data);
}

export function unselect(data: Bar[], setData:(data: Bar[], customeTime?: number) => void, index1: number, index2: number, customeTime?: number) {
  data[index1].highlight(Colors.black);
  data[index2].highlight(Colors.black);
  if (customeTime) {
    return setData(data, customeTime);
  }
  return setData(data);
}

export async function swap(data: Bar[], setData:(data: Bar[]) => void, index1: number, index2: number) {
  const tempPosition = data[index1].position;
  data[index1].position = data[index2].position;
  data[index2].position = tempPosition;
  await setData(data);
  const temp = data[index1];
  data[index1] = data[index2];
  data[index2] = temp;
  return setData(data);
}

export async function reset(data: Bar[], setData:(data: Bar[]) => void, newLength: number = data.length) {
  const newData: Bar[] = [];
  for (let index: number = 0; index < newLength; index ++) {
    newData.push(new Bar(getInitialAngle(newLength, index), getInitialPosition(index)));
  }
  await setData(newData);
}
