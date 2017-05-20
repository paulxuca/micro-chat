import {
    OPEN_CHAT,
    CLOSE_CHAT
} from '../action-types';

export const isOpenReducer = () => (state = false, action) => {
    switch (action.type) {
        case OPEN_CHAT:
            return true;

        case CLOSE_CHAT:
            return false;

        default:
            return state;
    }
};