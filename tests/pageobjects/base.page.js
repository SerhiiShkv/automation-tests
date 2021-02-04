export default class BasePage {
  openMainPage() {
    browser.url("/");
  }

  mainPageWithCustomWindowSize() {
    browser.url("/");
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
      timeoutMsg: "Element is still not displayed",
    });
  }

  openRozetkaHomePage({ mainPage = true, customSizePage = false }) {
    if (mainPage) {
      it("Go to rozetka url page", () => {
        getElement({
          element: this.openMainPage(),
          needWaitForElement: false,
        });
        expect(browser).toHaveUrl("https://rozetka.com.ua/ua/");
      });
    }
    if (customSizePage) {
      it("Go to rozetka url page with custom window size", () => {
        getElement({
          element: this.mainPageWithCustomWindowSize(),
          needWaitForElement: false,
        });
        expect(browser).toHaveUrl("https://rozetka.com.ua/ua/");
      });
    }
  }
}
