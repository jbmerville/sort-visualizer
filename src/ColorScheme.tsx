import React from 'react';
import Colors from './Colors';
import Typography from '@material-ui/core/Typography';

type Props = {
  selectedAlgorithm: number,
};

type Style = {
    outerContainer: object,
    innerContainer: object,
    color: object,
    text: object,
};

const styles: Style = {
  outerContainer: {
    display: 'block',
    position: 'absolute',
    height: 'fit-content',
    width: 'fit-content',
    left: '10px',
    bottom: '10px',
  },
  innerContainer: {
    position: 'relative',
    marginTop: '5px',
  },
  color: {
    position: 'relative',
    display: 'inline-block',
    height: '4px',
    width: '20px',
    borderRadius: '2px',
    top: '-1px',
    marginRight: '10px',

  },
  text: {
    position: 'relative',
    display: 'inline-block',
  },
};

const makeColor = (color: string, text: string) => {
  return (
    <div style={styles.innerContainer}>
      <div style={{...styles.color, backgroundColor: color}}/>
      <Typography style={styles.text} variant='subtitle2'>
        {text}
      </Typography>
    </div>
  );
};


export default function ColorScheme(props: Props) {
  const {selectedAlgorithm} = props;
  const component: React.element[] = [];
  if (selectedAlgorithm == 1) {
    component.push(makeColor(Colors.green, 'sorted'));
  } else if (selectedAlgorithm == 2) {
    component.push(makeColor(Colors.green, 'minimum'));
  }
  if (selectedAlgorithm == 1) {
    component.push(makeColor(Colors.red, 'unsorted'));
  }
  if (selectedAlgorithm == 2) {
    component.push(makeColor(Colors.lightBlue, 'visiting'));
  }
  return (
    <div style={styles.outerContainer}>
      {component}
    </div>
  );
}
