import React, { Fragment, useEffect, useCallback } from 'react';
import { useStore } from 'effector-react';

import Progress from '../components/Progress';
import CardsContainer from '../components/CardsContainer';
import LaunchCard from '../components/LaunchCard';
import FiltersContainer from '../components/Filters/FiltersContainer';
import Filter from '../components/Filters/Filter';
import Select from '../components/Filters/Select';
import Input from '../components/Filters/Input';
import Label from '../components/Filters/Label';
import LaunchInfo from './LaunchInfo';

import {
	loadOrbitsFx,
	resetFilters,
	launchNameChanged,
	launchDateChanged,
	launchOrbitChanged
} from '../models/filters/events';
import { loadLaunchesFx } from '../models/launches/events';
import { loadLaunchInfoFx } from '../models/launchInfo/events';
import { $filters } from '../models/filters/store';
import { $lauchesStore } from '../models/launches/store';
import { debounce } from '../utils';


const Launches: React.FC = () => {
	const { launches, launchesFetching, launchesLoaded } = useStore($lauchesStore);
	const { orbitFilterOptions } = useStore($filters);
	const orbitsFetching = useStore(loadOrbitsFx.pending);
	const launchInfoFetching = useStore(loadLaunchInfoFx.pending);
	const fetching = launchesFetching || orbitsFetching || launchInfoFetching;

	const debouncedSetNameFilter = useCallback(
		debounce((name: string) => launchNameChanged(name), 250), []
	);
	const changeNameFilterHandler = useCallback((event: React.ChangeEvent<{ value: string }>) => {
		debouncedSetNameFilter(event.target.value);
	}, []);
	const changeDateFilterHandler = useCallback((event: React.ChangeEvent<{ value: string }>) => {
		launchDateChanged(event.target.value);
	}, []);
	const changeOrbitFilterHandler = useCallback((event: React.ChangeEvent<{ value: string }>) => {
		launchOrbitChanged(event.target.value);
	}, []);

	useEffect(() => {
		if (launchesLoaded) {
			loadLaunchesFx();
			loadOrbitsFx();
		}
		return () => resetFilters();
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
					<Select id="orbits-filter" options={orbitFilterOptions} onChange={changeOrbitFilterHandler} />
				</Filter>
			</FiltersContainer>
			<CardsContainer>
				{launches.map(launch => (
					<LaunchCard key={launch.id} {...launch} onClick={loadLaunchInfoFx} />
				))}
			</CardsContainer>
			<LaunchInfo />
		</Fragment>
	);
};

export default Launches;