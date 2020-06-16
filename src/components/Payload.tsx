import React from 'react';
import styled from 'styled-components';

interface PayloadProps {
	title: string,
	text: string | null
}

const PayloadHeader = styled.span`
	font-weight: 700;
`;

const PayloadText = styled.span`
	margin-left: 8px;

	@media (min-width: 768px) {
    	font-size: 15px;
    }
`;

const Payload: React.FC<PayloadProps> = ({ title, text }) => text
	? <div>
		<PayloadHeader>{title}:</PayloadHeader>
		<PayloadText>{text}</PayloadText>
	</div>
	: null;

export default Payload;