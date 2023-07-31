import RenderService from "@/services/render.service";
import template from "./layout.template.html";
import styles from "./layout.module.scss";
import ChildComponent from "@/components/Child/child.component";
import {Header} from "@/components/Layout/header/header.component";
import {$B} from "@/libs/bquery.lib";

export class Layout extends ChildComponent {
	constructor({ router, children }) {
		super()

		this.router = router
		this.children = children
	}

	render() {
		this.element = RenderService.htmlToElement(template, [], styles);

		const mainElement = $B(this.element).find('main');

		const contentContainer = $B(this.element).find('#content');
		contentContainer.append(this.children);

		mainElement.before(new Header().render()).append(contentContainer.element);

		return this.element
	}
}
