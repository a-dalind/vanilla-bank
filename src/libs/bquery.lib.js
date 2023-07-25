class BQuery {/**
 * Create a new BQuery instance.
 * @param {string|HTMLElement} selector - A CSS selector string or a HTMLElement.
 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector);

			if (!this.element) {
				throw new Error(`Element ${selector} not found.`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector;
		} else {
			throw new Error('Invalid selector type.')
		}
	}

	/**
	 * Find the first element that matches a specified selector within a selected element.
	 * @param {string} selector - A CSS selector string to search within the selected element.
	 * @returns {BQuery} A new BQuery instance for a found element.
	 */

	find(selector) {
		const element = new BQuery(this.element.querySelector(selector));

		if (element) {
			return element;
		} else {
			throw new Error(`Element ${selector} not found.`);
		}
	}


	/**
	 * Set CSS style of the selected element.
	 * @param {string} property - A CSS property to set.
	 * @param {string} value - The value to set for the CSS property.
	 * @returns {BQuery} The current BQuery instance for chaining.
	 */

	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') throw new Error('Property and value must be strings.');

		this.element.style[property] = value;
		return this;
	}
}

/**
 * Create a new BQuery instance for a given selector.
 * @param {string|HTMLElement} selector - A CSS selector string or a HTMLElement.
 * @returns {BQuery} A new BQuery instance for the given selector.
 */
export function $B(selector) {
	return new BQuery(selector);
}
