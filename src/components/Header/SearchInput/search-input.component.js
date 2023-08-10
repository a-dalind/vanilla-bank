import styles from './search-input.module.scss'
import template from './search-input.template.html'
import {$B} from "@/libs/bquery.lib";
import ChildComponent from "@/components/Child/child.component";
import renderService from "@/services/render.service";
import {UserService} from "@/api/user.service";
import {UserItem} from "@/components/UserItem/user-item.component";
import {debounce} from "@/utils/debounce";

export class SearchInput extends ChildComponent {
	constructor() {
		super();

		this.userService = new UserService();
	}
	#handleSearch = async (evt) => {
		const searchTerm = evt.target.value;
		const searchResults = $B(this.element).find('#search-results');

		if (!searchTerm) {
			searchResults.html('');
			return;
		}

		await this.userService.getAll(searchTerm, users => {
			searchResults.html('');

			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					searchResults.html('');
				}).render();

				$B(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`);

				searchResults.append(userItem);

				setTimeout(() => {
					$B(userItem).addClass(styles.visible);
				}, 50)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		const debouncedHandleSearch = debounce(this.#handleSearch, 300);

		$B(this.element)
			.find('input').input({
				placeholder: 'search contacts',
				type: 'search',
				name: 'search-input'
			})
			.on('input', debouncedHandleSearch);

		return this.element
	}
}
