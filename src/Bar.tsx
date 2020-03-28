import React from 'react';
import Styles from './Styles';

class Bar {
    angle: number;
    hightlight: string;

    constructor(angle: number) {
      this.angle = angle;
      this.hightlight = 'black';
    }

    getComponent() {
      const styles: Styles = {
        container: {
          position: 'relative',
          display: 'inline-block',
          height: '100%',
          width: '6px',
          borderRadius: '3px',
          marginRight: '15px',
          transformOrigin: 'bottom left',
          background: this.hightlight,
          transform: `rotate(${this.angle}deg)`,
        },
      };

      return (<div key={this.angle} style={styles.container}></div>);
    }
};

export default Bar;
