import styles from './logo.module.scss'
import template from './logo.template.html'
import {$B} from "@/libs/bquery.lib";
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";

export class Logo extends ChildComponent {
	constructor() {
		super();
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		return this.element
	}
}
