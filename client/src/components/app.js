import Inferno from 'inferno';
import Component from 'inferno-component';
import AppHeader from '../containers/app-header';
import AppWrapper from '../containers/app-wrapper';
import ReplyWrapper from './reply-wrapper';
import ChatWrapper from './chat-wrapper';

export default class App extends Component {
    render() {
        return (
            <AppWrapper>
                <AppHeader/>
                <ChatWrapper/>
                <ReplyWrapper/>
            </AppWrapper>
        );
    }
}