import {formatCardNumberWithDashes} from "@/utils/format-number-with-dashes";

class BQuery {
	/**
	 * Create a new BQuery instance.
	 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector);

			if (!this.element) {
				throw new Error(`Element ${selector} not found!`);
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector;
		} else {
			throw new Error('Invalid selector type');
		}
	}

	/**
	 * Find the first element that matches the specified selector within the selected element.
	 * @param {string} selector - A CSS selector string to search for within the selected element.
	 * @returns {BQuery} A new BQuery instance for the found element.
	 */
	find(selector) {
		const element = new BQuery(this.element.querySelector(selector));

		if (element) {
			return element;
		} else {
			throw new Error(`Element ${selector} not found!`);
		}
	}

	/**
	 * Append a new element as a child of the selected element.
	 * @param {HTMLElement} childElement - The new child element to append.
	 * @returns {BQuery} The current BQuery instance for chaining.
	 */
	append(childElement) {
		this.element.appendChild(childElement);
		return this;        // возвращаем this, чтобы можно было продолжить строчку
	}

	/**
	 * Insert a new element before the selected element.
	 * @param {HTMLElement} newElement - The new element to insert before the selected element.
	 * @returns {BQuery} The current BQuery instance for chaining.
	 */
	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error('Element must be an HTMLElement');
		}

		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element);
			return this;
		} else {
			throw new Error('Element does not have a parent element');
		}
	}

	/**
	 * Get or set the inner HTML of the selected element.
	 * @param {string} [htmlContent] - Optional HTML content to set. If not provided, the current inner HTML will be returned.
	 * @returns {BQuery|string} The current BQuery instance for chaining when setting HTML content, or the current inner HTML when getting.
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {  // если ничего не прокинули
			return this.element.innerHTML;
		} else {
			this.element.innerHTML = htmlContent;
			return this;
		}
	}


	/**
	 * Set an event listener for the submit event of a form element.
	 * @param {function(Event): void} onSubmit - The event listener for the form's submit event.
	 * @returns {BQuery} The current RQuery instance for chaining.
	 */
	submit(onSubmit) {
		if (this.element.tagName.toLowerCase() === 'form') {
			this.element.addEventListener('submit', e => {
				e.preventDefault();
				onSubmit(e);
			})
		} else {
			throw new Error('Element must be a form');
		}

		return this;
	}


	/**
	 * Attach a click event listener to the selected element.
	 * @param {function(Event): void} callback - The event listener function to execute when the selected element is clicked. The function will receive the event object as its argument.
	 * @returns BQuery{RQuery} The current RQuery instance for chaining.
	 */

	click(callback) {
		this.element.addEventListener('click', callback);
		return this;
	}


	/**
	 * Get or set the text content of the selected element.
	 * @param {string} [textContent] - Optional text content to set. If not provided, the current text content will be returned.
	 * @returns {BQuery|string} The current RQuery instance for chaining when setting text content, or the current text content when getting.
	 */
	text(textContent) {
		if (typeof textContent === 'undefined') {
			return this.element.textContent;
		} else {
			this.element.textContent = textContent;
			return this;
		}
	}

	/**
	 * Set attributes and event listeners for an input element.
	 * @param {object} options - An object containing input options.
	 * @param {function(Event): void} [options.onInput] - The event listener for the input's input event.
	 * @param {object} [options.rest] - Optional attributes to set on the input element.
	 * @returns {BQuery} The current RQuery instance for chaining.
	 */

	input({onInput, ...rest}) {
		if (this.element.tagName.toLowerCase() !== 'input') throw new Error('Element must be an input!');

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value);
		}

		if (onInput) this.element.addEventListener('input', onInput);

		return this;
	}


	/**
	 * Set attributes and event listeners for a number input element.
	 * @param {number} [limit] - The maximum length of input value.
	 * @returns {BQuery} The current RQuery instance for chaining.
	 */

	numberInput(limit) {
		if (this.element.tagName.toLowerCase() !== 'input' || this.element.type !== 'number') throw new Error('Element must be an input with type "number"!');

		this.element.addEventListener('input', (event) => {
			let value = event.target.value.replace(/[^0-9]/g, '');
			if (limit) value = value.substring(0, limit);
			event.target.value = value;
		});


		return this;
	}

	/**
	 * Set attributes and event listeners for a credit card input element.
	 * @returns {BQuery} The current RQuery instance for chaining.
	 */
	creditCardInput() {
		const limit = 16;

		if (this.element.tagName.toLowerCase() !== 'input' || this.element.type !== 'text') throw new Error('Element must be an input with type "text"!');

		this.element.addEventListener('input', (event) => {
			let value = event.target.value.replace(/[^0-9]/g, '');
			if (limit) value = value.substring(0, limit);
			event.target.value = formatCardNumberWithDashes(value);
		});


		return this;
	}



	/**
	 * Set the CSS style of the selected element.
	 * @param {string} property - The CSS property to set.
	 * @param {string} value - The value to set for the CSS property.
	 * @returns {BQuery} The current BQuery instance for chaining.
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('property and value must be strings');
		}

		this.element.style[property] = value;
		return this;
	}


	/**
	 * Adds a class or a list of classes to the current element.
	 * @param {string | string[]} classNames - A single class name or an array of class names to add to the element.
	 * @returns {BQuery} The current RQuery instance for chaining.
	 */

	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className);
			}
		} else {
			this.element.classList.add(classNames);
		}

		return this;
	}

	/**
	 * Removes a class or a list of classes from the current element.
	 * @param {string | string[]} classNames - A single class name or an array of class names to remove from the element.
	 * @returns {BQuery} The current RQuery instance for chaining.
	 */

	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className);
			}
		} else {
			this.element.classList.remove(classNames);
		}

		return this;
	}


	/**
	 * Set or get the value of an attribute on the selected element.
	 * @param {string} attributeName - The name of the attribute to set or get.
	 * @param {string} [value] - The value to set for the attribute. If not provided, the current value of the attribute will be returned.
	 * @returns {BQuery|string} The current RQuery instance for chaining (if setting) or the attribute value (if getting).
	 */
	attr(attributeName, value) {
		if (typeof attributeName !== 'string') {
			throw new Error('Attribute name must be a string')
		}

		if (typeof value === 'undefined') {
			return this.element.getAttribute(attributeName)
		} else {
			this.element.setAttribute(attributeName, value)
			return this
		}
	}
}

/**
 * Create a new BQuery instance for the given selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
 * @returns {BQuery} A new BQuery instance for the given selector.
 */
export function $B(selector) {
	return new BQuery(selector);
}
