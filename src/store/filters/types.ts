interface PayloadWeight {
	id: string,
	name:string,
	kg: number,
	lb: number
}

export interface RocketOrbits {
	payload_weights: PayloadWeight[],
	rocket_id: string
}

export enum FilterActionTypes {
	UPDATE_LAUNCH_NAME = 'UPDATE_LAUNCH_NAME',
	UPDATE_LAUNCH_DATE = 'UPDATE_LAUNCH_DATE',
	UPDATE_LAUNCH_ORBIT = 'UPDATE_LAUNCH_ORBIT',
	SET_ROCKET_ORBITS = 'SET_ROCKET_ORBITS',
}

interface UpdateLaunchNameAction {
	type: typeof FilterActionTypes.UPDATE_LAUNCH_NAME,
	name: string
}

interface UpdateLaunchDateAction {
	type: typeof FilterActionTypes.UPDATE_LAUNCH_DATE,
	date: number
}

interface UpdateLaunchOrbitAction {
	type: typeof FilterActionTypes.UPDATE_LAUNCH_ORBIT,
	orbit: string
}

interface SetRocketOrbitsAction {
	type: typeof FilterActionTypes.SET_ROCKET_ORBITS,
	rocketOrbits: RocketOrbits[]
}

export type FilterActions =
	| UpdateLaunchNameAction
	| UpdateLaunchDateAction
	| UpdateLaunchOrbitAction
	| SetRocketOrbitsAction

export type RocketsOrbits = {
	[orbitId: string]: {
		[rocketId: string]: number
	}
}

export interface FilterState {
	launchName: string,
	launchDate: number,
	launchOrbit: string,
	rocketsOrbits?: RocketsOrbits,
	orbitFilterOptions: Map<string, string>
}