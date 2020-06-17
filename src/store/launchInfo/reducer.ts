import { LauchInfoActionTypes, LaunchInfoActions, LaunchInfoState } from './types';

export const INITIAL_STATE: LaunchInfoState = {} as LaunchInfoState;

const launchesReducer = (state: LaunchInfoState = INITIAL_STATE, action: LaunchInfoActions): LaunchInfoState => {
	switch (action.type) {
		case LauchInfoActionTypes.SET_LAUNCH_INFO: {
			const { mission_name, rocket, launch_site, launch_success, details, links } = action.launchInfo;
			return {
				selectedInfoToBeSent: [],
				missionName: mission_name,
				rocketName: rocket.rocket_name,
				launchSiteName: launch_site.site_name_long,
				launchSuccess: launch_success,
				details,
				videoLink: links.video_link,
				youtubeId: links.youtube_id
			};
		}

		case LauchInfoActionTypes.SELECT_LAUNCH_INFO: {
			const { name, checked } = action;
			const selectedInfoToBeSent = checked
				? state.selectedInfoToBeSent.concat(name)
				: state.selectedInfoToBeSent.filter(n => n !== name);
			return {
				...state,
				selectedInfoToBeSent
			};
		}

		case LauchInfoActionTypes.UNSET_LAUNCH_INFO:
			return INITIAL_STATE;

		default:
			return state;
	}
};

export default launchesReducer;