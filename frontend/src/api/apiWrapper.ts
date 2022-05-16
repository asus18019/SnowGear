import Cookies from 'js-cookie';
import { setupStore } from '../store/store';

const API_URL = 'http://127.0.0.1:8000/api';

function ApiError(message: string, data: string, status: number) {
	let response = null;
	
	try {
		response = JSON.parse(data);
	} catch (e: any) {
		response = data;
	}

	// return `${ message }\nResponse:\n${ isObject ? JSON.stringify(response, null, 2) : response}`;
	return response;
}

export const fetchResource = (path: string, userOptions: RequestInit = {}, credentials: boolean) => {
	const defaultOptions = {
		method: 'GET',
	};

	let defaultHeaders: HeadersInit = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	};

	if(credentials) {
		const token: string | undefined = Cookies.get('token');
		if(token) {
			defaultHeaders = {
				...defaultHeaders,
				'Authorization': 'Bearer ' + token
			};
		} else {
			throw ApiError('Unauthorized', 'Unauthorized', 401);
		}
	}

	const options: RequestInit = {
		...defaultOptions,
		...userOptions,
		headers: {
			...defaultHeaders,
			...userOptions.headers,
		},
	};

	const url: string = `${ API_URL }/${ path }`;

	const isFile: boolean = options.body instanceof File;

	if(options.body && typeof options.body === 'object' && !isFile) {
		options.body = JSON.stringify(options.body);
	}

	let response: Response | null = null;

	return fetch(url, options)
		.then(responseObject => {
			response = responseObject;

			// HTTP unauthorized
			if(response.status === 401) {
				// Handle unauthorized requests
				// Maybe redirect to login page?
			}

			// Check for error HTTP error codes
			if(response.status < 200 || response.status >= 300) {
				// Get response as text
				return response.text();
			}

			// Get response as json
			return response.json();
		})
		// "parsedResponse" will be either text or javascript object depending if
		// "response.text()" or "response.json()" got called in the upper scope
		.then(parsedResponse => {
			// Check for HTTP error codes
			if(response && response.status < 200 || response && response.status >= 300) {
				// Throw error
				throw parsedResponse;
			}

			return parsedResponse;
		})
		.catch(error => {
			if(response) {
				throw ApiError(`Request failed with status ${ response.status }.`, error.toString(), response.status);
			} else {
				throw ApiError(error.toString(), 'REQUEST_FAILED', 400);
			}
		});
};

export default fetchResource;