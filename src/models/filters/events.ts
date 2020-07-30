import { createEffect, createEvent } from 'effector';
import { getOrbits } from '../../API';
import { RocketsOrbits } from './store';

export const launchNameChanged = createEvent<string>();
export const launchDateChanged = createEvent<string>();
export const launchOrbitChanged = createEvent<string>();
export const rocketsOrbitsChanged = createEvent<RocketsOrbits>();
export const orbitFilterOptionsChanged = createEvent<Map<string, string>>();
export const resetFilters = createEvent<void>();

export const loadOrbitsFx = createEffect({
	async handler() {
		const orbits = await getOrbits();
		return orbits;
	}
});

loadOrbitsFx.doneData.watch((orbits) => {
	const orbitFilterOptions = new Map<string, string>();
	const rocketsOrbits = orbits.reduce((acc, { rocket_id, payload_weights }) => {
		return payload_weights.reduce((orb, { id, name, kg }) => {
			orbitFilterOptions.set(id, name);
			return {
				...orb,
				[id]: {
					...orb[id],
					[rocket_id]: kg
				}
			};
		}, acc);
	}, {} as RocketsOrbits);
	rocketsOrbitsChanged(rocketsOrbits);
	orbitFilterOptionsChanged(orbitFilterOptions);
});