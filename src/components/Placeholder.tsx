import styled from 'styled-components';

import RocketLogo from '../assets/rocket.svg';

export default styled(RocketLogo)`
	max-width: 200px;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;

	@media (min-width: 768px) {
        max-width: 300px;
    }
`;