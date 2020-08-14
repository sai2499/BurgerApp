import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burgerBuilderReducer from '../src/store/reducers/burgerBuilder'
import thunk from 'redux-thunk';
import orderReducer from '../src/store/reducers/order';
import authReducer from '../src/store/reducers/auth';

const composeEnhancers =process.env.NODE_ENV ==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null  || compose;
const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)));
const rootReducer = combineReducers ({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>    
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
