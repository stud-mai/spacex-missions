import { restore, combine } from 'effector';
import {
	resetFilters,
	launchNameChanged,
	launchDateChanged,
	launchOrbitChanged,
	rocketsOrbitsChanged,
	orbitFilterOptionsChanged
} from './events';

export type RocketsOrbits = {
	[orbitId: string]: {
		[rocketId: string]: number
	}
}

const $launchName = restore<string>(launchNameChanged, '');
const $launchDate = restore<string>(launchDateChanged, '');
const $launchOrbit = restore<string>(launchOrbitChanged, '');
const $rocketsOrbits = restore<RocketsOrbits>(rocketsOrbitsChanged, null);
const $orbitFilterOptionsMap = restore<Map<string, string>>(orbitFilterOptionsChanged, new Map());

$launchName.reset(resetFilters);
$launchDate.reset(resetFilters);
$launchOrbit.reset(resetFilters);

export const $orbitFilterOptions = $orbitFilterOptionsMap.map(store => {
	return [...store.entries()].map(([id, name]) => ({ value: id, name }));
});

export const $filters = combine({
	launchName: $launchName,
	launchDate: $launchDate,
	launchOrbit: $launchOrbit,
	rocketsOrbits: $rocketsOrbits,
	orbitFilterOptions: $orbitFilterOptions
});
