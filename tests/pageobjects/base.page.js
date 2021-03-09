import { Search } from '../specs/search/search.page';
import { Core } from '../core/core';
import { Bag } from '../specs/shoppingBag/bag.page';
import { LoginPage } from '../specs/loginToPersonalAccount/login.page';
import { FacebookLogin } from '../specs/loginViaFacebook/facebook.page';
import { LogOut } from './logout.page';

export class BasePage extends Core {
	constructor() {
		super();
		this.search = new Search();
		this.bag = new Bag();
		this.loginPage = new LoginPage();
		this.facebookLogin = new FacebookLogin();
		this.logOut = new LogOut();
	}

	get headerBtns() {
		return $$('.header-actions__component .header__button');
	}

	get uaLang() {
		return $('[href="/ua/"]');
	}

	login({ type, email, password, loggedUserName }) {
		if (type === 'facebook') {
			this.facebookLogin.loginViaFacebook({ email, password, loggedUserName });
		} else {
			this.loginPage.loginToPersonalAccount({ email, password, loggedUserName });
		}
	}

	changeLanguage() {
		this.openMainPage();
		clickElement({ element: this.uaLang });
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
