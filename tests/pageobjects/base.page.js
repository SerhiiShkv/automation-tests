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
			this.facebookLogin.loginViaFacebook({ email, password });
		} else {
			this.loginPage.loginToPersonalAccount({ email, password, loggedUserName });
		}
	}

	changeLanguage() {
		this.openMainPage();
		clickElement({ element: this.loginPage.sideMenuBtn });
		clickElement({ element: this.uaLang, needWaitForElement: false });
	}

	openRozetkaHomePage({ mainPage = true, customSizePage = false }) {
		if (mainPage) {
			this.openMainPage();
		}
		if (customSizePage) {
			this.mainPageWithCustomWindowSize();
		}
	}
}
