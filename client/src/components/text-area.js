import Inferno from 'inferno';

export default function TextArea({onChange, value}) {
    const handleChange = e => onChange(e.target.value);

    return <textarea className="microchat-textarea" onKeyUp={handleChange} value={value}/>;
}