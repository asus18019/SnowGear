import React, { FC, useEffect } from 'react';
// @ts-ignore
import styles from './Shop.module.css'; // Todo fix import
import GoodsTile from '../components/GoodsTile';
import Filters from '../components/Filters';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../router/router';

const Shop: FC = () => {
	const { goods } = useMatch<LocationGenerics>().data;

	return (
		<div className={ styles.shop__wrapper }>
			<div className={ styles.shop }>
				<Filters/>
				<div className={ styles.item__wrapper }>
					{
						goods?.map(equipment => {
							return <GoodsTile
								key={ equipment.eid }
								eid={ equipment.eid }
								image={ equipment.image }
								title={ equipment.title }
								price={ equipment.price }
							/>;
						})
					}
				</div>
			</div>
		</div>
	);
};

export default Shop;