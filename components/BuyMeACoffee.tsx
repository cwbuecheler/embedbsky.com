import { FC } from 'react';

import { Button } from '@mantine/core';

const BuyMeACoffee: FC = () => (
	<Button
		color="#228be6"
		component="a"
		href="https://buymeacoffee.com/cwbuecheler"
		rel="noopener noreferrer"
		target="_blank"
		style={{ marginLeft: '1rem' }}
	>
		☕ Buy Me a Coffee
	</Button>
);

export default BuyMeACoffee;
