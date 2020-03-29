import React from 'react';
import Colors from './Colors';

type Props = {
  selectedAlgorithm: number
}
type Styles = {
  outerContainer: object,
};

function aboutAlgorithm(name: string, complexity: string, about: string) {

}

function SideContent(props: Props) {
  const {selectedAlgorithm} = props;
  const styles: Styles = {
    outerContainer: {
      position: 'relative',
      display: 'flex',
      minWidth: '400px',
      flexDirection: 'row',
      flexBasis: '400px',
      height: '100%',
      backgroundColor: Colors.lightGrey,
      borderBottomLeftRadius: '5px',
    },
  };
  return (
    <div style={styles.outerContainer}>
    </div>
  );
}

export default SideContent;
