/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import * as API from '../API';
import * as historyActions from '../store/history/actions';
import * as launchActions from '../store/launches/actions';
import * as filtersActions from '../store/filters/actions';
import * as launchInfoActions from '../store/launchInfo/actions';
import { launchInfoSelector } from '../selectors';
import { HistoryActionTypes, GetHistoryAction, History } from '../store/history/types';
import { LauchesActionTypes, GetLaunchesAction, Launch } from '../store/launches/types';
import { LauchInfoActionTypes, GetLaunchInfoAction, LaunchInfo, LaunchInfoState, SendLaunchInfoAction } from '../store/launchInfo/types';
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

function* getLaunchInfo({ launchId, onSuccess, onFail }: GetLaunchInfoAction) {
	const launchInfo: API.Response<LaunchInfo> = yield call(API.getLaunch, launchId);

	if ('error' in launchInfo) {
		console.error('Error:', launchInfo.error);
		onFail();
	} else {
		yield put(launchInfoActions.setLaunchInfo(launchInfo));
		onSuccess();
	}
}

function* sendLaunchInfo({ callback }: SendLaunchInfoAction) {
	const launchInfo: LaunchInfoState = yield select(launchInfoSelector);
	const dataToSent = launchInfo.selectedInfoToBeSent.reduce((acc, name) => {
		if (name === 'video') {
			const videoLink = launchInfo.videoLink;
			return {
				...acc,
				[name]: videoLink ? videoLink : `https://www.youtube.com/embed/${launchInfo.youtubeId}`
			};
		}
		return {
			...acc,
			[name]: launchInfo[name as keyof LaunchInfoState]
		};
	}, {});

	const data = yield call(API.someEndPoint, dataToSent);

	callback();
	alert('Data has been sent');
	console.log(data);
}

function* rootSaga() {
	yield all([
		takeLatest(HistoryActionTypes.GET_HISTORY_DATA, getHistory),
		takeLatest(LauchesActionTypes.GET_LAUNCHES_DATA, getLaunches),
		takeLatest(LauchInfoActionTypes.GET_LAUNCH_INFO, getLaunchInfo),
		takeLatest(LauchInfoActionTypes.SEND_LAUNCH_INFO, sendLaunchInfo),
	]);
}

export default rootSaga;