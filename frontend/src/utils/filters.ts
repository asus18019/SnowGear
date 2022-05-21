import { ICategoryFilter, IFilters, ITitleFilter } from '../models/IFilters';
import { IEquipment } from '../models/IEquipment';

export const isCategoryFiltering = (filters: ICategoryFilter): boolean => {
	let filtersP: boolean = false;
	for(const property in filters) {
		// @ts-ignore
		if(filters[property] === true) {
			filtersP = true;
		}
	}

	return filtersP;
};

export const isTitleFiltering = (filters: ITitleFilter): boolean => {
	return filters.title.trim() !== '';
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