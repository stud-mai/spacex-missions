import React, { memo } from 'react';
import styled from 'styled-components';

import Card from './Card/Card';
import CardTitle from './Card/CardTitle';
import CardSubtitle from './Card/CardSubtitle';
import CardContent from './Card/CardContent';
import CardAction from './Card/CardAction';
import { HistoryItem } from '../store/history/types';

type HistoryCardProps = Omit<HistoryItem, 'id'>;

const CardActionContainer = styled.div`
	margin-top: auto;
`;

const HistoryCard: React.FC<HistoryCardProps> = ({ title, date, flightNumber, details, links }) => {
	const localDate = new Date(date).toLocaleDateString();
	return (
		<Card>
			<CardTitle>{title}</CardTitle>
			<CardSubtitle>{localDate}</CardSubtitle>
			{flightNumber &&
				<CardContent>Flight number: {flightNumber}</CardContent>
			}
			<CardContent>{details}</CardContent>
			<CardActionContainer>
				{Object.entries(links).map(([source, link]) => link && (
					<CardAction key={source} href={link} target="_blank">Read {source}</CardAction>
				))}
			</CardActionContainer>
		</Card>
	);
};

export default memo(HistoryCard);
