import {BaseScreen} from "@/components/BaseScreen/base-screen.component";
import RenderService from "@/services/render.service";
import template from "./home.template.html";

export class Home extends BaseScreen {
    constructor() {
        super({title: 'Home'});
    };

    render () {
        const element = RenderService.htmlToElement(template);
        return '<div>Home</div>'
    }
}
