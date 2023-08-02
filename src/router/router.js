import { ROUTES } from '@/router/routes.data'
import { NotFound } from '@/pages/not-found/not-found.component'
import {Layout} from "@/components/Layout/layout.component";
import {$B} from "@/libs/bquery.lib";

export class Router {
	#routes = ROUTES;
	#currentRoute = null;
	#layout = null;
	constructor() {
        window.addEventListener('popstate', () => {
            this.#handleRouteChange();
        })

		this.#handleRouteChange();
		this.#handleLinks();
	}

	getCurrentPath() { // доступен из вне
		return window.location.pathname;
	}

    navigate(path) {
        if(path !== this.getCurrentPath()) {
            window.history.pushState({}, '', path);
            this.#handleRouteChange();
        }
    }

    #handleLinks() {
        document.addEventListener('click', event => {
            const target = event.target.closest('a');

            if (target) {
                event.preventDefault();
                this.navigate(target.href);
            }
        })
    }

	#handleRouteChange() { // приватный метод, доступен только в этом классе
		const path = this.getCurrentPath() || '/';
		let route = this.#routes.find(route => route.path === path);

		if (!route) {
			route = {
				component: NotFound
			}
		}
		this.#currentRoute = route;
		this.#render();
	}

	#render() {
		const component = new this.#currentRoute.component().render()

		if (!this.#layout) {
			this.#layout = new Layout({
				router: this,
				children: component
			}).render()

			$B('#app').append(this.#layout);
		} else {
			$B('#content').html('').append(component);
		}
	}
}
