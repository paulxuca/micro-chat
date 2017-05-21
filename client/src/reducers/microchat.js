import {SET_CONFIG} from '../action-types';

export const configReducer = () => (state = {}, action) => {
    switch (action.type) {
        case SET_CONFIG:
            return Object.assign({}, state, action.config);
        
        default:
            return state;
    }
};