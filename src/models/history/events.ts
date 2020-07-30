import { createEffect } from 'effector';
import { getHistory } from '../../API';

export const loadHistoryFx = createEffect({
	async handler() {
		const history = await getHistory();
		return history;
	}
});

loadHistoryFx.fail.watch(({ error }) => {
	console.error('Error:', error);
});