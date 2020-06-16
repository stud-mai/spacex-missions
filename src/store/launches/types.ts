interface RocketPayload {
	nationality: string,
	manufacturer: string | null,
	payload_type: string,
	payload_mass_kg: number | null
}

interface Rocket {
	rocket_id: string,
	second_stage: {
		payloads: RocketPayload[]
	}
}

export interface Launch {
	flight_number: number,
	mission_name: string,
	launch_date_utc: string,
	rocket: Rocket
}

export enum LauchesActionTypes {
	GET_LAUNCHES_DATA = 'GET_LAUNCHES_DATA',
	SET_LAUNCHES_DATA = 'SET_LAUNCHES_DATA',
}

export interface GetLaunchesAction {
	type: typeof LauchesActionTypes.GET_LAUNCHES_DATA,
	callback: () => void
}

interface SetLaunchesAction {
	type: typeof LauchesActionTypes.SET_LAUNCHES_DATA,
	launches: Launch[]
}

export type LaunchesActions = GetLaunchesAction | SetLaunchesAction

interface Payload {
	nationality: string,
	manufacturer: string | null,
	type: string,
	weight: number | null
}

export interface LaunchItem {
	id: number,
	name: string,
	date: string,
	rocketId: string,
	payloads: Payload[]
}

export type LaunchesState = LaunchItem[]