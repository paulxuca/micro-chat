import './styles/main.css';

import Inferno from 'inferno';
import {Provider} from 'inferno-redux';
import App from './components/app';
import createStore from './lib/create-store';
import establishRenderTarget from './lib/establish-render-target';

export const initialize = config => {
    const store = createStore();

    Inferno.render((
        <Provider store={store}>
            <App/>
        </Provider>
    ), establishRenderTarget());
};
