import shortid from 'shortid';
import fetch from '../lib/fetch-with-intent';
import {SEND_MESSAGE, SEND_MESSAGE_SUCCESS} from '../action-types';

export const sendMessage = () => (dispatch, getState) => {
    const {
        replyText,
        config: {
            host,
            id
        }
    } = getState();
    
    if (!replyText) {
        return;
    }

    const messageId = shortid.generate();
    const now = new Date().getTime();

    const message = {
        id: messageId,
        message: replyText,
        sentAt: now,        
        sent: false,
        isYou: true,
    };

    dispatch({type: SEND_MESSAGE, message});
    fetch(host, 'message', message, id).then(() => {
        dispatch({type: SEND_MESSAGE_SUCCESS, id: messageId});
    });
};