/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    // open (path) {
    //     return browser.url(`https://the-internet.herokuapp.com/${path}`)
    // }

    open () {
        return browser.url(`https://rozetka.com.ua/ua/`)
    }

    get uaLang () {
        return $('[href="/ua/"]')
    }

    chooseUaLang() {
        this.open();
        this.uaLang.click();
    }
}
