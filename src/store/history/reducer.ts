import { HistoryActionTypes, HistoryActions, HistoryState } from './types';

export const INITIAL_STATE: HistoryState = [];

const historyReducer = (state: HistoryState = INITIAL_STATE, action: HistoryActions): HistoryState => {
	switch (action.type) {
		case HistoryActionTypes.SET_HISTORY_DATA: {
			return action.history.map(({ id, title, details, event_date_utc, flight_number, links }) => ({
				id,
				title,
				details,
				date: event_date_utc,
				flightNumber: flight_number,
				links
			}));
		}

		default:
			return state;
	}
};

export default historyReducer;