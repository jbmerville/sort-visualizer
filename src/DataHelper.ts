// eslint-disable-next-line no-unused-vars
import Bar from './Bar';


export function mark(data: Bar[], setData:(data: Bar[]) => void, toMark: object) {
  for (const index in toMark) {
    if (toMark.hasOwnProperty(index)) {
      const bar = data[index];
      bar.highlight(toMark[index]);
    }
  }
  return setData(data);
}

export function select(data: Bar[], setData:(data: Bar[]) => void, index1: number, index2: number) {
  if (data[index1].angle < data[index2].angle) {
    data[index1].highlight('#0db641');
    data[index2].highlight('#0db641');
  } else {
    data[index1].highlight('red');
    data[index2].highlight('red');
  }
  return setData(data);
}

export function unselect(data: Bar[], setData:(data: Bar[]) => void, index1: number, index2: number) {
  data[index1].highlight('black');
  data[index2].highlight('black');
  setData(data);
}

export async function swap(data: Bar[], setData:(data: Bar[]) => void, index1: number, index2: number) {
  const tempPosition = data[index1].position;
  data[index1].position = data[index2].position;
  data[index2].position = tempPosition;
  setData(data);
  const temp = data[index1];
  data[index1] = data[index2];
  data[index2] = temp;
  data[index1].highlight('#0db641');
  data[index2].highlight('#0db641');
  return setData(data);
}
