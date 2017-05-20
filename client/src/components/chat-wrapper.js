import Inferno from 'inferno';

export default function ChatWrapper({children}) {
    return (
        <div className="micro-chat-wrapper">
            {children}
        </div>
    )
}