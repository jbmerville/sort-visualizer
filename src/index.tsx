import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Bar from './Bar';
import Styles from './Styles';
import Menu from './Menu';

function App() {
  const [data, setData] = useState([]);
  const numberBars: number = 50;
  const spacing: number = 15;
  const styles: Styles = {
    outerContainer: {
      position: 'absolute',
      display: 'block',
      height: '200px',
      width: '100%',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    innerContainer: {
      position: 'absolute',
      display: 'block',
      height: '100%',
      width: numberBars * spacing,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // equivalent to componentOnMount
  useEffect(() => {
    generateNewData();
  }, []);

  function getInitialAngle(index: number): number {
    return (- Math.floor(numberBars / 2) + index);
  }

  function getInitialPosition(index: number): number {
    return index * spacing;
  }

  function getDataComponent(data: Bar[]): React.Component[] {
    const bars: React.Component[] = [];
    for (const bar of data) {
      bars.push(bar.getComponent());
    }
    return bars;
  }

  function generateNewData() {
    const newData: Bar[] = [];
    for (let index: number = 0; index < numberBars; index ++) {
      newData.push(new Bar(getInitialAngle(index), getInitialPosition(index)));
    }
    setData(newData);
  }

  return (
    <div>
      <Menu data={data} onChange={setData} ></Menu>
      <div style={styles.outerContainer}>
        <div style={styles.innerContainer}>
          {getDataComponent(data)}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
