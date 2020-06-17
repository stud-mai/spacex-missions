import { LauchInfoActionTypes, LaunchInfoActions, LaunchInfo } from './types';

export const getLaunchInfo = (launchId: number, onSuccess: () => void, onFail: () => void): LaunchInfoActions => ({
	type: LauchInfoActionTypes.GET_LAUNCH_INFO,
	launchId,
	onSuccess,
	onFail
});

export const setLaunchInfo = (launchInfo: LaunchInfo): LaunchInfoActions => ({
	type: LauchInfoActionTypes.SET_LAUNCH_INFO,
	launchInfo
});

export const unsetLaunchInfo = (): LaunchInfoActions => ({
	type: LauchInfoActionTypes.UNSET_LAUNCH_INFO
});

export const selectLaunchInfo = (name: string, checked: boolean): LaunchInfoActions => ({
	type: LauchInfoActionTypes.SELECT_LAUNCH_INFO,
	name,
	checked
});

export const sendLaunchInfo = (): LaunchInfoActions => ({
	type: LauchInfoActionTypes.SEND_LAUNCH_INFO
});