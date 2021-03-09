import { BasePage } from '../../pageobjects/base.page';

const basePage = new BasePage(),
	userFacebookEmail = 'testMail',
	userFacebookPassword = 'testPassword',
	loggedUserName = 'Олег Мельник',
	personalUserInfoTitle = 'Особисті дані',
	userLastName = 'Мельник',
	userFirstName = 'Олег';

describe('Open the main page', () => {
	basePage.openRozetkaHomePage({});

	it('Verify Personal Account button is displayed', () => {
		expect(getElement({ element: basePage.loginPage.personalAccountBtn })).toBeDisplayed();
	});
});

describe('Login with valid credentials', () => {
	basePage.login({ type: 'facebook', email: userFacebookEmail, password: userFacebookPassword, loggedUserName });
});

describe('Navigate to personal data', () => {
	it('Click on Logged User name', () => {
		clickElement({ element: basePage.loginPage.loggedUserName });
		expect(
			getElement({
				element: basePage.loginPage.personalInfoTitle,
			})
		).toHaveText(personalUserInfoTitle);
	});

	it('Wait for loading all elements in personal account', () => {
		basePage.waitForLoadingElements({ timeout: 200 });
	});

	it('Verify logged User Last Name is displayed', () => {
		expect(
			getElement({
				element: basePage.loginPage.personalSectionElements[0],
				needWaitForElement: false,
			})
		).toHaveText(userLastName);
	});

	it('Verify logged User First Name is displayed', () => {
		expect(
			getElement({
				element: basePage.loginPage.personalSectionElements[1],
				needWaitForElement: false,
			})
		).toHaveText(userFirstName);
	});
});

describe('Logout form personal account', () => {
	basePage.logOut.logOutFromPersonalAccount({ allSteps: false });
});
