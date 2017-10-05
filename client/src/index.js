import React from 'react';
import ReactDOM from 'react-dom';
import '@customstyles/bootstrap/build/index.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
