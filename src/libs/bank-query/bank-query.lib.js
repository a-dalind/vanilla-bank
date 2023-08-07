import {getErrorMessage} from "@/libs/bank-query/get-error-message";
import {StorageService} from "@/services/storage.service";
import {ACCESS_TOKEN_KEY} from "@/constants/auth.constants";
import {SERVER_URL} from "@/config/url.config";
import {NotificationService} from "@/services/notification.service";

/**
 * BankQuery is a minimalistic library for handling API requests.
 * Fetch data from the API with provided options.
 *
 * @param {Object} options - Configuration options for the API request.
 * @param {string} options.path - The API endpoint path.
 * @param {('GET'|'POST'|'PATCH'|'DELETE'|'PUT')} [options.method='GET'] - The HTTP method to use for the request.
 * @param {Object} [options.body=null] - The request payload to send as JSON.
 * @param {Object} [options.headers={}] - Additional headers to include with the request.
 * @param {Function} [options.onSuccess=null] - Callback function to be called on successful response.
 * @param {Function} [options.onError=null] - Callback function to be called on error response.
 * @returns {Promise<{isLoading: boolean, error: string|null, data: any|null}>} - An object containing the loading state, error, and data from the response.
 */
export async function bankQuery({
   path,
   body = null,
   headers = {},
   method = 'GET',
   onSuccess = null,
   onError = null
}) {
	let isLoading = true;
	let error = null;
	let data = null;
	const url = `${SERVER_URL}/api${path}`;

	const accessToken = new StorageService().getItem(ACCESS_TOKEN_KEY);

	const requestOptions = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	}

	if (accessToken) requestOptions.headers.Authorization = `Bearer ${accessToken}`;  // привязываем токен к запросу, чтобы что-то получить с бэк

	if (body) requestOptions.body = JSON.stringify(body);  // если есть тело запроса, передаем тело запроса в формате строки

	try {
		const response = await fetch(url, requestOptions);

		if (response.ok) {
			const data = await response.json();  // преобразовываем в json формат

			if (onSuccess) onSuccess(data);
		} else {
			const errorData = await response.json();
			const errorMessage = getErrorMessage(errorData);
			if (onError) onError(errorMessage);

			new NotificationService().show('error', errorMessage);
		}
	} catch (errorData) {
		const errorMessage = getErrorMessage(errorData);
		if (onError) onError(errorMessage);
		new NotificationService().show('error', errorMessage);
	} finally {
		isLoading = false;
	}

	return {isLoading, error, data}
}
