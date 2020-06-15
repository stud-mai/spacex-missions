/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put } from 'redux-saga/effects';

import * as API from '../API';
import * as historyActions from '../store/history/actions';
import { HistoryActionTypes, GetHistoryAction } from '../store/history/types';

function* getHistory({ callback }: GetHistoryAction) {
	const history = yield call(API.getHistory);

	callback();
	if (history.error) {
		console.error('Error:', history.err);
	} else {
		yield put(historyActions.setHistory(history));
	}
}

function* rootSaga() {
	yield all([
		takeLatest(HistoryActionTypes.GET_HISTORY_DATA, getHistory),
	]);
}

export default rootSaga;