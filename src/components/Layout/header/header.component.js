import RenderService from "@/services/render.service";
import template from "./header.template.html";
import styles from "./header.module.scss";
import ChildComponent from "@/components/Child/child.component";

export class Header extends ChildComponent {
	render() {
		this.element = RenderService.htmlToElement(template, [], styles)

		return this.element
	}
}

