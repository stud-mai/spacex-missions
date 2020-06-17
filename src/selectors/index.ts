import { createSelector } from 'reselect';
import { AppState } from '../store';
import { LaunchInfoState } from '../store/launchInfo/types';
import { HistoryState } from '../store/history/types';

export const historySelector = (state: AppState): HistoryState => state.history;

const launchNameFilterSelector = (state: AppState) => state.filters.launchName;

const launchDateFilterSelector = (state: AppState) => state.filters.launchDate;

const launchOrbitFilterSelector = (state: AppState) => state.filters.launchOrbit;

const rocketsOrbitsSelector = (state: AppState) => state.filters.rocketsOrbits;

export const orbitFilterOptionsSelector = (state: AppState): Map<string, string> => state.filters.orbitFilterOptions;

const launchesSelector = (state: AppState) => state.launches;

export const filteredLaunchesSelector = createSelector(
	launchNameFilterSelector,
	launchDateFilterSelector,
	launchOrbitFilterSelector,
	rocketsOrbitsSelector,
	launchesSelector,
	(launchName, launchDate, launchOrbit, rocketsOrbits, launches) => launches.filter(launch => {
		const { name, date, rocketId, payloads } = launch;
		const lowerCasedName = name.toLocaleLowerCase();
		const lowerCasedFilter = launchName.toLocaleLowerCase();
		const missionUnixTime = new Date(date.split('T')[0]).valueOf();
		const totalPayloadWeight = payloads.reduce((sum, { weight }) => sum + (weight || 0), 0);
		const allowedPayloadWeight = rocketsOrbits?.[launchOrbit]?.[rocketId];

		const passedByName = lowerCasedName.includes(lowerCasedFilter);
		const passedByDate = (isNaN(launchDate) || launchDate === missionUnixTime);
		const passedByOrbit = launchOrbit.length
			? allowedPayloadWeight !== undefined && allowedPayloadWeight >= totalPayloadWeight
			: true;

		return passedByName && passedByDate && passedByOrbit;
	})
);

export const launchInfoSelector = (state: AppState): LaunchInfoState => state.launchInfo;

export const selectedInfoFieldsSelector = (state: AppState): string[] => state.launchInfo.selectedInfoToBeSent;