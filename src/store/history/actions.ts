import { HistoryActionTypes, HistoryActions, History } from './types';

export const getHistory = (callback: () => void): HistoryActions => ({
	type: HistoryActionTypes.GET_HISTORY_DATA,
	callback
});

export const setHistory = (history: History[]): HistoryActions => ({
	type: HistoryActionTypes.SET_HISTORY_DATA,
	history
});