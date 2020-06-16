/* eslint-disable @typescript-eslint/no-explicit-any */

export const debounce = <F extends (...args: any[]) => void>(fn: F, t: number):
	(this: ThisParameterType<F>, ...args: any[]) => void => {
	let timer: number;
	return function (this: ThisParameterType<F>, ...args: any[]) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, t);
	};
};