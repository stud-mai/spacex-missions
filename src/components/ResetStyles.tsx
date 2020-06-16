import { createGlobalStyle } from 'styled-components';

export const ResetStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	input, select {
		font-family: Roboto, Arial, sans-serif;
		font-size: 14px;
	}

	:root {
		font-size: 14px;
		font-family: Roboto, Arial, sans-serif;

		@media (min-width: 768px) {
			font-size: 16px;
		}
	}
`;

export default ResetStyles;