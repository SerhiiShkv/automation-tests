import { LoginPage } from '../loginToPersonalAccount/login.page';

export class FacebookLogin extends LoginPage {
	get facebookBtn() {
		return $('.auth-modal__social .auth-modal__social-button_type_facebook');
	}

	get facebookTitle() {
		return $('._50f7');
	}
	get facebookEmailField() {
		return $('#email');
	}
	get facebookPasswordField() {
		return $('#pass');
	}

	get facebookLoginBtn() {
		return $('#loginbutton');
	}

	openFacebookWindow() {
		this.personalAccountBtn.clickElement({});
		this.facebookBtn.clickElement({});
		browser.switchWindow('https://www.facebook.com/');
	}

	fillFacebookEmail(email) {
		this.facebookEmailField.fillElement({ value: email });
	}

	fillFacebookPassword(password) {
		this.facebookPasswordField.fillElement({ value: password });
	}

	submitFacebook() {
		this.facebookLoginBtn.clickElement({});
	}

	closeFacebookWindow() {
		browser.switchWindow('https://rozetka.com.ua/');
	}

	loginViaFacebook({ email, password }) {
		this.openFacebookWindow();
		this.waitElementUntilExist({ element: this.facebookEmailField });
		this.fillFacebookEmail(email);
		this.fillFacebookPassword(password);
		this.submitFacebook();
		this.closeFacebookWindow();
	}
}
