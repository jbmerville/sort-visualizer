import React from 'react';
import Typography from '@material-ui/core/Typography';
import Colors from './Colors';

type Props = {
  selectedAlgorithm: number
}
type Styles = {
  outerContainer: object,
  innerContainer: object,
  about: object,
  complexity: object,
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
    display: 'flex',
    minWidth: '400px',
    flexDirection: 'row',
    flexBasis: '400px',
    height: '100%',
    backgroundColor: Colors.lightGrey,
    borderBottomLeftRadius: '5px',
  },
  innerContainer: {
    position: 'relative',
    display: 'block',
    padding: '20px',
    height: '100%',
    width: '100%',
  },
  about: {
    position: 'relative',
    display: 'block',
  },
  complexity: {
    display: 'block',
    marginBottom: '-10px',
  },
  pseudoCodeOuterContainer: {
    display: 'block',
    position: 'relative',
    height: 'fit-content',
    width: '-webkit-fit-available',
    marginTop: '50px',
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
    display: 'block',
    position: 'relative',
    height: 'fit-content',
    padding: '10px',
    backgroundColor: Colors.evenLighterGrey,
    fontFamily: 'Source Code Pro,Inconsolata,Monaco,Consolas,Courier New,Courier,monospace',
    fontSize: '0.9em',
  },
  line: {
    display: 'block',
    position: 'relative',
    height: 'fit-content',
    padding: '5px',
    backgroundColor: Colors.evenLighterGrey,
  },
  lineNumber: {
    display: 'inline-block',
    position: 'relative',
    height: 'fit-content',
    marginRight: '15px',
    color: Colors.almostWhiteGrey,
    userSelect: 'none',
  },
  lineCode: {
    display: 'inline-block',
    position: 'relative',
    height: 'fit-content',
  },
};

function aboutAlgorithm(name: string, complexity: string[], about: string) {
  return (
    <div style={styles.about}>
      <Typography variant='h3'>{name}</Typography>
      <Typography>{about}</Typography>
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
        <div style={{...styles.lineNumber, marginRight: `${15 + getNumberTabs(line) * 15}px`}}>{index}</div>
        <div style={styles.lineCode}>{line}</div>
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


function SideContent(props: Props) {
  const {selectedAlgorithm} = props;
  let topSection: React.element = '';
  let bottomSection: React.element = '';
  switch (selectedAlgorithm) {
    case 1:
      topSection = aboutAlgorithm('Bubble Sort', ['N\u00B2', '1'], 'Each pair of adjacent elements is compared and the elements are swapped if they are not in order.');
      bottomSection = pseudoCode(['for i from 1 to N', '\tfor j from 0 to N-1-i', '\t\tif array[j] > array[j+1]', '\t\t\tswap(array[j], array[j+1])']);
      break;
    case 2:
      topSection = aboutAlgorithm('Selection Sort', ['N\u00B2', '1'], 'Each element is positioned in the array such that every element on it\'s left are smaller.');
      bottomSection = pseudoCode(['for i from 1 to N', '\tmin = i', '\tfor j from i to N', '\t\tif array[j] < array[min]', '\t\t\tmin = j', '\tswap(array[i], array[min])']);
      break;
    case 3:
      topSection = aboutAlgorithm('Insertion Sort', ['N\u00B2', '1'], 'Each element is positioned in the array such that every element on it\'s left are smaller.');
      bottomSection = pseudoCode(['for i from 1 to N', '\tkey = array[i]', '\tj = i - 1', '\twhile j >= 0 and array[j] > key', '\t\tarray[j+1] = array[j]', '\t\tj = j - 1', '\tarray[j+1] = key']);
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
}

export default SideContent;
