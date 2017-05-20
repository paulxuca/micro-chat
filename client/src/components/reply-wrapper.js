import Inferno from 'inferno';

export default function ReplyWrapper({children}) {
    return (
        <div className="micro-reply-wrapper">
            {children}
        </div>
    );
}