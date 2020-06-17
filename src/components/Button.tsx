import styled from 'styled-components';

export default styled.button`
	display: inline-block;
	background-color: orange;
	color: white;
	font-size: 16px;
    text-align: center;
    vertical-align: middle;
    padding: 6px 12px;
	border-radius: 4px;
	border: 1px solid transparent;
	cursor: pointer;

	&:disabled {
		opacity: .5;
		cursor: auto;
	}
`;