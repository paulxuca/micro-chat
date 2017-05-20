import {createStore} from 'redux';
import reducers from './reducer';

export default initialState => {
    const reducer = reducers();
    return createStore(reducer, initialState);
};