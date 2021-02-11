export default class BasePage {
	get headerBtns() {
		return $$('.header-actions__component .header__button');
	}

	openMainPage() {
		browser.url('/');
	}

	mainPageWithCustomWindowSize() {
		browser.url('/');
		browser.setWindowSize(1300, 850);
	}

	get uaLang() {
		return $('[href="/ua/"]');
	}

	changeLanguage() {
		this.openMainPage();
		clickElement({ element: this.uaLang });
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

	openRozetkaHomePage({ mainPage = true, customSizePage = false }) {
		if (mainPage) {
			it('Go to rozetka url page', () => {
				this.openMainPage();
				expect(browser).toHaveUrl('https://rozetka.com.ua/ua/');
			});
		}
		if (customSizePage) {
			it('Go to rozetka url page with custom window size', () => {
				this.mainPageWithCustomWindowSize();
				expect(browser).toHaveUrl('https://rozetka.com.ua/ua/');
			});
		}
	}
}
