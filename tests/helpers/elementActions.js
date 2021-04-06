// TODO delete after refactor

class ElementActions {
	elementActions() {
		//(function () {
		global.clickElement = ({
			element,
			needWaitForElement = true,
			needScrollPage = false,
			timeOut = timeouts.mini,
		}) => {
			if (needWaitForElement) {
				element.waitForDisplayed({ timeOut });
			}
			if (needScrollPage) {
				element.scrollIntoView();
			}
			element.click();
		};

		global.fillElement = ({
			element,
			value,
			needWaitForElement = true,
			needClearField = false,
			timeOut = timeouts.small,
		}) => {
			if (needWaitForElement) {
				element.waitForDisplayed({ timeOut });
			}
			if (needClearField) {
				element.clearValue();
			}
			element.setValue(value);
		};

		global.getElement = ({
			element,
			needWaitForElement = true,
			needScrollPage = false,
			timeOut = timeouts.small,
		}) => {
			if (needWaitForElement) {
				element.waitForDisplayed({ timeOut });
			}
			if (needScrollPage) {
				element.scrollIntoView();
			}
			return element;
		};
		//})();
	}
}

export { ElementActions };
