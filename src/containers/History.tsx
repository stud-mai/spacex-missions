import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Progress from '../components/Progress';
import HistoryCard from '../components/HistoryCard';
import CardsContainer from '../components/CardsContainer';
import { historySelector } from '../selectors';
import { getHistory } from '../store/history/actions';
import { HistoryState } from '../store/history/types';
import { AppState } from '../store';

const History: React.FC = () => {
	const dispatch = useDispatch();
	const history = useSelector<AppState, HistoryState>(historySelector);
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
			<CardsContainer>
				{history.map(({ id, ...rest }) => (
					<HistoryCard key={id} {...rest} />
				))}
			</CardsContainer>
		</Fragment>
	);
};

export default History;
