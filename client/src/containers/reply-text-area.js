import {connect} from 'inferno-redux';
import TextArea from '../components/text-area';
import {changeReply} from '../actions/reply';

const mapStateToProps = state => ({
    value: state.replyText
});

const mapDispatchToProps = {
    onChange: changeReply
};

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);