import Inferno from 'inferno';
import Component from 'inferno-component';
import autoBind from 'auto-bind';
import AppHeader from '../containers/app-header';
import AppWrapper from '../containers/app-wrapper';
import AppBanner from '../containers/app-banner';
import ChatList from '../containers/chat-list';
import ReplyInputField from '../containers/reply-text-area';
import ReplyWrapper from './reply-wrapper';
import ChatWrapper from './chat-wrapper';
import SendButton from './send-button';

export default class App extends Component {
    constructor() {
        super();

        autoBind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
        const ENTER_KEY = 13;
        const {keyCode, metaKey} = e;

        if (keyCode === ENTER_KEY && metaKey) {
            this.props.sendMessage();
        }
    }
    
    render() {
        return (
            <AppWrapper>
                <AppHeader/>
                <AppBanner/>                
                <ChatWrapper>
                    <ChatList/>

                    <ReplyWrapper>
                        <ReplyInputField/>
                        <SendButton/>
                    </ReplyWrapper>                    
                </ChatWrapper>
            </AppWrapper>
        );
    }
}