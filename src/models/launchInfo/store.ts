import { createStore, combine, sample } from 'effector';
import {
	loadLaunchInfoFx,
	sendLaunchDataFx,
	sendLaunchInfo,
	resetLaunchInfo,
	selectLaunchInfo
} from './events';

interface LaunchInfoStore {
	missionName: string,
	rocketName: string,
	launchSiteName: string,
	launchSuccess: boolean,
	details: string,
	videoLink?: string,
	youtubeId?: string
}

const $launchInfo = createStore<LaunchInfoStore>({} as LaunchInfoStore);
const $selectedLaunchInfo = createStore<string[]>([]);
const $hideLaunchInfo = $launchInfo.map(store => !Object.keys(store).length);

$launchInfo
	.on(loadLaunchInfoFx.doneData, (store, launch) => {
		const { mission_name, rocket, launch_site, launch_success, details, links } = launch;
		return {
			missionName: mission_name,
			rocketName: rocket.rocket_name,
			launchSiteName: launch_site.site_name_long,
			launchSuccess: launch_success,
			details,
			videoLink: links.video_link,
			youtubeId: links.youtube_id
		};
	})
	.reset(resetLaunchInfo);

$selectedLaunchInfo
	.on(selectLaunchInfo, (store, { name, checked }) => {
		return checked
			? store.concat(name)
			: store.filter(n => n !== name);
	})
	.reset(resetLaunchInfo);

export const $launch = combine({
	launchInfo: $launchInfo,
	hideLaunchInfo: $hideLaunchInfo,
	selectedLaunchInfo: $selectedLaunchInfo
});

sample({
	source: $launch,
	clock: sendLaunchInfo,
	fn: ({ launchInfo, selectedLaunchInfo }) => {
		return selectedLaunchInfo.reduce((acc, name) => {
			if (name === 'video') {
				const videoLink = launchInfo.videoLink;
				return {
					...acc,
					[name]: videoLink ? videoLink : `https://www.youtube.com/embed/${launchInfo.youtubeId}`
				};
			}
			return {
				...acc,
				[name]: launchInfo[name as keyof LaunchInfoStore]
			};
		}, {});
	},
	target: sendLaunchDataFx
});