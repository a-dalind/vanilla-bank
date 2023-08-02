import {BaseScreen} from "@/components/BaseScreen/base-screen.component";
import RenderService from "@/services/render.service";
import template from "./home.template.html";
import styles from "./home.module.scss";
import {$B} from "@/libs/bquery.lib";
import {Button} from "@/components/Button/button.component";
import {Input} from "@/components/Input/input.component";

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = RenderService.htmlToElement(template, [
			new Button({
				children: 'Send',
				onClick: () => alert('123123'),
				variant: 'red'
			}),
			new Input({
				placeholder: 'placeholder',
				value: '',
				name: 'test-input',
				variant: 'red'
			})
		], styles)

		$B(element).find('h1').css('color', 'green')

		return element;
	}
}
