import React from 'react';
import styled from 'styled-components';

import { TabProps } from './Tab';

interface TabsProps {
	active: string,
	onChange: (value: string) => void,
	className?: string,
	children: React.ReactElement<TabProps>[]
}

const TabsContainer = styled.div`
	display: flex;
	margin-bottom: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const Tabs: React.FC<TabsProps> = ({ active, onChange, className, children }) => {
	return (
		<TabsContainer className={className}>
			{React.Children.map(children, (child: React.ReactElement<TabProps>) => {
				return React.cloneElement(child, {
					selected: child.props.value === active,
					onClick: onChange
				});
			})}
		</TabsContainer>
	);
};

export default Tabs;
