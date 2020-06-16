import styled from 'styled-components';

const TabContent = styled.div`
	width: 100%;
	min-height: calc(100vh - 58px);
	padding: 0 12px;

	@media (min-width: 768px) {
        padding: 0 24px;
    }
`;

export default TabContent;