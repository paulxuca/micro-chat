import './styles/main.css';

import Inferno from 'inferno';
import {Provider} from 'inferno-redux';
import App from './containers/app';
import Session from './containers/session';
import createStore from './lib/create-store';
import establishRenderTarget from './lib/establish-render-target';
import {setConfig} from './actions/microchat';

export const initialize = (config = {}) => {
    const {host} = config;

    if (!host) {
        throw new Error('Missing host in config');
    }

    const store = createStore();
    store.dispatch(setConfig({host}));

    Inferno.render((
        <Provider store={store}>
            <Session host={config.host}>
                <App/>
            </Session>
        </Provider>
    ), establishRenderTarget());
};
