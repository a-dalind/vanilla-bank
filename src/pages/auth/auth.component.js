import {BaseScreen} from "@/components/BaseScreen/base-screen.component";
import RenderService from "@/services/render.service";
import template from "@/pages/auth/auth.template.html";
import styles from "@/pages/home/home.module.scss";
import {Heading} from "@/components/Heading/heading.component";

export class Auth extends BaseScreen {
    constructor() {
        super({ title: 'Auth' });
    };
	render() {
		this.element = RenderService.htmlToElement(template, [
			new Heading()
		], styles);

		return this.element;
	}
}
