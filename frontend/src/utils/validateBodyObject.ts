import { IUser } from '../models/IUser';

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

export const makeFieldsToUpdate = (userBeforeEdit: IUser | undefined, updatedUser: IUser) => {
	if(!updatedUser && !userBeforeEdit) {
		return {};
	}

	return {
		id: updatedUser?.id,
		name: userBeforeEdit?.name === updatedUser.name ? undefined : updatedUser.name,
		surname: userBeforeEdit?.surname === updatedUser.surname ? undefined : updatedUser.surname,
		email: userBeforeEdit?.email === updatedUser.email ? undefined : updatedUser.email,
		password: updatedUser.password.length > 0 ? updatedUser.password : undefined,
		age: userBeforeEdit?.age === updatedUser.age ? undefined : Number(updatedUser.age),
		phone: userBeforeEdit?.phone === updatedUser.phone ? undefined : updatedUser.phone,
		address: userBeforeEdit?.address === updatedUser.address ? undefined : updatedUser.address
	};
};