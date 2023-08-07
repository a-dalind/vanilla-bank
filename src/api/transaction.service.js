import {bankQuery} from "@/libs/bank-query/bank-query.lib";

export class TransactionService {
	#BASE_URL = '/transactions';

	// /transactions?orderBy=desc

	getAll(onSuccess) {
		return bankQuery({
			path: this.#BASE_URL +
			`?${new URLSearchParams({
				orderBy: 'desc '
			})}`,
			onSuccess
		})
	}
}
