import { History } from '../store/history/types';
import { Launch } from '../store/launches/types';

const baseUrl = 'https://api.spacexdata.com/v3/';

export const getHistory = (): Promise<History[]> => {
	return fetch(baseUrl + 'history')
		.then(res => res.json())
		.catch((error: Error) => ({ error }));
};

export const getLauches = (): Promise<Launch[]> => {
	const filter = '?filter=flight_number,mission_name,launch_date_utc,rocket/(rocket_id,second_stage/payloads(nationality,manufacturer,payload_type))';
	return fetch(baseUrl + 'launches' + filter)
		.then(res => res.json())
		.catch((error: Error) => ({ error }));
};
