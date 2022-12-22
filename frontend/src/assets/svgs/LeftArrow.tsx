import React from 'react';
import styles from '../../pages/Item.module.css';

const LeftArrow = () => {
	return (
		<svg className={ styles.item__image_arrows } xmlns="http://www.w3.org/2000/svg"
		     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px"
		     viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
			<g>
				<polyline fill="none" strokeWidth="2" strokeLinejoin="bevel" stroke-miterlimi="10"
				          points="37,15 20,32 37,49"/>
			</g>
		</svg>
	);
};

export default LeftArrow;