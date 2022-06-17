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
	if(!updatedUser && !userBeforeEdit) return {};
	return {
		id: updatedUser?.id,
		name: userBeforeEdit?.name !== updatedUser.name ? updatedUser.name : undefined,
		surname: userBeforeEdit?.surname !== updatedUser.surname ? updatedUser.surname : undefined,
		email: userBeforeEdit?.email !== updatedUser.email ? updatedUser.email : undefined,
		password: updatedUser.password.length > 0 ? updatedUser.password : undefined,
		age: userBeforeEdit?.age !== updatedUser.age ? Number(updatedUser.age) : undefined,
		phone: userBeforeEdit?.phone !== updatedUser.phone ? updatedUser.phone : undefined,
		address: userBeforeEdit?.address !== updatedUser.address ? updatedUser.address : undefined,
	};
};