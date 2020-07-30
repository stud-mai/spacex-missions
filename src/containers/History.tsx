import React, { Fragment, useEffect } from 'react';
import { useStore } from 'effector-react';

import Progress from '../components/Progress';
import HistoryCard from '../components/HistoryCard';
import CardsContainer from '../components/CardsContainer';

import { loadHistoryFx } from '../models/history/events';
import { $history } from '../models/history/store';

const History: React.FC = () => {
	const history = useStore($history);
	const fetching = useStore(loadHistoryFx.pending);

	useEffect(() => {
		if (!history.length) {
			loadHistoryFx();
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
