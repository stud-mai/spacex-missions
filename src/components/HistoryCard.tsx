import React from 'react';
import Card from './Card/Card';
import CardBody from './Card/CardBody';
import CardTitle from './Card/CardTitle';
import CardSubtitle from './Card/CardSubtitle';
import CardContent from './Card/CardContent';
import CardAction from './Card/CardAction';

interface HistoryCardProps {
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

const HistoryCard: React.FC<HistoryCardProps> = ({ title, date, flightNumber, details, links }) => {
	const localDate = new Date(date).toLocaleDateString();
	return (
		<Card>
			<CardBody>
				<CardTitle>{title}</CardTitle>
				<CardSubtitle>{localDate}</CardSubtitle>
				{flightNumber &&
					<CardContent>Flight number: {flightNumber}</CardContent>
				}
				<CardContent>{details}</CardContent>
				{Object.entries(links).map(([source, link]) => link && (
					<CardAction key={source} href={link} target="_blank">Read {source}</CardAction>
				))}
			</CardBody>
		</Card>
	);
};

export default HistoryCard;
