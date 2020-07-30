import { createStore } from 'effector';
import { loadHistoryFx } from './events';

interface HistoryItem {
	id: number;
	title: string;
	date: string;
	flightNumber: number | null;
	details: string;
	links: {
		reddit: string | null;
		article: string | null;
		wikipedia: string | null;
	};
}

export type HistoryStore = HistoryItem[];

export const $history = createStore<HistoryStore>([]);

$history.on(loadHistoryFx.doneData, (store, history) => {
	return history.map(
		({ id, title, details, event_date_utc, flight_number, links }) => ({
			id,
			title,
			details,
			date: event_date_utc,
			flightNumber: flight_number,
			links,
		})
	);
});

