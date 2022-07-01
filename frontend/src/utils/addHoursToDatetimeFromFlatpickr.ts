import moment from 'moment';

export const addHoursToDatetime = (selectedDates: any, dateStr: any, hoursToAdd: number) => {
	if(selectedDates.length > 0) {
		const hours = selectedDates[0].toString().substring(16, 18);
		const minutes = selectedDates[0].toString().substring(19, 21);
		return moment(dateStr).hours(hours).minutes(minutes).add(hoursToAdd, 'h').format();
	}
};