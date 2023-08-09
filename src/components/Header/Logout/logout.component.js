import styles from './logout.module.scss'
import template from './logout.template.html'
import {$B} from "@/libs/bquery.lib";
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";
import {Store} from "@/store/store";

export class Logout extends ChildComponent {
	constructor({ router }) {
		super();

		this.store = Store.getInstance();
		this.user = this.store.state.user

		this.router = router;
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$B(this.element)
			.find('button')
			.click(() => {
				this.store.logout();
				this.router.navigate('/auth');
			});

		return this.element;
	}
}
