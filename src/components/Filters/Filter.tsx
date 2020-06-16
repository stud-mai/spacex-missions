import styled from 'styled-components';

export default styled.div`
	flex: 1 1 auto;
	margin: 12px 8px;
	width: 100%;

	@media (min-width: 768px) {
        flex-basis: 45%
    }

    @media (min-width: 1024px) {
        flex-basis: 30%
    }
`;