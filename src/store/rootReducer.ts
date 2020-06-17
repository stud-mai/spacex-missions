import { combineReducers } from 'redux';

import history from './history/reducer';
import launches from './launches/reducer';
import filters from './filters/reducer';
import launchInfo from './launchInfo/reducer';

export default combineReducers({
	history,
	launches,
	filters,
	launchInfo
});