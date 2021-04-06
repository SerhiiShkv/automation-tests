export class Core {
	openMainPage() {
		browser.url('https://rozetka.com.ua/ua/');
	}

	mainPageWithCustomWindowSize() {
		browser.url('https://rozetka.com.ua/ua/');
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
			timeout: timeouts.mini,
			timeoutMsg: 'Element is still not displayed',
		});
	}
}
