import Cookies from 'js-cookie';


const API_URL = 'http://127.0.0.1:8000/api';

function ApiError(message: string, data: string, status: number) {
	let response = null;
	
	try {
		response = JSON.parse(data);
	} catch (e: any) {
		response = data;
	}

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

			if(response.status === 401) {
				// Handle unauthorized requests
			}

			// Check for error HTTP error codes
			if(response.status < 200 || response.status >= 300) {
				return response.text();
			}

			return response.json();
		})
		.then(parsedResponse => {
			if(response && response.status < 200 || response && response.status >= 300) {
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