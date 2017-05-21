import {SEND_MESSAGE, SEND_MESSAGE_SUCCESS} from '../action-types';

export default () => (state = [], action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return [...state, action.message];

        case SEND_MESSAGE_SUCCESS: {
            const {id} = action;

            return state.reduce((messages, message) => {
                if (message.id === id) {
                    return messages.concat(Object.assign({}, message, {isSent: true}));
                }

                return messages.concat(message);
            }, []);
        }

        default:
            return state;
    }
};