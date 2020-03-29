import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Bar from './Bar';
import Header from './Header';
import ColorScheme from './ColorScheme';

type Styles = {
  appContainer: object,
  outerContainer: object,
  innerContainer: object,
  linkShoutout: object,
}

function App() {
  const [data, setData] = useState<Bar[]>([]);
  const [numberBars, setNumberBars] = useState<number>(50);
  const [sleepTime, setSleepTime] = useState<number>(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState<number>(0);
  const spacing: number = 15;
  const styles: Styles = {
    appContainer: {
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      position: 'relative',
      display: 'block',
      margin: '20px',
      height: '-webkit-fill-available',
      width: '-webkit-fill-available',
      borderRadius: '5px',
    },
    outerContainer: {
      position: 'relative',
      display: 'block',
      height: '-webkit-fill-available',
      width: '100%',
      margin: 'auto',
      overflow: 'hidden',
    },
    innerContainer: {
      position: 'absolute',
      display: 'block',
      height: '500px',
      width: numberBars * spacing,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    linkShoutout: {
      position: 'absolute',
      right: '10px',
      bottom: '10px',
    },
  };

  // equivalent to componentOnMount
  useEffect(() => {
    generateNewData(numberBars);
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
      bars.push(bar.getComponent(sleepTime));
    }
    return bars;
  }

  function generateNewData(newNumberBars: number) {
    const newData: Bar[] = [];
    for (let index: number = 0; index < newNumberBars; index ++) {
      newData.push(new Bar(getInitialAngle(index), getInitialPosition(index)));
    }
    setNumberBars(newNumberBars);
    setData([...newData]);
  }

  function changeData(data: Bar[]) {
    setData([...data]);
    return new Promise((resolve) => setTimeout(resolve, sleepTime));
  }

  return (
    <div style={styles.appContainer}>
      <Header
        data={data}
        setData={changeData}
        numberBars={numberBars}
        generateNewData={generateNewData}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
      <div style={styles.outerContainer}>
        <div style={styles.innerContainer}>
          {getDataComponent(data)}
        </div>
      </div>
      <Typography style={styles.linkShoutout} variant='subtitle2'>
        <Link href='https://bost.ocks.org/mike/algorithms/'>
          Inspired by Mike Bostock
        </Link>
      </Typography>
      <ColorScheme selectedAlgorithm={selectedAlgorithm} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
