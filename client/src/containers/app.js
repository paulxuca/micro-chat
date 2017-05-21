import {connect} from 'inferno-redux';
import App from '../components/app';
import {sendMessage} from '../actions/chat';

const mapDispatchToProps = {
    sendMessage
};

export default connect(null, mapDispatchToProps)(App);
