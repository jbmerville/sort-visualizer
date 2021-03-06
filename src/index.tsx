import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Bar from './Bar';
import Header from './Header';
import ColorScheme from './ColorScheme';
import SideContent from './SideContent';
import {getInitialAngle, getInitialPosition} from './DataHelper';

type Styles = {
  appContainer: object,
  contentContainer: object,
  outerContainer: object,
  innerContainer: object,
  linkShoutout: object,
};

export const spacing: number = 15;

function App() {
  const [data, setData] = useState<Bar[]>([]);
  const [numberBars, setNumberBars] = useState<number>(40);
  const [sleepTime, setSleepTime] = useState<number>(100);
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState<number>(0);
  const time = useRef(sleepTime);
  time.current = sleepTime;
  const styles: Styles = {
    appContainer: {
      position: 'relative',
      display: 'flex',
      flexFlow: 'column',
      height: '100%',
      width: '-webkit-fill-available',
      borderRadius: '5px',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
    outerContainer: {
      display: 'flex',
      flexFlow: 'row',
      flexDirection: 'row',
      flexWrap: 'wrap',
      position: 'relative',
      height: '100%',
      width: '100%',
    },
    contentContainer: {
      position: 'relative',
      display: 'flex',
      flex: 'auto',
      height: '100%',
      overflow: 'hidden',
    },
    innerContainer: {
      position: 'absolute',
      display: 'block',
      height: '400px',
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
  useEffect(() => {
    time.current = sleepTime;
  }, [sleepTime]);


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
      newData.push(new Bar(getInitialAngle(newNumberBars, index), getInitialPosition(index)));
    }
    setNumberBars(newNumberBars);
    setData([...newData]);
  }

  async function changeData(data: Bar[], customeTime?: number) {
    setData([...data]);
    await new Promise((resolve) => setTimeout(resolve, customeTime? customeTime: time.current));
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
        sleepTime={sleepTime}
        setSleepTime={setSleepTime}
      />
      <div style={styles.outerContainer}>
        <SideContent selectedAlgorithm={selectedAlgorithm}/>
        <div style={styles.contentContainer}>
          <div style={styles.innerContainer}>
            {getDataComponent(data)}
          </div>
          <ColorScheme selectedAlgorithm={selectedAlgorithm}/>
        </div>
        <Typography style={styles.linkShoutout} variant='subtitle2'>
          <Link href='https://bost.ocks.org/mike/algorithms/'>
            Inspired by Mike Bostock
          </Link>
        </Typography>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
