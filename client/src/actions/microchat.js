import fetch from '../lib/fetch-with-intent';
import sessionStore from '../lib/session-store';
import {
    SET_CONFIG,
    INIT_WITH_SESSION,
    INIT_WITH_SESSION_SUCCESS
} from '../action-types';

export const setConfig = config => ({type: SET_CONFIG, config});
export const initWithSession = () => ({type: INIT_WITH_SESSION});
export const initWithSessionSuccess = logs => ({type: INIT_WITH_SESSION_SUCCESS, logs});

export const init = host => dispatch => {
    return new Promise((resolve) => {
        dispatch(initWithSession());
        const session = sessionStore();

        if (session) {
            dispatch(setConfig(session));
            fetch(host, 'init-with-session', session.id).then(({messages, lastId}) => {
                dispatch(initWithSessionSuccess(messages));
                dispatch(setConfig({lastId}));
                resolve(true);
            });

            return;
        }

        fetch(host, 'init')
            .then(sessionStore)
            .then(config => dispatch(setConfig(config)))
            .then(() => resolve(false));
    });
};