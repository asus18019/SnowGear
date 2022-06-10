export const validateBodyObject = (fields: Object) => {
	return Object.keys(fields).reduce((acc, key) => {
		// @ts-ignore
		if(fields[key] !== '' && fields[key] !== null && fields[key] !== undefined && fields[key] !== 0 && fields[key] !== '380') {
			// @ts-ignore
			acc[key] = fields[key];
		}

		return acc;
	}, {});
};

export const validateErrorsObject = (errors: any): string[] => {
	const errorsValidated: string[] = [];
	for(let key in errors) {
		errors[key].forEach((error: string) => {
			errorsValidated.push(error);
		});
	}
	return errorsValidated;
};