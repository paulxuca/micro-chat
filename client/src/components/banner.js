import Inferno from 'inferno';

export default ({teamName}) => (
    <div className="microchat-banner">
        You're chatting with <span className="bold">{teamName}</span>!
    </div>
);