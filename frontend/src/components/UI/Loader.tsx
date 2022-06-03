import React from 'react';
// @ts-ignore
import styles from './Loader.module.css';

const Loader = () => {
	return (
		<div className={ styles.loader }>
			<div className={ styles.bar }></div>
		</div>
	);
};

export default Loader;