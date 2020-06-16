import { FilterActionTypes, FilterActions, FilterState, RocketsOrbits } from './types';

export const INITIAL_STATE: FilterState = {
	launchName: '',
	launchDate: NaN,
	launchOrbit: '',
	rocketsOrbits: undefined,
	orbitFilterOptions: new Map()
};

const filterReducer = (state: FilterState = INITIAL_STATE, action: FilterActions): FilterState => {
	switch (action.type) {
		case FilterActionTypes.UPDATE_LAUNCH_NAME:
			return {
				...state,
				launchName: action.name
			};

		case FilterActionTypes.UPDATE_LAUNCH_DATE:
			return {
				...state,
				launchDate: action.date
			};

		case FilterActionTypes.UPDATE_LAUNCH_ORBIT:
			return {
				...state,
				launchOrbit: action.orbit
			};

		case FilterActionTypes.SET_ROCKET_ORBITS: {
			const orbitFilterOptions = new Map();
			const rocketsOrbits = action.rocketOrbits.reduce((acc, { rocket_id, payload_weights }) => {
				return payload_weights.reduce((orb, { id, name, kg}) => {
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

			return {
				...state,
				rocketsOrbits,
				orbitFilterOptions
			};
		}

		default:
			return state;
	}
};

export default filterReducer;