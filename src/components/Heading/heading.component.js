import styles from './heading.module.scss'
import template from './heading.template.html'
import {$B} from "@/libs/bquery.lib";
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";

export class Heading extends ChildComponent {
	constructor( title = '' ) {
		super();
		this.title = title;
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$B(this.element).text(this.title);

		return this.element
	}
}
