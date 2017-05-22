import {
    SET_CONFIG,
    FETCH_MESSAGES,
    FETCH_MESSAGES_SUCCESS,
    INIT_WITH_SESSION,
    INIT_WITH_SESSION_SUCCESS
} from '../action-types';

export const configReducer = () => (state = {}, action) => {
    switch (action.type) {
        case SET_CONFIG:
            return Object.assign({}, state, action.config);
        
        default:
            return state;
    }
};

export const isFetchingReducer = () => (state = false, action) => {
    switch (action.type) {
        case FETCH_MESSAGES:
        case INIT_WITH_SESSION:
            return true;
        
        case FETCH_MESSAGES_SUCCESS:
        case INIT_WITH_SESSION_SUCCESS:
            return false;

        default:
            return state;
    }
};