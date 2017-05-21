import Inferno from 'inferno';

export default function ReplyWrapper({children}) {
    return (
        <div className="microchat-reply-wrapper">
            {children}
        </div>
    );
}