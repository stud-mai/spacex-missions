import React, { memo } from 'react';
import styled from 'styled-components';

import Card from './Card/Card';
import CardTitle from './Card/CardTitle';
import CardSubtitle from './Card/CardSubtitle';
import CardContent from './Card/CardContent';
import Payload from './Payload';
import { LaunchItem } from '../store/launches/types';

type LaunchCardProps = Omit<LaunchItem, 'id'>;

const PayloadTitle = styled.div`
	font-style: italic;
	margin-bottom: 2px;
`;

const StyledCardContent = styled(CardContent)`
	&:last-of-type {
		margin-bottom: 0;
	}
`;

const LaunchCard: React.FC<LaunchCardProps> = ({ name, date, payloads }) => {
	const localDate = new Date(date).toLocaleDateString();
	return (
		<Card>
			<CardTitle>Mission {name}</CardTitle>
			<CardSubtitle>{localDate}</CardSubtitle>
			{payloads.map(({ manufacturer, nationality, type }, id) => (
				<StyledCardContent key={`${type}-${id}`}>
					<PayloadTitle>Payload{payloads.length > 1 ? ` ${id + 1}` : ''}:</PayloadTitle>
					<Payload title="Type" text={type} />
					<Payload title="Produced by" text={manufacturer} />
					<Payload title="Made in" text={nationality} />
				</StyledCardContent>
			))}
		</Card>
	);
};

export default memo(LaunchCard);
