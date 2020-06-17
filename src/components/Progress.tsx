import React from 'react';
import styled from 'styled-components';

import Backdrop, { BackdropProps } from './Backdrop';
import Placeholder from './Placeholder';

const AnimatedPlaceholder = styled(Placeholder)`
	max-width: 100px;
	animation: 1.8s rocket ease infinite;

	@media (min-width: 768px) {
        max-width: 150px;
    }

	@keyframes rocket {
		0%{
			transform: translate(-80%, 80%) scale(0.5);
			opacity: 0;
		}
		50%{
			transform: translate(0,0) scale(0.8);
			opacity: 1;
		}
		100%{
			transform: translate(80%, -80%) scale(1.1);
			opacity: 0;
		}
	}
`;

const Propgress: React.FC<BackdropProps> = ({ open }) => (
	<Backdrop open={open}>
		<AnimatedPlaceholder />
	</Backdrop>
);

export default Propgress;
