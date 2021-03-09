import * as faker from 'faker';
import { BasePage } from '../../pageobjects/base.page';

const basePage = new BasePage(),
	email = faker.internet.email(),
	password = faker.internet.password();

describe('Open main page', () => {
	basePage.openRozetkaHomePage({});

	it('Verify Personal Account button is displayed', () => {
		getElement({ element: basePage.loginPage.personalAccountBtn });
		expect(getElement({ element: basePage.loginPage.personalAccountBtn })).toBeDisplayed();
	});
});

describe('Login with invalid credentials', () => {
	basePage.loginPage.loginToPersonalAccount({ email, password });
});

describe('Verify one of the error messages should be displayed', () => {
	it('Verify error message is displayed', () => {
		basePage.loginPage.chooseCorrectErrorMessage({
			userNotExists: basePage.loginPage.errorMessage,
			wrongPassword: basePage.loginPage.incorrectPasswordMessage,
			email,
		});
	});
});
