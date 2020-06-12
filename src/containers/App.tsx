import React, { useState, Fragment } from 'react';

import ResetStyles from '../components/ResetStyles';
import Tabs from '../components/Tabs';
import Tab from '../components/Tab';
import TabContent from '../components/TabContent';
import Placeholder from '../components/Placeholder';

type TabContent = {
	[key: string]: React.ReactNode
}

const tabContent: TabContent = {
	history: 'History',
	launches: 'Launches',
	placeholder: <Placeholder />
};

const App: React.FC<unknown> = () => {
	const [activeTab, setActiveTab] = useState<string>('placeholder');
	return (
		<Fragment>
			<ResetStyles />
			<Tabs active={activeTab} onChange={setActiveTab}>
				<Tab value="history">History</Tab>
				<Tab value="launches">Launches</Tab>
			</Tabs>
			<TabContent>
				{tabContent[activeTab]}
			</TabContent>
		</Fragment>
	);
};

export default App;
