import { IHoursObject, ISizeObject } from '../pages/Item';
import { IEquipment } from '../models/IEquipment';

export function clearIsSelectedProperty(data: IHoursObject[]) {
	return data.map((durationObj: IHoursObject) => {
		if(durationObj.isSelected) {
			durationObj.isSelected = false;
		}

		return durationObj;
	});
}

export const sizeParser = (equipment: IEquipment | undefined): ISizeObject[] => {
	if(equipment) {
		return equipment.size.map(size => {
			return { size, isSelected: false };
		});
	}

	return [{ size: 'empty', isSelected: false }];
};