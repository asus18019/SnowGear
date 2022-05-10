import { IHoursObject } from '../pages/Item';

export function clearIsSelectedProperty(data: IHoursObject[]) {
	return data.map((durationObj: IHoursObject) => {
		if(durationObj.isSelected) {
			durationObj.isSelected = false;
		}

		return durationObj;
	});
}