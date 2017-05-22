import Inferno from 'inferno';
import Component from 'inferno-component';
import sessionStore from '../lib/session-store';

export default class Session extends Component {
    componentDidMount() {
        const {init, host} = this.props;

        init(host);
    }

    render() {
        return this.props.children;
    }
}