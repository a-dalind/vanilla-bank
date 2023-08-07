import styles from './notification.module.scss'
import template from './notification.template.html'
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";

export class Notification extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		return this.element;
	}
}
