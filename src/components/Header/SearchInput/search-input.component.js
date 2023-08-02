import styles from './search-input.module.scss'
import template from './search-input.template.html'
import {$B} from "@/libs/bquery.lib";
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";

export class SearchInput extends ChildComponent {
	constructor() {
		super();
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$B(this.element).find('input').input({
			placeholder: 'search contacts',
			type: 'search',
			name: 'search-input'
		})

		return this.element
	}
}
