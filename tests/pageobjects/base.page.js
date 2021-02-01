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
}
