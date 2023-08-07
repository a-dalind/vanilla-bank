import {bankQuery} from "@/libs/bank-query/bank-query.lib";

export class UserService {
	#BASE_URL = '/users';

	// /transactions?orderBy=desc

	getAll(searchTerm, onSuccess) {
		return bankQuery({
			path: `${this.#BASE_URL}
			${searchTerm 
				? `?${new URLSearchParams({
						orderBy: 'desc '
					})}`
				: ''
			 }`,
			onSuccess
		})
	}
}
