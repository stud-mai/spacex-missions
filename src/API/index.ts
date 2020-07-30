import { History, Launch, RocketOrbits, LaunchInfo } from './types';

const baseUrl = 'https://api.spacexdata.com/v3/';

export const getHistory = (): Promise<History[]> => {
	return fetch(baseUrl + 'history').then(res => res.json());
};

export const getLauches = (): Promise<Launch[]> => {
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
	return fetch(baseUrl + 'launches' + filter).then(res => res.json());
};

export const getOrbits = (): Promise<RocketOrbits[]> => {
	const filter = '?filter=payload_weights,rocket_id';
	return fetch(baseUrl + 'rockets' + filter).then(res => res.json());
};

export const getLaunch = (id: number): Promise<LaunchInfo> => {
	const filter = `?filter=
		mission_name,
		launch_date,
		rocket/rocket_name,
		launch_site/site_name_long,
		launch_success,
		details,
		links/(
			video_link,
			youtube_id
		)`;
	return fetch(baseUrl + 'launches/' + id + filter)
		.then(res => res.json())
		.catch((error: Error) => ({ error }));
};

export const someEndPoint = <T>(data: T): Promise<T> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(data), 1000);
	});
};