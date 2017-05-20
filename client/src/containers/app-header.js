import {connect} from 'inferno-redux';
import AppHeader from '../components/app-header';
import {openChat, closeChat} from '../actions/ui';

const mapStateToProps = state => ({
    isOpen: state.isOpen
});

const mapDispatchToProps = {
    openChat,
    closeChat
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
