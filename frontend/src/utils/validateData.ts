import { IUser } from '../models/IUser';

export const validateBodyObject = <T>(fields: T) => {
	return Object.keys(fields).reduce((acc, key) => {
		const property = key as keyof typeof acc;
		if(fields[property] !== '' && fields[property] !== null && fields[property] !== undefined && fields[property] !== 0 && fields[property] !== '380') {
			acc[property] = fields[property];
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