import {BaseScreen} from "@/components/BaseScreen/base-screen.component";
import renderService from "@/services/render.service";
import template from "@/pages/auth/auth.template.html";
import styles from "@/pages/auth/auth.module.scss";
import {AuthService} from "@/api/auth.service";
import {Button} from "@/components/Button/button.component";
import {$B} from "@/libs/bquery.lib";
import {Input} from "@/components/Input/input.component";
import validationService from "@/services/validation.service";
import formService from "@/services/form.service";

export class Auth extends BaseScreen {
	#isTypeLogin = true;

    constructor() {
        super({ title: 'Auth' });
		this.authService = new AuthService();
    };

	#validateFields(formValues) {
		const emailLabel = $B(this.element).find('label:first-child');
		const passwordLabel = $B(this.element).find('label:last-child');

		if (!formValues.email) validationService.showError(emailLabel);

		if (!formValues.password) validationService.showError(passwordLabel);

		return formValues.email && formValues.password;
	}

	#handleSubmit = event => {
		const formValues = formService.getFormValues(event.target);
		if (!this.#validateFields(formValues)) return;

		const type = this.#isTypeLogin ? 'login' : 'register';
		this.authService.main(type, formValues);
	}

	#changeAuthType = (evt) => {
		evt.preventDefault();

		$B(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Sign in');

		$B(evt.target).text(this.#isTypeLogin ? 'Sign in' : 'Register'); // меняем текст в кнопке
		this.#isTypeLogin = !this.#isTypeLogin;
	}

	render() {
		this.element = renderService.htmlToElement(template, [
			new Button({
				children: 'Submit'
			})
		], styles);

		$B(this.element)
			.find('#auth-inputs')
			.append(
				new Input({
					placeholder: 'Enter email',
					name: 'email',
					type: 'email',
				}).render()
			)
			.append(
				new Input({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password',
					variant: 'accent-secondary'
				}).render()
			);

		$B(this.element).find('#change-auth-type').click(this.#changeAuthType);

		$B(this.element).find('form').submit(this.#handleSubmit);


		return this.element;
	}
}
