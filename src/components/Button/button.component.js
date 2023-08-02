import styles from './button.module.scss'
import template from './button.template.html'
import {$B} from "@/libs/bquery.lib";
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";

export class Button extends ChildComponent {
	constructor({children, onClick, variant}) {
		super();

		if (!children) throw new Error('Children is empty!');

		this.children = children;
		this.onClick = onClick;
		this.variant = variant;
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$B(this.element).html(this.children).click(this.onClick);

		if (this.variant) $B(this.element).addClass(styles[this.variant]);

		return this.element
	}
}
