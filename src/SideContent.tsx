import React from 'react';
import Typography from '@material-ui/core/Typography';
import Colors from './Colors';
import SortingAlgorithms from './SortingAlgorithms';

type Props = {
  selectedAlgorithm: number
}
type Styles = {
  outerContainer: object,
  innerContainer: object,
  about: object,
  title: object,
  algorithmns: object,
  complexity: object,
  algorithmsContainer: object,
  pseudoCodeOuterContainer: object,
  pseudoCodeTitle: object,
  pseudoCodeInnerContainer: object,
  line: object,
  lineNumber: object,
  lineCode: object,
};

const styles: Styles = {
  outerContainer: {
    position: 'relative',
    display: 'inline-grid',
    minWidth: '400px',
    height: '100%',
    backgroundColor: Colors.lightGrey,
    borderBottomLeftRadius: '5px',
  },
  innerContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    height: '-webkit-fill-available',
    width: '-webkit-fill-available',
  },
  about: {
    position: 'relative',
    display: 'block',
    flex: '0 auto',
  },
  title: {
    marginBottom: '15px',
  },
  complexity: {
    display: 'block',
    marginBottom: '-10px',
  },
  algorithmsContainer: {
    marginTop: '20px',
    marginBottom: '20px',
    padding: '5px',
    borderRadius: '5px',
    backgroundColor: Colors.lighterGrey,
  },
  algorithmns: {
    padding: '5px',
    margin: '10px',
  },
  pseudoCodeOuterContainer: {
    display: 'block',
    position: 'relative',
    height: 'auto',
    marginTop: '50px',
    flex: '0 1 auto',
    borderRadius: '5px',
    overflow: 'hidden',
    color: Colors.grey,
  },
  pseudoCodeTitle: {
    display: 'block',
    position: 'relative',
    height: 'fit-content',
    padding: '10px',
    backgroundColor: Colors.lighterGrey,
  },
  pseudoCodeInnerContainer: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    padding: '10px',
    backgroundColor: Colors.evenLighterGrey,
    fontFamily: 'Source Code Pro,Inconsolata,Monaco,Consolas,Courier New,Courier,monospace',
    fontSize: '0.9em',
  },
  line: {
    flex: '0 1 auto',
    display: 'block',
    position: 'relative',
    height: 'fit-content',
    padding: '5px',
    backgroundColor: Colors.evenLighterGrey,
  },
  lineNumber: {
    display: 'inline-block',
    position: 'absolute',
    height: 'fit-content',
    color: Colors.almostWhiteGrey,
    userSelect: 'none',
  },
  lineCode: {
    display: 'inline-block',
    position: 'relative',
    height: 'fit-content',
    marginLeft: '15px',
  },
};

function aboutAlgorithm(name: string, complexity: string[], about: string) {
  return (
    <div style={styles.about}>
      <Typography style={styles.title} variant='h3'>{name}</Typography>
      <Typography >{about}</Typography>
      <Typography style={styles.complexity} variant="overline" gutterBottom>{`Time : O(${complexity[0]})`}</Typography>
      <Typography style={styles.complexity} variant="overline" gutterBottom>{`Space : O(${complexity[1]})`}</Typography>
    </div>
  );
}

function getNumberTabs(code: string): number {
  return code.split('\t').length - 1;
}

function pseudoCode(code: string[]) {
  const codeComponent: React.element[] = code.map((line, index) => {
    return (
      <div key={index} style={styles.line}>
        <div style={styles.lineNumber}>{index}</div>
        <div style={styles.lineCode}>{'\u00A0'.repeat(getNumberTabs(line) * 2) + line}</div>
      </div>);
  });
  return (
    <div style={styles.pseudoCodeOuterContainer}>
      <div style={styles.pseudoCodeTitle}>
        <Typography>
          Pseudocode
        </Typography>
      </div>
      <div style={styles.pseudoCodeInnerContainer}>
        {codeComponent}
      </div>
    </div>
  );
}

function getWelcomeContent() {
  const algorithms = SortingAlgorithms.map((algo, index) => {
    return (<Typography key={index} style={styles.algorithmns}>{algo[0]}</Typography>);
  });
  return (
    <div style={styles.about}>
      <Typography style={styles.title} variant='h3'>Welcome!</Typography>
      <Typography >Sort Visualizer is an interactive web app to visualize how a data set is modified by a few popular sorting algorithm. Each data element is represented by an angled bar. Small elements have are angled to the left while larger elements are angled to the right.</Typography>
      <Typography >Visualize sorting algorithms from the following:</Typography>
      <div style={styles.algorithmsContainer}>
        {algorithms}
      </div>
      <Typography variant='h3'>Get started</Typography>
      <Typography style={styles.algorithmns}>1. Click on SORTING ALGORITHMS</Typography>
      <Typography style={styles.algorithmns}>2. Choose an algorithm</Typography>
      <Typography style={styles.algorithmns}>3. Click on SHUFFLE & RUN!</Typography>
    </div>
  );
}


