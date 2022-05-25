import { Route, ReactLocation, MakeGenerics } from 'react-location';
import React from 'react';
import { IOrder } from '../models/IOrder';
import { getMockOrders } from '../utils/dbMock';

export const accountRoutes: Route[] = [
	{
		path: '/account/profile',
		element: () => import('../components/account/AccountData').then(mod => <mod.default/>),
	},
	{
		path: '/account/currentorders',
		element: () => import('../components/account/CurrentOrders').then(mod => <mod.default/>),
		loader: async () => {
			return { currentOrders: await getMockOrders() };
		}
	},
	{
		path: '/account/expiredorders',
		element: () => import('../components/account/ExpiredOrders').then(mod => <mod.default/>),
	},
];

export type LocationGenerics = MakeGenerics<{
	LoaderData: {
		currentOrders: IOrder[]
	};
}>;

export const location1 = new ReactLocation();