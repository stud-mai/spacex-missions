import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../components/Modal';
import CardContent from '../components/Card/CardContent';
import CardTitle from '../components/Card/CardTitle';
import Payload from '../components/Payload';
import LaunchInfoSender from '../components/LaunchInfoSender';
import { launchInfoSelector } from '../selectors/index';
import { unsetLaunchInfo, sendLaunchInfo, selectLaunchInfo } from '../store/launchInfo/actions';
import { LaunchInfoState } from '../store/launchInfo/types';
import { AppState } from '../store';

interface LaunchInfo {
	onClose: () => void
}

const LaunchInfo: React.FC<LaunchInfo> = ({ onClose }) => {
	const dispatch = useDispatch();
	const launchInfo = useSelector<AppState, LaunchInfoState>(launchInfoSelector);
	const { missionName, rocketName, launchSiteName, launchSuccess, details, selectedInfoToBeSent } = launchInfo;
	const sendLaunchInfoHandler = useCallback((callback: () => void) =>
		dispatch(sendLaunchInfo(callback)), []);
	const selectLaunchInfoHandler = useCallback((name, checked) => dispatch(selectLaunchInfo(name, checked)), []);

	useEffect(() => {
		return () => {
			dispatch(unsetLaunchInfo());
		};
	}, []);

	return (
		<Modal closeModal={onClose}>
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
					checkedFields={selectedInfoToBeSent}
					videoAvailable={Boolean(launchInfo.youtubeId || launchInfo.videoLink)}
					onSelect={selectLaunchInfoHandler}
					onSend={sendLaunchInfoHandler}
				/>
			</CardContent>
		</Modal>
	);
};

export default LaunchInfo;
