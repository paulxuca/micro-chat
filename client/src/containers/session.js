import {connect} from 'inferno-redux';
import Session from '../components/session';
import {init} from '../actions/microchat';
import {pollMessages} from '../actions/chat';

const getShouldPoll = state => {
    return state.chatLogs.length > 0 && state.chatLogs[0].isSent;
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    shouldPoll: getShouldPoll(state)
});

const mapDispatchToProps = {
    init,
    pollMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(Session);
