import { LauchesActionTypes, LaunchesActions, Launch } from './types';

export const getLaunches = (callback: () => void): LaunchesActions => ({
	type: LauchesActionTypes.GET_LAUNCHES_DATA,
	callback
});

export const setLaunches = (launches: Launch[]): LaunchesActions => ({
	type: LauchesActionTypes.SET_LAUNCHES_DATA,
	launches
});