function SideContent(props: Props) {
  const {selectedAlgorithm} = props;
  let topSection: React.element = '';
  let bottomSection: React.element = '';
  switch (SortingAlgorithms[selectedAlgorithm][0]) {
    case 'Sorting Algorithms':
      topSection = getWelcomeContent();
      break;
    case 'Bubble Sort':
      topSection = aboutAlgorithm('Bubble Sort', ['N\u00B2', '1'], 'Each pair of adjacent elements is compared and the elements are swapped if they are not in order.');
      bottomSection = pseudoCode(['for i from 1 to N', '\tfor j from 0 to N-1-i', '\t\tif array[j] > array[j+1]', '\t\t\tswap(array[j], array[j+1])']);
      break;
    case 'Selection Sort':
      topSection = aboutAlgorithm('Selection Sort', ['N\u00B2', '1'], 'The smallest element in the unsorted array is moved at the end of a sorted array.');
      bottomSection = pseudoCode(['for i from 1 to N', '\tmin = i', '\tfor j from i to N', '\t\tif array[j] < array[min]', '\t\t\tmin = j', '\tswap(array[i], array[min])']);
      break;
    case 'Insertion Sort':
      topSection = aboutAlgorithm('Insertion Sort', ['NlogN', '1'], 'Each element is positioned in the array such that every element on it\'s left are smaller.');
      bottomSection = pseudoCode(['for i from 1 to N', '\tkey = array[i]', '\tj = i - 1', '\twhile j >= 0 and array[j] > key', '\t\tarray[j+1] = array[j]', '\t\tj = j - 1', '\tarray[j+1] = key']);
      break;
    case 'Merge Sort':
      topSection = aboutAlgorithm('Merge Sort', ['NlogN', 'N'], 'The array is broken into two smaller arrays of roughly the same size, and then use merge sort recursively on the subarrays.');
      bottomSection = pseudoCode(['func mergesort(array)', '\tif (n == 1) return array', '\tl1 = mergesort(array[0] ... array[n/2])', '\tl2 = mergesort(array[n/2+1] ... array[n])', '\treturn merge(l1, l2)', '', 'func merge(l1, l2)', '\tres = []', '\twhile (l1 and l2 have elements)', '\t\tif (l1[0] < l2[0])', '\t\t\tadd l1[0] to the end of res', '\t\t\tremove l1[0] from l1', '\t\telse', '\t\t\tadd l2[0] to the end of res', '\t\t\tremove l2[0] from l2', '\twhile (l1 has elements)', '\t\tadd l1[0] to the end of res', '\t\tremove l1[0] from l1', '\twhile (l2 has elements)', '\t\tadd l2[0] to the end of res', '\t\tremove l2[0] from l2', '\treturn res']);
      break;
    case 'Quick Sort':
      topSection = aboutAlgorithm('Quick Sort', ['NlogN', 'N'], 'The array is partitioned into two parts, then sorting the parts independently. Partioning is the key to this algorithm. Each element is compared against the pivot: a element picked at random. the elements are swapped such that the elements on the left of the pivot are smaller and the element on the right are larger.');
      bottomSection = pseudoCode(['fun quicksort(array, left, right)', '\tif (left < right)', '\t\tpivot_index = partition(array, left, right)', '\t\tquicksort(array,left, pivot_index-1)', '\t\tquicksort(arry, pivot_index, right)', '', 'fun partition(array, left, right)', '\tpivot = array[right]', '\tleftwall = left - 1', '\tfor i = left to right', '\t\tif (array[i] < pivot) then', '\t\t\tleftwall = leftwall + 1', '\t\t\tswap(array[i], array[leftwall])', '\t\tswap(pivot, array[leftwall])', '\treturn leftwall']);
      break;
    case 'Heap Sort':
      topSection = aboutAlgorithm('Heap Sort', ['NlogN', 'N'], 'The array is first turned into a max heap, The algorithm then repeatedly swaps the first value of the array with the last value, decreasing the range of values considered in the heap operation by one, and sifting the new first value into its position in the heap. This repeats until the range of considered values is one value in length.');
      bottomSection = pseudoCode(['heapsort(array)', '\tbuildHeap(array)', 'f\tor i = n to 1', '\t\tswap(A[1], A[i])', '\t\tHeapify(A, 1)', '', 'buildHeap(A as array)', '\tn = array.length', '\tfor i = floor(n/2) to 1', '\t\tHeapify(A,i,n)', '', 'heapify(array, i, n)', '\tleft = 2i', '\tright = 2i+1', '\tmax = i', '\tif (left < n) and (array[i] < array[left])', '\t\tmax = left', '\telse', '\t\tmax = i', '\tif (right<n) and (array[max] < A[right])', '\t\tmax = right', '\tif (max != i)', '\t\tswap(array[i], array[max])', '\t\theapify(array, max)']);
      break;
    default:
      break;
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.innerContainer}>
        {topSection}
        {bottomSection}
      </div>
    </div>
  );
};

export default SideContent;
