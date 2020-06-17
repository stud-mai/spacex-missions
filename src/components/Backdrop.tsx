import styled from 'styled-components';

export interface BackdropProps {
	open?: boolean
}

export default styled.div<BackdropProps>`
	display: ${(props) => props.open ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
	background: rgb(0,0,0,0.5);
	z-index: 9999;
`;