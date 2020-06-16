/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put } from 'redux-saga/effects';

import * as API from '../API';
import * as historyActions from '../store/history/actions';
import * as launchActions from '../store/launches/actions';
import { HistoryActionTypes, GetHistoryAction } from '../store/history/types';
import {LauchesActionTypes, GetLaunchesAction } from '../store/launches/types';

function* getHistory({ callback }: GetHistoryAction) {
	const history = yield call(API.getHistory);

	if (history.error) {
		console.error('Error:', history.error);
	} else {
		yield put(historyActions.setHistory(history));
	}
	callback();
}

function* getLaunches({ callback }: GetLaunchesAction) {
	const launches = yield call(API.getLauches);

	if (launches.error) {
		console.error('Error:', launches.error);
	} else {
		yield put(launchActions.setLaunches(launches));
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