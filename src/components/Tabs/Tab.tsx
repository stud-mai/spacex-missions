import React, { useCallback } from 'react';
import styled from 'styled-components';

interface TabButtonProps {
	className?: string,
	selected?: boolean,
	onClick?: (value: string) => void
}

export interface TabProps extends TabButtonProps {
	value: string
}

const TabButton = styled.button<TabButtonProps>`
	display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 50px;
	padding: 0 24px;
	font-size: 16px;
    cursor: pointer;
    outline: none;
    background: transparent;
	border: none;
	transition: border .2s ease;
	border-bottom: 2px solid ${(props) => props.selected ? 'orange' : 'initial'};
	color: ${(props) => props.selected ? 'orange' : 'initial'};

	&:hover {
		color: orange;
	}
`;

const Tab: React.FC<TabProps> = ({ value, className, selected, onClick, children }) => {
	const clickHandler = useCallback(
		() => !selected && onClick && onClick(value),
		[selected, value]
	);
	return (
		<TabButton
			selected={selected}
			className={className}
			onClick={clickHandler}
		>
			{children}
		</TabButton>
	);
};

export default Tab;
