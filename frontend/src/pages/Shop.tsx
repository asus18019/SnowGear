import React, { FC } from 'react';
// @ts-ignore
import styles from './Shop.module.css'; // Todo fix import
import GoodsTile from '../components/GoodsTile';
import Filters from '../components/Filters';

const Shop: FC = () => {
	return (
		<div className={ styles.shop__wrapper }>
			<div className={ styles.shop }>
				<Filters />
				<div className={ styles.item__wrapper }>
					<GoodsTile/>
					<GoodsTile/>
					<GoodsTile/>
					<GoodsTile/>
					<GoodsTile/>
					<GoodsTile/>
					<GoodsTile/>
					<GoodsTile/>
					<GoodsTile/>
					<GoodsTile/>
					<GoodsTile/>
				</div>
			</div>
		</div>
	);
};

export default Shop;