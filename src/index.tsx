import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Bar from './Bar';
import Styles from './Styles';
import Menu from './Menu';

function App() {
  const [data, setData] = useState([]);
  const numberBars: number = 40;
  const styles: Styles = {
    container: {
      position: 'relative',
      display: 'block',
      height: '300px',
      width: '100%',
    },
  };

  // equivalent to componentOnMount
  useEffect(() => {
    generateNewData();
  }, []);

  function getInitialAngle(index: number): number {
    return (- Math.floor(numberBars / 2) + index) * 3;
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
      newData.push(new Bar(getInitialAngle(index)));
    }
    setData(newData);
  }

  return (
    <div>
      <Menu data={data} onChange={setData} ></Menu>
      <div style={styles.container}>
        {getDataComponent(data)}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
