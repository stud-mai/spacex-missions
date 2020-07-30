/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const renderApp = () => {
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
};

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
	(module as any).hot.accept('./components/App', renderApp);
}

renderApp();
