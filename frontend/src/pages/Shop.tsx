import React, { FC, useState } from 'react';
import styles from './Shop.module.css';
import GoodsTile from '../components/GoodsTile';
import Filters from '../components/Filters';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../router/router';
import { IEquipment } from '../models/IEquipment';
import {
	filterByCategory, filterByPrice, filterBySize,
	filterByTitle, isAnyFilter,
	isCategoryFiltering,
	isPriceFiltering, isSizeFiltering,
	isTitleFiltering,
} from '../utils/filters';
import { IFilters } from '../models/IFilters';
import { useAppSelector } from '../hooks/redux';

const Shop: FC = () => {
	const { goods } = useMatch<LocationGenerics>().data;
	const initialFiltersData = useAppSelector(state => state.filtersReducer);

	const [goodsArray, setGoodsArray] = useState<IEquipment[]>(goods || []);
	let filteredGoodsArray: IEquipment[] = goods || [];
	const [filters, setFilters] = useState<IFilters>(initialFiltersData);

	const initialGoodsPerPage = 5;
	const [goodsPerPage, setGoodsPerPage] = useState(initialGoodsPerPage);
	const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);

	const isFiltering = (): boolean => {
		if(isAnyFilter(filters)) {
			let res: IEquipment[] = goodsArray;
			if(isCategoryFiltering(filters.categoryFilter)) {
				res = filterByCategory(res, filters.categoryFilter);
			}

			if(isTitleFiltering(filters.titleFilter)) {
				res = filterByTitle(res, filters.titleFilter);
			}

			if(isPriceFiltering(filters.priceFilter)) {
				res = filterByPrice(res, filters.priceFilter);
			}

			if(isSizeFiltering(filters.sizeFilter)) {
				res = filterBySize(res, filters.sizeFilter);
			}

			filteredGoodsArray = res.slice(0, goodsPerPage);
			return true;
		}

		return false;
	};

	return (
		<div className={ styles.shop__wrapper }>
			<div className={ styles.shop }>
				<Filters changeFilters={ setFilters } filters={ filters }/>
				<div className={ styles.goods__wrapper }>
					<div className={ styles.item__wrapper }>
						{
							isFiltering()
								? filteredGoodsArray.map(equipment => {
									return <GoodsTile
										key={ equipment.eid }
										eid={ equipment.eid }
										image={ equipment.image }
										title={ equipment.title }
										price={ equipment.price }
										size={ equipment.size }
									/>;
								})
								: goodsArray.slice(0, goodsPerPage).map(equipment => {
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
					<div className={ styles.showMore_wrapper }>
						{
							showLoadMoreBtn && <div
								className={ styles.showMore_button }
								onClick={ () => setGoodsPerPage(prevState => prevState + initialGoodsPerPage) }
							>LOAD MORE</div>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;