import { ICategoryFilter, IFilters, IPriceFilter, ISizeFilter, ITitleFilter } from '../models/IFilters';
import { IEquipment } from '../models/IEquipment';

export const initialFilters: IFilters = {
	categoryFilter: {
		skies: false,
		snowboard: false,
		sleds: false,
		boots: false,
		overalls: false,
		gloves: false,
		hats: false,
	},
	titleFilter: {
		title: ''
	},
	priceFilter: {
		min: -1,
		max: -1
	},
	sizeFilter: {
		sizes: []
	}
}

export const isAnyFilter = (filters: IFilters): boolean => {
	return isCategoryFiltering(filters.categoryFilter) || isTitleFiltering(filters.titleFilter) || isPriceFiltering(filters.priceFilter) || isSizeFiltering(filters.sizeFilter)
};

export const isCategoryFiltering = (filters: ICategoryFilter): boolean => {
	for(const property in filters) {
		// @ts-ignore
		if(filters[property] === true) {
			return true;
		}
	}

	return false;
};

export const isTitleFiltering = (filters: ITitleFilter): boolean => {
	return filters.title.trim() !== '';
};

export const isPriceFiltering = (filters: IPriceFilter): boolean => {
	return filters.max !== -1 || filters.min !== -1;
};

export const isSizeFiltering = (filters: ISizeFilter): boolean => {
	return filters.sizes.length > 0;
};

export const filterByCategory = (data: IEquipment[], filters: ICategoryFilter) => {
	return data.filter(item => {
		const properties: string[] = [];
		for(const filtersKey in filters) {
			// @ts-ignore
			if(filters[filtersKey] === true) {
				properties.push(filtersKey);
			}
		}

		for(let i = 0; i < properties.length; i++) {
			if(item.category === properties[i]) {
				return item.category === properties[i];
			}
		}
	});
};

export const filterByTitle = (data: IEquipment[], filters: ITitleFilter) => {
	return data.filter(item => {
		return item.title.toLowerCase().includes(filters.title.toLowerCase());
	});
};

export const filterByPrice = (data: IEquipment[], filters: IPriceFilter) => {
	return data.filter(item => {
		if(filters.min !== -1 && filters.max === -1) {
			return item.price >= filters.min;
		} else if(filters.min === -1 && filters.max !== -1) {
			return item.price <= filters.max;
		} else if(filters.min !== -1 && filters.max !== -1) {
			return item.price >= filters.min && item.price <= filters.max;
		}
	});
};

export const filterBySize = (data: IEquipment[], filters: ISizeFilter) => {
	return data.filter(item => {
		for(let i = 0; i < item.size.length; i++) {
			for(let j = 0; j < filters.sizes.length; j++) {
				if(item.size[i].toLowerCase() === filters.sizes[j].toLowerCase()) {
					return item.size[i].toLowerCase() === filters.sizes[j].toLowerCase();
				}
			}
		}
	});
};