import {connect} from 'inferno-redux';
import ChatList from '../components/chat-list';

const getMessages = state => {
    
};

const mapStateToProps = state => ({
    messages: state.chatLogs
});

export default connect(mapStateToProps)(ChatList);
