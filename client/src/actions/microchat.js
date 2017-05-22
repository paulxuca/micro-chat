import fetch from '../lib/fetch-with-intent';
import sessionStore from '../lib/session-store';
import {
    SET_CONFIG,
    INIT_WITH_SESSION,
    INIT_WITH_SESSION_SUCCESS
} from '../action-types';

export const setConfig = config => ({type: SET_CONFIG, config});

export const init = host => dispatch => {
    const session = sessionStore();

    if (session) {
        dispatch(setConfig(session));
        return;
    }

    fetch(host, 'init').then(sessionStore).then(config => dispatch(setConfig(config)));
};