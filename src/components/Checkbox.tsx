import React from 'react';
import styled from 'styled-components';
import Input from './Filters/Input';
import Label from './Filters/Label';

interface CheckboxProps {
	name: string,
	label?: string,
	checked: boolean,
	onChange: (name: string, checked: boolean) => void
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 4px 0;
`;

const StyledInput = styled(Input)`
	width: auto;
	height: auto;
    margin-right: 8px;
`;

const Checkbox: React.FC<CheckboxProps> = ({ name, label, checked, onChange }) => {
	const changeHandler = (event: React.ChangeEvent<{ checked: boolean, name: string }>) => {
		const { name, checked } = event.target;
		onChange(name, checked);
	};
	return (
		<Wrapper>
			<StyledInput id={`id-${name}`} type="checkbox" name={name} checked={checked} onChange={changeHandler} />
			<Label htmlFor={`id-${name}`}>{label}</Label>
		</Wrapper>
	);
};

export default Checkbox;