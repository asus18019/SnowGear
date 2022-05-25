import React from 'react';
// @ts-ignore
import styles from './CurrentOrders.module.css';

const CurrentOrders = () => {
	return (
		<div className={ styles.current_orders__wrapper }>
			<h2 className={ styles.component__title }>Current rents</h2>
			<div className={ styles.line }></div>
		</div>
	);
};

export default CurrentOrders;