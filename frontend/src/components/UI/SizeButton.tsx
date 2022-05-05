import React, { FC } from 'react';
// @ts-ignore
import styles from './SizeButton.module.css';

interface SizeButtonProps {
	size: string;
}

const SizeButton: FC<SizeButtonProps> = ({ size }) => {
	return (
		<div className={ `${styles.size_button} {styles.selected}` }>
			{ size }
		</div>
	);
};

export default SizeButton;