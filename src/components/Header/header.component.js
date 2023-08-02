import RenderService from "@/services/render.service";
import template from "./header.template.html";
import styles from "./header.module.scss";
import ChildComponent from "@/components/Child/child.component";
import {SearchInput} from "@/components/Header/SearchInput/search-input.component";
import {UserItem} from "@/components/UserItem/user-item.component";
import {Logout} from "@/components/Header/Logout/logout.component";
import {Logo} from "@/components/Header/Logo/logo.component";

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.router = router
	}
	render() {
		this.element = RenderService.htmlToElement(template, [
			Logo,
			new SearchInput(),
			new UserItem({
				avatarPath: 'https://icons.iconarchive.com/icons/iconarchive/incognito-animals/512/Bear-Avatar-icon.png',
				name: 'Name Surname'
			}),
			new Logout({
				router: this.router
			}),
		], styles)

		return this.element
	}
}

