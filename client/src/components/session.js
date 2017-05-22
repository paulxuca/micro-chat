import Inferno from 'inferno';
import Component from 'inferno-component';
import sessionStore from '../lib/session-store';

export default class Session extends Component {
    componentDidMount() {
        const {init, host} = this.props;

        init(host).then((shouldStartPoll) => shouldStartPoll && this.poll());
    }

    poll() {
        console.log('DOGS');
    }

    render() {
        return this.props.children;
    }
}