import React, { useState, Fragment } from 'react';

import History from '../containers/History';
import Placeholder from './Placeholder';
import ResetStyles from './ResetStyles';
import Tabs from './Tabs/Tabs';
import Tab from './Tabs/Tab';
import TabContent from './Tabs/TabContent';

type TabContent = {
	[key: string]: React.ReactNode
}

const tabContent: TabContent = {
	history: <History />,
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
