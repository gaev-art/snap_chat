import React from 'react'
import {render} from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux'
import {store} from './m2-bll/store'
import {Messenger} from './m1-ui/Messenger';
import {HashRouter} from 'react-router-dom';


render(
    <HashRouter>
        <Provider store={store}>
            <Messenger/>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
