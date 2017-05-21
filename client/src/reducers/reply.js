import {CHANGE_REPLY, SEND_MESSAGE} from '../action-types';

export const replyTextReducer = () => (state = null, action) => {
    switch (action.type) {
        case CHANGE_REPLY:
            return action.reply;
        
        case SEND_MESSAGE:
            return null;

        default:
            return state;
    }
};