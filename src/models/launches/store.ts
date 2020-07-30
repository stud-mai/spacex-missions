import { createStore, combine } from 'effector';
import { loadLaunchesFx } from './events';
import { $filters } from '../filters/store';

interface Payload {
	nationality: string,
	manufacturer: string | null,
	type: string,
	weight: number | null
}

interface LaunchItem {
	id: number,
	name: string,
	date: string,
	rocketId: string,
	payloads: Payload[]
}

type LaunchesStore = LaunchItem[]

const $launches = createStore<LaunchesStore>([]);

$launches.on(loadLaunchesFx.doneData, (store, launches) => {
	return launches.map(({ flight_number, mission_name, launch_date_utc, rocket }) => {
		const { rocket_id, second_stage: { payloads } } = rocket;
		const rocketPayload = payloads.map(({ payload_type, payload_mass_kg, ...rest }) => ({
			...rest,
			type: payload_type,
			weight: payload_mass_kg
		}));
		return {
			id: flight_number,
			name: mission_name,
			date: launch_date_utc,
			rocketId: rocket_id,
			payloads: rocketPayload
		};
	});
});

const $filteredLaunches = combine(
	$launches,
	$filters,
	(launches, filters) => {
		const { launchName, launchDate, launchOrbit, rocketsOrbits } = filters;
		return launches.filter(launch => {
			const { name, date, rocketId, payloads } = launch;
			const lowerCasedName = name.toLocaleLowerCase();
			const lowerCasedFilter = launchName.toLocaleLowerCase();
			const missionUnixTime = new Date(date.split('T')[0]).valueOf();
			const launchUnixTime = new Date(launchDate).valueOf();
			const totalPayloadWeight = payloads.reduce((sum, { weight }) => sum + (weight || 0), 0);
			const allowedPayloadWeight = rocketsOrbits?.[launchOrbit]?.[rocketId];

			const passedByName = lowerCasedName.includes(lowerCasedFilter);
			const passedByDate = (isNaN(launchUnixTime) || launchUnixTime === missionUnixTime);
			const passedByOrbit = launchOrbit.length
				? allowedPayloadWeight !== undefined && allowedPayloadWeight >= totalPayloadWeight
				: true;

			return passedByName && passedByDate && passedByOrbit;
		});
	}
);

const $launchesFetching = loadLaunchesFx.pending;
const $launchesLoaded = $launches.map(launches => !launches.length);

export const $lauchesStore = combine({
	launchesFetching: $launchesFetching,
	launchesLoaded: $launchesLoaded,
	launches: $filteredLaunches
});