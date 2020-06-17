import React, { Fragment } from 'react';

import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

interface LaunchInfoSenderProps {
	videoAvailable: boolean,
	checkedFields: string[],
	onSelect: (name: string, checked: boolean) => void,
	onSend: () => void
}

const LaunchInfoSender: React.FC<LaunchInfoSenderProps> = ({ videoAvailable, checkedFields, onSelect, onSend }) => (
	<Fragment>
		Select what information to be sent:
		<Checkbox
			name="missionName"
			label="Mission Name"
			checked={checkedFields.includes('missionName')}
			onChange={onSelect}
		/>
		<Checkbox
			name="rocketName"
			label="Rocket Name"
			checked={checkedFields.includes('rocketName')}
			onChange={onSelect}
		/>
		<Checkbox
			name="launchSiteName"
			label="Launch Site Name"
			checked={checkedFields.includes('launchSiteName')}
			onChange={onSelect}
		/>
		{videoAvailable &&
			<Checkbox
				name="video"
				label="Link to video"
				checked={checkedFields.includes('video')}
				onChange={onSelect}
			/>
		}
		<Button onClick={onSend} disabled={!checkedFields.length}>Send</Button>
	</Fragment>
);

export default LaunchInfoSender;
