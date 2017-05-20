import {combineReducers} from 'redux';
import {isOpenReducer} from '../reducers/ui';

export default () => combineReducers({
    isOpen: isOpenReducer()
});
