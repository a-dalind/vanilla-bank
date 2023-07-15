import { ROUTES } from '@/router/routes.data'
import { NotFound } from '@/pages/not-found/not-found.component'

export class Router {
	#routes
	#currentRoute
	constructor() {
		this.#routes = ROUTES;
		this.#currentRoute = null;
		this.#handleRouteChange();
	}

	getCurrentPath () { // доступен из вне
		return window.location.pathname;
	}

	#handleRouteChange () { // приватный метод, доступен только в этом классе
		const path = this.getCurrentPath() || '/';
		let route = this.#routes.find(route => route.path === path);

		if (!route) {
			route = {
				component: NotFound
			}
		}
		this.#currentRoute = route;
		this.render();
	}

	render() {
		const component = new this.#currentRoute.component;
		document.getElementById('app').innerHTML = component.render();
	}
}
