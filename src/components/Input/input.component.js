import styles from './input.module.scss';
import template from './input.template.html';
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";
import {$B} from "@/libs/bquery.lib";

export class Input extends ChildComponent {
	constructor({placeholder, type = 'text', value = '', name,  variant }) {
		super();

		if (!name) throw new Error('Fill field "name"!');

		this.placeholder = placeholder;
		this.type = type;
		this.value = value;
		this.name = name;
		this.variant = variant;
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		const inputElement = $B(this.element).find('input').input({
			placeholder: this.placeholder,
			type: this.type,
			value: this.value,
			name: this.name,
		});

		if (this.type === 'number') inputElement.numberInput();

		const isCreditCard = this.variant === 'credit-card';
		if (isCreditCard) inputElement.creditCardInput();

		if (this.variant) $B(this.element).addClass(styles[this.variant]);

		return this.element
	}
}
