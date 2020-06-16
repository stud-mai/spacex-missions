import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Progress from '../components/Progress';
import HistoryCard from '../components/HistoryCard';
import { getHistory } from '../store/history/actions';
import { HistoryState } from '../store/history/types';
import { AppState } from '../store';
import Container from '../components/CardsContainer';

const History: React.FC = () => {
	const dispatch = useDispatch();
	const history = useSelector<AppState, HistoryState>(state => state.history);
	const [fetching, setFetching] = useState<boolean>(false);

	useEffect(() => {
		if (!history.length) {
			setFetching(true);
			dispatch(getHistory(() => setFetching(false)));
		}
	}, []);

	return (
		<Fragment>
			<Progress open={fetching} />
			<Container>
				{history.map(({ id, ...rest }) => (
					<HistoryCard key={id} {...rest} />
				))}
			</Container>
		</Fragment>
	);
};

export default History;
