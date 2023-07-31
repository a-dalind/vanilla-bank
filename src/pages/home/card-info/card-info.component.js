import styles from './card-info.module.scss'
import template from './card-info.template.html'
import ChildComponent from "@/components/Child/child.component";
import RenderService from "@/services/render.service";

export class CardInfo extends ChildComponent {
	render() {
		this.element = RenderService.htmlToElement(template, [], styles)

		return this.element
	}
}
