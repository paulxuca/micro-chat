import Inferno from 'inferno';
import Component from 'inferno-component';
import sessionStore from '../lib/session-store';

export default class Session extends Component {
    constructor() {
        super();

        this.poll = this.poll.bind(this);
    }

    componentDidMount() {
        const {init, host} = this.props;

        init(host).then((shouldStartPoll) => shouldStartPoll && this.poll());
    }

    poll() {
        const {isFetching, pollMessages} = this.props;

        if (isFetching) {
            setTimeout(this.poll, 5000);
            return;
        }

        pollMessages().then(() => setTimeout(this.poll, 10000));
    }

    render() {
        return this.props.children;
    }
}