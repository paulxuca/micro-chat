import Inferno from 'inferno';
import Component from 'inferno-component';
import fetch from '../lib/fetch-with-intent';
import sessionStore from '../lib/session-store';

export default class Session extends Component {
    constructor(props) {
        super(props);

        this.host = props.host;
    }
    
    componentDidMount() {
        const {init} = this.props;

        if (localStorage['microchat-session']) {
            init(sessionStore());
        } else {
            fetch(this.host, 'init').then(sessionStore).then(init);
        }
    }

    render() {
        return this.props.children;
    }
}