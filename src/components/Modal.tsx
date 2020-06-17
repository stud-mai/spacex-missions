import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Backdrop from './Backdrop';

interface ModalProps {
	closeModal: () => void
}

const ModalContent = styled.div`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    padding: 24px 32px;
    margin: 32px;
    max-width: 600px;
`;

const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
	const modalContainer = document.querySelector('body');

	useEffect(() => {
		const body = document.querySelector('body');
		body?.classList.add('modal-open');

		return () => {
			body?.classList.remove('modal-open');
		};
	}, []);

	if (!modalContainer) return null;

	return ReactDOM.createPortal(
		<Backdrop open onClick={closeModal}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				{children}
			</ModalContent>
		</Backdrop>,
		modalContainer
	);
};

export default Modal;