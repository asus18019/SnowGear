import React, { FC, useEffect } from 'react';
// @ts-ignore
import styles from './AdditionalButton.module.css';

interface AdditionalButtonProps {
	size: string;
	clickHandler: (e: any) => void;
	isSelected: boolean;
}

const AdditionalButton: FC<AdditionalButtonProps> = ({ size, clickHandler, isSelected }) => {
	return (
		<div className={ `${ styles.size_button } ${ isSelected && styles.selected }` } onClick={ (e) => clickHandler(e.target) }>
			{ size }
		</div>
	);
};

export default AdditionalButton;