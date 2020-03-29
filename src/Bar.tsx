import React from 'react';

type Styles = {
  outerContainer: object,
};

class Bar {
    position: number;
    angle: number;
    highlightColor: string;

    constructor(angle: number, position: number) {
      this.angle = angle;
      this.position = position;
      this.highlightColor = 'black';
    }

    highlight(color: string) {
      this.highlightColor = color;
    }

    getComponent(speed: number) {
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
          background: this.highlightColor,
          transform: `rotate(${this.angle}deg)`,
          transition: 'linear',
          transitionDuration: `${speed}ms`,
        },
      };

      return (<div key={this.angle} style={styles.outerContainer}></div>);
    }
};

export default Bar;
