module.exports = {
	clickElement: function ({ needWaitForElement = true, needScrollPage = false, timeout = timeouts.small }) {
		if (needWaitForElement) {
			this.waitForDisplayed({ timeout });
		}
		if (needScrollPage) {
			this.scrollIntoView();
		}
		this.click();
	},

	fillElement: function ({ value, needWaitForElement = true, needClearField = true, timeout = timeouts.small }) {
		if (needWaitForElement) {
			this.waitForDisplayed({ timeout });
		}
		if (needClearField) {
			this.clearValue();
		}
		this.setValue(value);
	},

	getElement: function ({ needWaitForElement = true, needScrollPage = false, timeout = timeouts.small }) {
		if (needWaitForElement) {
			this.waitForDisplayed({ timeout });
		}
		if (needScrollPage) {
			this.scrollIntoView();
		}
		return this;
	},
};
