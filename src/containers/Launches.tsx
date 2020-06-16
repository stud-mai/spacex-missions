import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Progress from '../components/Progress';
import Container from '../components/CardsContainer';
import LaunchCard from '../components/LaunchCard';
import FiltersContainer from '../components/Filters/FiltersContainer';
import Filter from '../components/Filters/Filter';
import Select from '../components/Filters/Select';
import Input from '../components/Filters/Input';
import Label from '../components/Filters/Label';

import { getLaunches } from '../store/launches/actions';
import { updateLaunchName, updateLaunchDate, updateLaunchOrbit } from '../store/filters/actions';
import { filteredLaunchesSelector, orbitFilterOptionsSelector } from '../selectors';
import { LaunchesState } from '../store/launches/types';
import { AppState } from '../store';
import { debounce } from '../utils';

const Launches: React.FC = () => {
	const dispatch = useDispatch();
	const launches = useSelector<AppState, LaunchesState>(filteredLaunchesSelector);
	const orbitFilterOptions = useSelector<AppState, Map<string, string>>(orbitFilterOptionsSelector);
	const [fetching, setFetching] = useState<boolean>(false);

	const debouncedSetNameFilter = useCallback(
		debounce((name: string) => dispatch(updateLaunchName(name)), 250), []
	);
	const changeNameFilterHandler = useCallback((event: React.ChangeEvent<{ value: string }>) => {
		debouncedSetNameFilter(event.target.value);
	}, []);
	const changeDateFilterHandler = useCallback((event: React.ChangeEvent<{ value: string }>) => {
		const date = new Date(event.target.value).valueOf();
		dispatch(updateLaunchDate(date));
	}, []);
	const changeOrbitFilterHandler = useCallback((event: React.ChangeEvent<{ value: string }>) => {
		dispatch(updateLaunchOrbit(event.target.value));
	}, []);

	const orbitOptions = [...orbitFilterOptions.entries()].map(([id, name]) => ({ value: id, name }));

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
				<Filter>
					<Label htmlFor="orbits-filter">Orbit:</Label>
					<Select options={orbitOptions} onChange={changeOrbitFilterHandler} />
				</Filter>
			</FiltersContainer>
			<Container>
				{launches.map(({ id, ...rest }) => (
					<LaunchCard key={id} {...rest} />
				))}
			</Container>
		</Fragment>
	);
};

export default Launches;