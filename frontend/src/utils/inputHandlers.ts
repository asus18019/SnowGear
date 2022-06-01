export const handleAgeInput = (e: string): number | undefined => {
	const age: number = Number(e.replaceAll('+', '').replaceAll('-', '').replaceAll('e', ''));
	if(age >= 1 && age <= 99) {
		return age;
	} else if(e === '') {
		return undefined;
	} else {
		return Number(age.toString().substring(0, 2));
	}
};