/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put } from 'redux-saga/effects';

import * as API from '../API';
import * as historyActions from '../store/history/actions';
import * as launchActions from '../store/launches/actions';
import * as filtersActions from '../store/filters/actions';
import { HistoryActionTypes, GetHistoryAction, History } from '../store/history/types';
import { LauchesActionTypes, GetLaunchesAction, Launch } from '../store/launches/types';
import { RocketOrbits } from '../store/filters/types';

function* getHistory({ callback }: GetHistoryAction) {
	const history: API.Response<History[]> = yield call(API.getHistory);

	if ('error' in history) {
		console.error('Error:', history.error);
	} else {
		yield put(historyActions.setHistory(history));
	}
	callback();
}

function* getLaunches({ callback }: GetLaunchesAction) {
	const [launches, orbits]: [API.Response<Launch[]>, API.Response<RocketOrbits[]>] = yield all([
		call(API.getLauches),
		call(API.getOrbits)
	]);

	if ('error' in launches) {
		console.error('Error:', launches.error);
	} else if ('error' in orbits) {
		console.error('Error:', orbits.error);
	} else {
		yield all([
			put(launchActions.setLaunches(launches)),
			put(filtersActions.setRocketOrbits(orbits))
		]);
	}
	callback();
}

function* rootSaga() {
	yield all([
		takeLatest(HistoryActionTypes.GET_HISTORY_DATA, getHistory),
		takeLatest(LauchesActionTypes.GET_LAUNCHES_DATA, getLaunches),
	]);
}

export default rootSaga;