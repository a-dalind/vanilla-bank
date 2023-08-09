import {NotificationService} from "@/services/notification.service";
import {bankQuery} from "@/libs/bank-query/bank-query.lib";
import {Store} from "@/store/store";

export class AuthService {
	#BASE_URL = '/auth';

	constructor() {
		this.store = Store.getInstance();
		this.notificationService = new NotificationService();
	}

	main(type, body) {
		return bankQuery({
			path: `${this.#BASE_URL}/${type}`,
			method: 'POST',
			body,
			onSuccess: data => {
				this.store.login(data.user, data.accessToken);
				this.notificationService().show('success', 'You are successfully authorized!')
			},
		})
	}
}
