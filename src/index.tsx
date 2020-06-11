/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './store';
import App from './containers/App';

const store = createStore();

const renderApp = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
};

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
	(module as any).hot.accept('./containers/App', renderApp);
}

renderApp();
