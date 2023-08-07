import {NotificationService} from "@/services/notification.service";
import {bankQuery} from "@/libs/bank-query/bank-query.lib";

export class AuthService {
	#BASE_URL = '/auth';

	constructor() {
		this.notificationService = new NotificationService();
	}

	main(type, body) {
		return bankQuery({
			path: `${this.#BASE_URL}/${type}`,
			method: 'POST',
			body,
			onSuccess: data => {
				this.notificationService().show('success', 'You are successfully authorized!')
			},
		})
	}
}
