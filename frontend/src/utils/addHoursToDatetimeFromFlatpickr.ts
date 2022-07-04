import moment from 'moment';

export const addHoursToDatetime = (selectedDates: any, dateStr: any, hoursToAdd: number): string | null => {
	if(selectedDates.length > 0) {
		const { hours, minutes } = extractDataTime(selectedDates[0]);
		return moment(dateStr).hours(hours).minutes(minutes).add(hoursToAdd, 'h').format();
	}

	return null;
};

interface ExtractedDataTime {
	hours: number,
	minutes: number
}

export const extractDataTime = (dateTime: string): ExtractedDataTime => {
	const hours = dateTime.toString().substring(16, 18);
	const minutes = dateTime.toString().substring(19, 21);
	return { hours: Number(hours), minutes: Number(minutes) };
};
