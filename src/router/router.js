import { ROUTES } from '@/router/routes.data'
import { NotFound } from '@/pages/not-found/not-found.component'
import {Layout} from "@/components/Layout/layout.component";

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
		const component = new this.#currentRoute.component;

        if (!this.#layout) {
            this.#layout = new Layout({
                router: this,
                children: component.render()
            })
            document.getElementById('app').innerHTML = this.#layout.render();
        } else {
            document.querySelector('main').innerHTML = component.render();
        }
	}
}
