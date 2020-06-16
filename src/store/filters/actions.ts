import { FilterActionTypes, FilterActions, RocketOrbits } from './types';

export const updateLaunchName = (name: string): FilterActions => ({
	type: FilterActionTypes.UPDATE_LAUNCH_NAME,
	name
});

export const updateLaunchDate = (date: number): FilterActions => ({
	type: FilterActionTypes.UPDATE_LAUNCH_DATE,
	date
});

export const updateLaunchOrbit = (orbit: string): FilterActions => ({
	type: FilterActionTypes.UPDATE_LAUNCH_ORBIT,
	orbit
});

export const setRocketOrbits = (rocketOrbits: RocketOrbits[]): FilterActions => ({
	type: FilterActionTypes.SET_ROCKET_ORBITS,
	rocketOrbits
});