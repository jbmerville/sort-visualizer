import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Styles from './Styles';
import Bar from './Bar';

function Header(props) {
  const {data, setData, numberBars, setNumberBars, generateNewData} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const styles: Styles = {
    outerContainer: {
      position: 'relative',
      display: 'block',
      width: '100%',
      background: '#333',
      color: 'white',
      boxShadow: 'none',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
    },
    element1: {
      marginRight: '50px',
    },
    element2: {
      marginRight: '50px',
    },
    element3: {
      position: 'relative',
      marginRight: '-35px',
      top: '-2px',
    },
    element4: {
      position: 'relative',
      width: '200px',
      marginRight: '50px',
      top: '12px',
      color: '#999',
    },
    element5: {
      position: 'absolute',
      top: '5px',
      right: '20px',
      color: '#999',
      fontSize: '0.875rem',
    },
    element6: {
      top: '4px',
    },
  };

  const options = [
    'Sorting Algorithms',
    'Bubble Sort',
    'Selection Sort',
    'Insertion Sort',
    'Merge Sort',
    'Quick Sort',
    'Heap Sort',
  ];

  function shuffle() {
    let j; let x; let i;
    for (i = data.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = data[i].position;
      data[i].position = data[j].position;
      data[j].position = x;
    }
    setData([...data]);
  }

  function onNumberBarsChange(event: any, newValue: number | number[]) {
    generateNewData(newValue);
  }

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={styles.outerContainer}>
      <Toolbar>
        <Typography variant="h6" style={styles.element1}>
            Sort Visualizer
        </Typography>
        <Button
          variant='contained'
          style={styles.element2}
          onClick={shuffle}>Shuffle & Run!
        </Button>
        <Typography style={styles.element3} variant='button' gutterBottom>
            Size
        </Typography>
        <Slider
          style={styles.element4}
          value={numberBars}
          onChange={onNumberBarsChange}
          valueLabelDisplay="auto"
          aria-labelledby="continuous-slider"
          min={5}
        />
        <List
          style={styles.element5}
          component="nav"
          aria-label="Device settings"
        >
          <Button
            variant='contained'
            onClick={handleClickListItem}
          >
            {options[selectedIndex]}
          </Button>
        </List>
        <Menu
          style={styles.element6}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

