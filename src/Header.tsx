import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// eslint-disable-next-line no-unused-vars
import Bar from './Bar';
import {bubbleSort, selectionSort} from './SortingAlgorithms';
import Colors from './Colors';

type Props = {
  data: Bar[],
  setData(data: Bar[]),
  numberBars: number,
  generateNewData: (newValue: number) => void,
  selectedAlgorithm: number,
  setSelectedAlgorithm: (selectedAlgorithm: number) => void,
};

type Styles = {
  outerContainer: object,
  title: object,
  runButton: object,
  sliderTitle: object,
  slider: object,
  algorithmsButton: object,
  algorithmsMenu: object,
}

function Header(props: Props) {
  const {data, setData, numberBars, generateNewData, selectedAlgorithm, setSelectedAlgorithm} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const options = [
    ['Sorting Algorithms', bubbleSort],
    ['Bubble Sort', bubbleSort],
    ['Selection Sort', selectionSort],
    ['Insertion Sort', bubbleSort],
    ['Merge Sort', bubbleSort],
    ['Quick Sort', bubbleSort],
    ['Heap Sort', bubbleSort],
  ];
  const styles: Styles = {
    outerContainer: {
      position: 'relative',
      display: 'block',
      width: '100%',
      background: Colors.primary,
      color: 'white',
      boxShadow: 'none',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
    },
    title: {
      marginRight: '50px',
    },
    runButton: {
      marginRight: '50px',
    },
    sliderTitle: {
      position: 'relative',
      marginRight: '-35px',
      top: '-2px',
    },
    slider: {
      position: 'relative',
      width: '200px',
      marginRight: '50px',
      top: '12px',
      color: Colors.secondary,
    },
    algorithmsButton: {
      position: 'absolute',
      top: '5px',
      right: '20px',
      color: '',
      fontSize: '0.875rem',
    },
    algorithmsMenu: {
      top: '4px',
    },
  };

  async function shuffle() {
    let j; let temp; let i;
    for (i = data.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = data[i].position;
      data[i].position = data[j].position;
      data[j].position = temp;
    }
    // swap position in the screen (animation)
    await setData(data);

    // swap position in the data[]
    data.sort((a, b) => (a.position > b.position) ? 1: -1);
    await setData(data);

    const algorithm = options[selectedAlgorithm][1] as (data: Bar[], setData: (data: Bar[]) => void ) => void;
    algorithm(data, setData);
  }

  function onNumberBarsChange(event: any, newValue: number | number[]): void {
    generateNewData(newValue as number);
  }

  const handleClickListItem = (event): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index): void => {
    setSelectedAlgorithm(index);
    setAnchorEl(null);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={styles.outerContainer}>
      <Toolbar>
        <Typography variant="h6" style={styles.title}>
            Sort Visualizer
        </Typography>
        <Button
          variant='contained'
          style={styles.runButton}
          onClick={shuffle}>Shuffle & Run!
        </Button>
        <Typography style={styles.sliderTitle} variant='button' gutterBottom>
            Size
        </Typography>
        <Slider
          style={styles.slider}
          value={numberBars}
          onChange={onNumberBarsChange}
          valueLabelDisplay="auto"
          aria-labelledby="continuous-slider"
          min={5}
        />
        <List
          style={styles.algorithmsButton}
          component="nav"
          aria-label="Device settings"
        >
          <Button
            variant='contained'
            onClick={handleClickListItem}
          >
            {options[selectedAlgorithm][0] as string}
          </Button>
        </List>
        <Menu
          style={styles.algorithmsMenu}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option[0] as string}
              disabled={index === 0}
              selected={index === selectedAlgorithm}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option[0] as string}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

