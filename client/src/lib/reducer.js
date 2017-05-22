import {combineReducers} from 'redux';
import {isOpenReducer} from '../reducers/ui';
import {configReducer, isFetchingReducer} from '../reducers/microchat';
import {replyTextReducer} from '../reducers/reply';
import chatLogsReducer from '../reducers/chat-logs';

export default () => combineReducers({
    isOpen: isOpenReducer(),
    replyText: replyTextReducer(),
    config: configReducer(),
    chatLogs: chatLogsReducer(),
    isFetching: isFetchingReducer()
});
