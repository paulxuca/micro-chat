import Inferno from 'inferno';
import Component from 'inferno-component';
import classnames from 'classnames';

export default class ChatList extends Component {
    constructor() {
        super();
        
        this.onRef = this.onRef.bind(this);
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.messages.length !== this.props.messages.length) {
            this.handleNewMessages();
        }
    }

    handleNewMessages() {
        const PADDING_BOTTOM = 70;

        setImmediate(() => this.chatListRef.scrollTop = this.chatListRef.scrollHeight + PADDING_BOTTOM);
    }
    
    message(messageData) {
        const {message, isYou, isSent} = messageData;

        const classes = classnames({
            'microchat-chat-entry': true,
            'you': messageData.isYou,
            'not-you': !messageData.isYou,
            'not-sent': !isSent
        });

        return <p className={classes}>{message}</p>;
    }

    onRef(ref) {
        this.chatListRef = ref;
    }

    render() {
        return (
            <div className="microchat-chat-logs" ref={this.onRef}>
                {this.props.messages.map(this.message)}
            </div>
        );
    }
}