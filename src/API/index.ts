import { History } from '../store/history/types';
import { Launch } from '../store/launches/types';
import { RocketOrbits } from '../store/filters/types';

const baseUrl = 'https://api.spacexdata.com/v3/';

interface FetchError {
	error: Error
}

export type PromisedResponse<T> = Promise<T | FetchError>

export type Response<T> = T | FetchError;

export const getHistory = (): PromisedResponse<History[]> => {
	return fetch(baseUrl + 'history')
		.then(res => res.json())
		.catch((error: Error) => ({ error }));
};

export const getLauches = (): PromisedResponse<Launch[]> => {
	const filter = `?filter=
		flight_number,
		mission_name,
		launch_date_utc,
		rocket/(
			rocket_id,
			second_stage/payloads(
				nationality,
				manufacturer,
				payload_type,
				payload_mass_kg
			)
		)`;
	return fetch(baseUrl + 'launches' + filter)
		.then(res => res.json())
		.catch((error: Error) => ({ error }));
};

export const getOrbits = (): PromisedResponse<RocketOrbits[]> => {
	const filter = '?filter=payload_weights,rocket_id';
	return fetch(baseUrl + 'rockets' + filter)
		.then(res => res.json())
		.catch((error: Error) => ({ error }));
};
