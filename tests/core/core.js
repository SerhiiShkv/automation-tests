export class Core {
	openMainPage() {
		browser.url('/');
	}

	mainPageWithCustomWindowSize() {
		browser.url('/');
		browser.setWindowSize(1300, 850);
	}

	changePositionOfCursor({ element }) {
		element.moveTo();
	}

	waitForLoadingElements({ timeout }) {
		browser.setTimeout({
			implicit: timeout,
		});
	}

	waitUntilElementIsExisting({ element }) {
		browser.waitUntil(() => element.isExisting(), {
			timeout: timeOuts.mini,
			timeoutMsg: 'Element is still not displayed',
		});
	}
}
