import React from 'react';
import {Button} from '@material-ui/core';
import Styles from './Styles';

function Menu(props) {
  const {data, onChange} = props;
  const styles: Styles = {
    container: {
      position: 'relative',
      display: 'block',
      height: '300px',
      width: '100%',
    },
  };

  function shuffle() {
    let j; let x; let i;
    for (i = data.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = data[i];
      data[i] = data[j];
      data[j] = x;
    }
    onChange([...data]);
  }

  return (
    <div style={styles.container}>
      <Button color="primary" onClick={shuffle}>Shuffle</Button>
    </div>
  );
}


export default Menu;

