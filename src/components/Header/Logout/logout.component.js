import styles from './logout.module.scss'
import template from './logout.template.html'
import {$B} from "@/libs/bquery.lib";
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";

export class Logout extends ChildComponent {
	constructor({ router }) {
		super();

		this.router = router;
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$B(this.element)
			.find('button')
			.click(() => {this.router.navigate('/auth')});

		return this.element;
	}
}
