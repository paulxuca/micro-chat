import {connect} from 'inferno-redux';
import Session from '../components/session';
import {init} from '../actions/microchat';
import {pollMessages} from '../actions/chat';

const mapStateToProps = state => ({
    isFetching: state.isFetching
});

const mapDispatchToProps = {
    init,
    pollMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(Session);
