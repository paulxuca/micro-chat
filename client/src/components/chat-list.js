import Inferno from 'inferno';
import classnames from 'classnames';

export default function ChatList({messages}) {
    const map = messageData => {
        const {message, isYou, isSent} = messageData;

        const classes = classnames({
            'microchat-chat-entry': true,
            'you': messageData.isYou,
            'not-you': !messageData.isYou,
            'not-sent': !isSent
        });

        return <p className={classes}>{message}</p>;
    };
    
    return (
        <div className="microchat-chat-logs">
            {messages.map(map)}
        </div>
    );
}