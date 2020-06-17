import React from 'react';
import styled from 'styled-components';

interface Option {
	value: string,
	name: string
}

interface SelectProps {
	id?: string,
	options: Option[],
	onChange: (event: React.ChangeEvent<{ value: string }>) => void
}

const StyledSelect = styled.select`
	display: block;
    width: 100%;
    height: 40px;
    padding: 6px 12px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.2);;
    border-radius: 4px;
`;

const Select: React.FC<SelectProps> = ({ id, options, onChange }) => (
	<StyledSelect id={id} onChange={onChange} defaultValue="hidden">
		<option disabled hidden value="hidden">Select an option</option>
		{options.map(({ value, name }) => (
			<option key={value} value={value}>{name}</option>
		))}
	</StyledSelect>
);

export default Select;