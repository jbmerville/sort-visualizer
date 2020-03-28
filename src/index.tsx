import React from 'react';
import ReactDOM from 'react-dom';

export const App = () => {
    return (
        <div>
            hello world
        </div>
    );
};


ReactDOM.render(<App />, document.querySelector('#root'));