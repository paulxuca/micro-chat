import Inferno from 'inferno';

export default function ChatWrapper({children}) {
    return (
        <div className="microchat-chat-wrapper">
            {children}
        </div>
    );
}