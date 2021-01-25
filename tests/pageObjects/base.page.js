export default class BasePage {
  openMainPage() {
    browser.url("/");
  }

  get uaLang() {
    return $('[href="/ua/"]');
  }

  changeLanguage() {
    this.openMainPage();
    clickElement({ element: this.uaLang });
  }
}
