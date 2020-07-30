import { createEffect, createEvent } from 'effector';
import { getLaunch, someEndPoint } from '../../API';

export const loadLaunchInfoFx = createEffect({
	async handler(id: number) {
		const launchInfo = await getLaunch(id);
		return launchInfo;
	}
});

loadLaunchInfoFx.fail.watch(({ error }) => {
	console.error('Error:', error);
});

export const sendLaunchDataFx = createEffect({
	async handler(data: { [key: string]: string }) {
		const response = await someEndPoint(data);
		alert('Data has been sent');
		console.log(response);
	}
});

export const sendLaunchInfo = createEvent<void>();
export const resetLaunchInfo = createEvent<void>();
export const selectLaunchInfo = createEvent<{ name: string, checked: boolean }>();
