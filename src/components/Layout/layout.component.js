import RenderService from "@/services/render.service";
import template from "./layout.template.html";
import styles from "./layout.module.scss";
import ChildComponent from "@/components/Child/child.component";
import {$B} from "@/libs/bquery.lib";
import {Header} from "@/components/Header/header.component";
import {Heading} from "@/components/Heading/heading.component";

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

		mainElement
			.before(new Header({
				router: this.router
			})
			.render())
			.append(contentContainer.element);

		return this.element
	}
}
