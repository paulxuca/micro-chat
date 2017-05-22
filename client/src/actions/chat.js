import shortid from 'shortid';
import fetch from '../lib/fetch-with-intent';
import {
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    FETCH_MESSAGES,
    FETCH_MESSAGES_SUCCESS
} from '../action-types';

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

    const message = {
        id: messageId,
        message: replyText,
        sent: false,
        isYou: true,
    };

    dispatch({type: SEND_MESSAGE, message});
    fetch(host, 'message', message, id).then(() => {
        dispatch({type: SEND_MESSAGE_SUCCESS, id: messageId});
    });
};

export const pollMessages = () => (dispatch, getState) => {
    return new Promise(resolve => {
        const {
            config: {
                lastId,
                host,
                id
            }
        } = getState();

        dispatch({type: FETCH_MESSAGES});
        fetch(host, 'poll', {lastId}, id).then(({lastId, messages}) => {
            dispatch({type: FETCH_MESSAGES_SUCCESS, lastId, messages});
            resolve();
        });
    });
};
