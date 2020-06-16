export interface History {
	id: number,
	title: string,
	event_date_utc: string,
	event_date_unix: number,
	flight_number: number | null,
	details: string,
	links: {
		reddit: string | null,
		article: string | null,
		wikipedia: string | null
	}
}

export enum HistoryActionTypes {
	GET_HISTORY_DATA = 'GET_HISTORY_DATA',
	SET_HISTORY_DATA = 'SET_HISTORY_DATA',
}

export interface GetHistoryAction {
	type: typeof HistoryActionTypes.GET_HISTORY_DATA,
	callback: () => void
}

interface SetHistoryAction {
	type: typeof HistoryActionTypes.SET_HISTORY_DATA,
	history: History[]
}

export type HistoryActions = SetHistoryAction | GetHistoryAction

// type AnyFunction = (...args: any[]) => any;
// type StringMap<T> = { [key: string]: T };

// export interface AnyAction extends Action {
// 	[extraProps: string]: any
// }

// export type Action<T extends string = string, P = void> = P extends void
// 	? ReduxAction<T>
// 	: ReduxAction<T> & Readonly<{ payload: P }>;

// export type ActionsUnion<A extends StringMap<AnyFunction>> = ReturnType<
// 	A[keyof A]
// >;

export type HistoryItem = {
	id: number,
	title: string,
	date: string,
	flightNumber: number | null,
	details: string,
	links: {
		reddit: string | null,
		article: string | null,
		wikipedia: string | null
	}
}

export type HistoryState = HistoryItem[]