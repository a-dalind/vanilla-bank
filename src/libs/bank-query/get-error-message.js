export function getErrorMessage(errorData) {
	 return typeof errorData.message === 'object' ? errorData.message[0] : errorData.message;
}
// [{
// 	message: 'error'
// }]
