import { LauchesActionTypes, LaunchesActions, LaunchesState } from './types';

export const INITIAL_STATE: LaunchesState = [];

const launchesReducer = (state: LaunchesState = INITIAL_STATE, action: LaunchesActions): LaunchesState => {
	switch (action.type) {
		case LauchesActionTypes.SET_LAUNCHES_DATA: {
			return action.launches.map(({ flight_number, mission_name, launch_date_utc, rocket }) => {
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
		}

		default:
			return state;
	}
};

export default launchesReducer;