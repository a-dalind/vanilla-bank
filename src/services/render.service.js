import ChildComponent from "@/components/Child/child.component";
import {BaseScreen} from "@/components/BaseScreen/base-screen.component";

class RenderService {
    /**
     * @param {string} html
     * @param {Array} components
     * @param {Object} [styles]
     * @returns {HTMLElement}
     */

    htmlToElement(html, components = [], styles) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();

		const element = template.content.firstChild;
	    // console.log(element);

		//styles

	    this.#replaceComponentTags(element, components);

        return element;
    }

	/**
	 * @param {HTMLElement} parentElement
	 * @param {Array} components
	 */

	#replaceComponentTags(parentElement, components) {
		const componentTagPattern = /^component-/;     // ^ - начало строки
		const allElements = parentElement.getElementsByTagName('*');

		for (const element of allElements) {
			const elementTagName = element.tagName.toLowerCase();

			if (componentTagPattern.test(elementTagName)) {
				const componentName = elementTagName
					.replace(componentTagPattern, '')     // удаляем слово "component"
					.replace(/-/g, '');       // удаляем тире

				const foundComponent = components.find(Component => {
					const instance = Component instanceof ChildComponent ? Component : new Component(); // Heading || new heading('Title') (создаем экземпляр)
					// instanceof проверяет, принадлежит ли объект к определённому классу (присутствует ли объект constructor.prototype);

					return instance.constructor.name.toLowerCase() === componentName; // constructor.name - это Home в export class Home extends BaseScreen {...}
				})

				if (foundComponent) {
					const componentContent =
						foundComponent instanceof ChildComponent
							? foundComponent.render()          // просто рендерим
							: new foundComponent().render();   // создаем экземпляр, а потом рендерим
					element.replaceWith(componentContent);     // заменяем <component-heading></component-heading> на компонент
				} else {
					console.error(    // если забыли прокинуть в компоненты
						`Component "${componentName}" not found in the provided components array.`
					)
				}
			}
		}
	}


}

export default new RenderService();
