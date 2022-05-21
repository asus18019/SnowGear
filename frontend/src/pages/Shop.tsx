import React, { FC, useState } from 'react';
// @ts-ignore
import styles from './Shop.module.css'; // Todo fix import
import GoodsTile from '../components/GoodsTile';
import Filters from '../components/Filters';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../router/router';
import { IEquipment } from '../models/IEquipment';
import { filterByCategory, filterByTitle, isCategoryFiltering, isTitleFiltering } from '../utils/filters';
import { IFilters } from '../models/IFilters';
import { useAppSelector } from '../hooks/redux';

const Shop: FC = () => {
	const { goods } = useMatch<LocationGenerics>().data;
	const initialFiltersData = useAppSelector(state => state.filtersReducer);

	const [goodsArray, setGoodsArray] = useState<IEquipment[]>(goods || []);
	let filteredGoodsArray: IEquipment[] = goods || [];
	const [filters, setFilters] = useState<IFilters>(initialFiltersData);

	const isFiltering = (): boolean => {
		if(isCategoryFiltering(filters.categoryFilter) || isTitleFiltering(filters.titleFilter)) {
			let res: IEquipment[] = goodsArray;
			if(isCategoryFiltering(filters.categoryFilter)) {
				res = filterByCategory(res, filters.categoryFilter);
			}

			if(isTitleFiltering(filters.titleFilter)) {
				res = filterByTitle(res, filters.titleFilter);
			}

			filteredGoodsArray = res;
			return true;
		}

		return false;
	};

	return (
		<div className={ styles.shop__wrapper }>
			<div className={ styles.shop }>
				<Filters changeFilters={ setFilters } filters={filters}/>
				<div className={ styles.item__wrapper }>
					{
						!isFiltering()
							? goodsArray.map(equipment => {
								console.log('not filtering');
								return <GoodsTile
									key={ equipment.eid }
									eid={ equipment.eid }
									image={ equipment.image }
									title={ equipment.title }
									price={ equipment.price }
									size={ equipment.size }
								/>;
							})
							: filteredGoodsArray.map(equipment => {
								console.log('filtering');

								return <GoodsTile
									key={ equipment.eid }
									eid={ equipment.eid }
									image={ equipment.image }
									title={ equipment.title }
									price={ equipment.price }
									size={ equipment.size }
								/>;
							})
					}
				</div>
			</div>
		</div>
	);
};

export default Shop;