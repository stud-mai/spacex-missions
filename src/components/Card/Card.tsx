import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
	margin: 12px 8px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 4px;

    &:hover,:focus {
        cursor: pointer;
    }

    @media (min-width: 768px) {
        flex-basis: 45%
    }

    @media (min-width: 1024px) {
        flex-basis: 30%
    }
`;