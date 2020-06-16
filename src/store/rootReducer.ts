import { combineReducers } from 'redux';

import history from './history/reducer';
import launches from './launches/reducer';

export default combineReducers({
	history,
	launches
});