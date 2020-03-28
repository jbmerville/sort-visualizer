import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Styles from './Styles';

function Menu(props) {
  const {data, onChange} = props;
  const styles: Styles = {
    outerContainer: {
      position: 'relative',
      display: 'block',
      width: '100%',
      background: '#333',
      color: 'white',
    },
    element1: {
      marginRight: '50px',
    },
  };

  function shuffle() {
    let j; let x; let i;
    for (i = data.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = data[i].position;
      data[i].position = data[j].position;
      data[j].position = x;
    }
    onChange([...data]);
  }

  return (
    <AppBar position="static" style={styles.outerContainer}>
      <Toolbar>
        <Typography variant="h6" style={styles.element1}>
            Sort Visualizer
        </Typography>
        <Button color="inherit" style={styles.element2} onClick={shuffle}>Shuffle</Button>
      </Toolbar>
    </AppBar>
  );
}


export default Menu;

