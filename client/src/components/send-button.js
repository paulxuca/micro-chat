import Inferno from 'inferno';

export default function SendButton({onClick}) {
    return <button className="microchat-send-button" onClick={onClick}>Send</button>
}