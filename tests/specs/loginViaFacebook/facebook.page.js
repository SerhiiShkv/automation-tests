import { Bag } from '../shoppingBag/bag.page';

class FacebookLogin extends Bag {
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

	loginViaFacebook({ email, password, loggedUserName }) {
		it('Click on Personal Account button', () => {
			clickElement({ element: this.personalAccountBtn });
			expect(getElement({ element: this.titleInPersonalAccount })).toHaveText('Вхід');
		});

		it('Click on Facebook button', () => {
			clickElement({ element: this.facebookBtn });
			browser.switchWindow('Facebook');
			expect(getElement({ element: this.facebookTitle })).toHaveText('ROZETKA');
		});

		it('Fill Facebook email address', () => {
			fillElement({ element: this.facebookEmailField, value: email });
		});

		it('Enter Facebook password', () => {
			fillElement({ element: this.facebookPasswordField, value: password });
		});

		it('Click Login button and Verify that logged User is displayed', () => {
			clickElement({ element: this.facebookLoginBtn });
			browser.switchWindow(
				'Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні'
			);
			expect(getElement({ element: this.submitBtn })).toBeDisplayed();
		});

		it('Verify logged User name', () => {
			this.sideMenuBtn.waitForClickable({ timeout: 6000 });
			clickElement({ element: this.sideMenuBtn });
			expect(getElement({ element: this.loggedUserName })).toHaveText(loggedUserName);
		});
	}
}

export { FacebookLogin };
