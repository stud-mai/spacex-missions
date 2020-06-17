export interface LaunchInfo {
	mission_name: string,
	rocket: {
		rocket_name: string
	},
	launch_site: {
		site_name_long: string
	},
	launch_success: boolean,
	details: string,
	links: {
		video_link?: string,
		youtube_id?: string
	}
}

export enum LauchInfoActionTypes {
	GET_LAUNCH_INFO = 'GET_LAUNCH_INFO',
	SET_LAUNCH_INFO = 'SET_LAUNCH_INFO',
	UNSET_LAUNCH_INFO = 'UNSET_LAUNCH_INFO',
	SELECT_LAUNCH_INFO = 'SELECT_LAUNCH_INFO',
	SEND_LAUNCH_INFO = 'SEND_LAUNCH_INFO',
}

export interface GetLaunchInfoAction {
	type: typeof LauchInfoActionTypes.GET_LAUNCH_INFO,
	launchId: number,
	onSuccess: () => void,
	onFail: () => void
}

interface SetLaunchInfoAction {
	type: typeof LauchInfoActionTypes.SET_LAUNCH_INFO,
	launchInfo: LaunchInfo
}

interface UnsetLaunchInfoAction {
	type: typeof LauchInfoActionTypes.UNSET_LAUNCH_INFO
}

export interface SelectLaunchInfoAction {
	type: typeof LauchInfoActionTypes.SELECT_LAUNCH_INFO,
	name: string,
	checked: boolean
}

export interface SendLaunchInfoAction {
	type: typeof LauchInfoActionTypes.SEND_LAUNCH_INFO,
	callback: () => void
}

export type LaunchInfoActions =
	| GetLaunchInfoAction
	| SetLaunchInfoAction
	| UnsetLaunchInfoAction
	| SelectLaunchInfoAction
	| SendLaunchInfoAction

export interface LaunchInfoState {
	missionName: string,
	rocketName: string,
	launchSiteName: string,
	launchSuccess: boolean,
	details: string,
	videoLink?: string,
	youtubeId?: string,
	selectedInfoToBeSent: string[]
}