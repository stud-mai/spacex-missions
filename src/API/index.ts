import { History } from '../store/history/types';

const baseUrl = 'https://api.spacexdata.com/v3/';

export const getHistory = (): Promise<History[]> => {
	return fetch(baseUrl + 'history')
		.then(res => res.json())
		.catch((error: Error) => ({ error }));
};
