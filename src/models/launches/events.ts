import { createEffect } from 'effector';
import { getLauches } from '../../API';

export const loadLaunchesFx = createEffect({
	async handler() {
		const launches = await getLauches();
		return launches;
	}
});

loadLaunchesFx.fail.watch(({ error }) => {
	console.error('Error:', error);
});