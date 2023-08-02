import styles from './user-item.module.scss'
import template from './user-item.template.html'
import {$B} from "@/libs/bquery.lib";
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";

export class UserItem extends ChildComponent {
	constructor(user, isGold = false, onClick) {
		super();

		if (!user) throw new Error('User is empty!');
		if (!user?.name) throw new Error('User must have "name"!');
		if (!user?.avatarPath) throw new Error('User must have "avatarPath"!');

		this.user = user;
		this.isGold = isGold;
		this.onClick = onClick;
	}

	#preventDefault(evt) {
		evt.preventDefault();
	}

	update({name, avatarPath}) {
		if (name && avatarPath) {
			$B(this.element).find('img').attr('src', avatarPath).attr('alt', name);
			$B(this.element).find('span').text(name);
		}
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		this.update(this.user);

		$B(this.element).click(this.onClick || this.#preventDefault.bind(this));

		if (!this.onClick) $B(this.element).attr('disabled', '');
		if (this.isGold) $B(this.element).addClass(styles.gold);

		return this.element
	}
}
