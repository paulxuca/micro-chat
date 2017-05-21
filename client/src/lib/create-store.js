import {createStore, compose, applyMiddleware} from 'redux';
import reducers from './reducer';
import thunk from './thunk'

export default () => {
    let composeEnhancers = compose;

    if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }

    return createStore(reducers(), composeEnhancers(applyMiddleware(thunk)));
};