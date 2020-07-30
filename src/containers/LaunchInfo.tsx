import React from 'react';
import { useStore } from 'effector-react';

import Modal from '../components/Modal';
import CardContent from '../components/Card/CardContent';
import CardTitle from '../components/Card/CardTitle';
import Payload from '../components/Payload';
import LaunchInfoSender from '../components/LaunchInfoSender';

import {
	resetLaunchInfo,
	selectLaunchInfo,
	sendLaunchInfo,
	sendLaunchDataFx
} from '../models/launchInfo/events';
import { $launch } from '../models/launchInfo/store';

interface LaunchInfo {
	onClose: () => void
}

const onCloseModal = () => resetLaunchInfo();
const onSendInfo = () => sendLaunchInfo();

const LaunchInfo: React.FC = () => {
	const { launchInfo, hideLaunchInfo, selectedLaunchInfo } = useStore($launch);
	const sendingData = useStore(sendLaunchDataFx.pending);
	const { missionName, rocketName, launchSiteName, launchSuccess, details } = launchInfo;

	if (hideLaunchInfo) return null;

	return (
		<Modal closeModal={onCloseModal}>
			<CardTitle>{missionName}</CardTitle>
			<Payload title="Rocket Name" text={rocketName} />
			<Payload title="Launch Site Name" text={launchSiteName} />
			<Payload title="Successful Launch" text={launchSuccess ? 'Yes' : 'No'} />
			<CardContent>{details}</CardContent>
			<CardContent>
				{launchInfo.youtubeId
					? <iframe width="500" height="320" src={`https://www.youtube.com/embed/${launchInfo.youtubeId}`} />
					: launchInfo.videoLink
						? <video controls width="500" height="320" src={launchInfo.videoLink} />
						: null
				}
			</CardContent>
			<CardContent>
				<LaunchInfoSender
					checkedFields={selectedLaunchInfo}
					videoAvailable={Boolean(launchInfo.youtubeId || launchInfo.videoLink)}
					buttonDisabled={sendingData}
					onSelect={selectLaunchInfo}
					onSend={onSendInfo}
				/>
			</CardContent>
		</Modal>
	);
};

export default LaunchInfo;
