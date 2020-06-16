import React, { Fragment, useEffect, useState, useCallback, ReactNodeArray } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Progress from '../components/Progress';
import Container from '../components/CardsContainer';
import LaunchCard from '../components/LaunchCard';
import FiltersContainer from '../components/Filters/FiltersContainer';
import Filter from '../components/Filters/Filter';
import Input from '../components/Filters/Input';
import Label from '../components/Filters/Label';
import { getLaunches } from '../store/launches/actions';
import { LaunchesState } from '../store/launches/types';
import { AppState } from '../store';
import { debounce } from '../utils';

const Launches: React.FC = () => {
	const dispatch = useDispatch();
	const launches = useSelector<AppState, LaunchesState>(state => state.launches);
	const [fetching, setFetching] = useState<boolean>(false);
	const [nameFilter, setNameFilter] = useState<string>('');
	const [dateFilter, setDateFilter] = useState<number>(NaN);

	const debouncedSetNameFilter = useCallback(
		debounce((filter: string) => setNameFilter(filter), 250), []
	);
	const changeNameFilterHandler = useCallback((event: React.ChangeEvent<{ value: string }>) => {
		debouncedSetNameFilter(event.target.value);
	}, []);
	const changeDateFilterHandler = useCallback((event: React.ChangeEvent<{ value: string }>) => {
		setDateFilter(new Date(event.target.value).valueOf());
	}, []);

	useEffect(() => {
		if (!launches.length) {
			setFetching(true);
			dispatch(getLaunches(() => setFetching(false)));
		}
	}, []);

	return (
		<Fragment>
			<Progress open={fetching} />
			<FiltersContainer>
				<Filter>
					<Label htmlFor="mission-name-filter">Mission name:</Label>
					<Input id="mission-name-filter" type="text" onChange={changeNameFilterHandler} />
				</Filter>
				<Filter>
					<Label htmlFor="mission-date-filter">Mission date:</Label>
					<Input id="mission-date-filter" type="date" onChange={changeDateFilterHandler} />
				</Filter>
			</FiltersContainer>
			<Container>
				{launches.reduce((acc, { id, name, date, ...rest }) => {
					const lowerCasedName = name.toLocaleLowerCase();
					const lowerCasedFilter = nameFilter.toLocaleLowerCase();
					const missionUnixTime = new Date(date.split('T')[0]).valueOf();

					if (lowerCasedName.includes(lowerCasedFilter) &&
						(isNaN(dateFilter) || dateFilter === missionUnixTime)) {
						return acc.concat(<LaunchCard key={id} name={name} date={date} {...rest} />);
					}
					return acc;
				}, [] as ReactNodeArray)}
			</Container>
		</Fragment>
	);
};

export default Launches;