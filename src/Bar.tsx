import React from 'react';
import Styles from './Styles';

class Bar {
    angle: number;
    hightlight: string;
    position: number;

    constructor(angle: number, position: number) {
      this.angle = angle;
      this.position = position;
      this.hightlight = 'black';
    }

    getComponent() {
      const styles: Styles = {
        outerContainer: {
          position: 'absolute',
          display: 'inline-block',
          height: '100%',
          width: '3px',
          left: this.position,
          borderRadius: '3px',
          marginRight: '10px',
          transformOrigin: 'bottom left',
          background: this.hightlight,
          transform: `rotate(${this.angle}deg)`,
          transition: 'linear',
          transitionDuration: '0.3s',
        },
      };

      return (<div key={this.angle} style={styles.outerContainer}></div>);
    }
};

export default Bar;
