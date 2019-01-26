import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import Login from "./components/Login";
import {Provider} from 'react-redux'
import {store} from "./redux/rootReducer";

const application = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(application, document.getElementById('root'));

serviceWorker.unregister();
