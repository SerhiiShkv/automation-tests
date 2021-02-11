import BasePage from '../../pageobjects/base.page';

class LoginPage extends BasePage {
	get personalAccountBtn() {
		return $('.header-actions__item--user .header__button');
	}
	get inputEmailField() {
		return $('#auth_email');
	}
	get inputPasswordField() {
		return $('#auth_pass');
	}
	get submitBtn() {
		return $('.button--green.auth-modal__submit');
	}
	get incorrectPasswordMessage() {
		return $('.form__hint_type_warning');
	}
	get titleInPersonalAccount() {
		return $('h3.modal__heading');
	}
	get errorMessage() {
		return $('.error-message');
	}
	get loggedUserName() {
		return $('.side-menu__user .side-menu__user-name');
	}
	get sideMenuBtn() {
		return $('.header-menu .header__button');
	}

	get sideMenuOptions() {
		return $$('.side-menu__list .side-menu__item');
	}
	get sideMenuUserName() {
		return $('.side-menu__auth .side-menu__user-name');
	}
	get sideMenuLoggedUserName() {
		return $('.side-menu__auth .side-menu__user');
	}

	get wishListIcon() {
		return $('.header-actions__item--wishlist .header__button');
	}

	get headerDropDownOptions() {
		return $$('.header-dropdown__list-item .header-dropdown__list-link');
	}

	get sidebarUserDetails() {
		return $('.cabinet-user .cabinet-navigation__link');
	}

	get personalSectionElements() {
		return $$('.personal-data__item .personal-data__value')[7];
	}

	get personalInfoTitle() {
		return $('.cabinet-content .cabinet__heading');
	}

	loginToPersonalAccount({ email, password, loggedUserName }) {
		it('Click on Personal Account button', () => {
			clickElement({ element: this.personalAccountBtn });
			expect(getElement({ element: this.titleInPersonalAccount })).toHaveText('Вхід');
		});

		it('Fill email address', () => {
			fillElement({ element: this.inputEmailField, value: email });
		});

		it('Enter password', () => {
			fillElement({ element: this.inputPasswordField, value: password });
		});

		it('Click submit button and Verify that logged User is displayed', () => {
			clickElement({ element: this.submitBtn });
		});

		it('Verify if User is logged in', () => {
			clickElement({ element: this.sideMenuBtn });
			expect(getElement({ element: this.loggedUserName })).toHaveText(loggedUserName);
		});
	}

	chooseCorrectErrorMessage({ userNotExists, wrongPassword, email }) {
		browser.waitUntil(() => userNotExists.isExisting() || wrongPassword.isExisting(), {
			timeout: 6000,
			timeoutMsg: 'Expected error message to be displayed',
		});

		if (userNotExists.isDisplayed()) {
			expect(userNotExists).toHaveText(`Користувач з логіном ${email} не зареєстрований`);
		} else if (wrongPassword.isDisplayed()) {
			expect(wrongPassword).toHaveText(
				'Введено невірний пароль!' +
					'\n' +
					'Перевірте розкладку клавіатури і Caps Lock' +
					'\n' +
					'Надішліть мені тимчасовий пароль на вказану адресу електронної пошти'
			);
		} else {
			setTimeout(() => {
				this.chooseCorrectErrorMessage({ userNotExists, wrongPassword, email });
			}, 400);
		}
	}
}

export { LoginPage };
