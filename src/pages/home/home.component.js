import {BaseScreen} from "@/components/BaseScreen/base-screen.component";
import RenderService from "@/services/render.service";
import template from "./home.template.html";
import styles from "./home.module.scss";
import {$B} from "@/libs/bquery.lib";

export class Home extends BaseScreen {
    constructor() {
        super({title: 'Home'});
    };

    render() {
        const element = RenderService.htmlToElement(template, [], styles);
		$B(element).find('h1').css('color', 'red');
        return element.outerHTML;
    }
}
