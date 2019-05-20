import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import * as serviceWorker from './serviceWorker';

import './index.css';



ReactDOM.render( 
    <Router>
        <App />
    </Router>,document.getElementById('root'));

serviceWorker.unregister();

