import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Progress from '../components/Progress';
import HistoryCard from '../components/HistoryCard';
import { getHistory as getHistoryAction} from '../store/history/actions';
import { HistoryState } from '../store/history/types';
import { AppState } from '../store';

const History: React.FC = () => {
	const dispatch = useDispatch();
	const history = useSelector<AppState, HistoryState>(state => state.history);
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		const callback = (): void => setFetching(false);
		dispatch(getHistoryAction(callback));
	}, []);

	return (
		<Fragment>
			<Progress open={fetching} />
			{history.map(({ id, ...rest }) => (
				<HistoryCard key={id} {...rest} />
			))}
		</Fragment>
	);
};

export default History;
