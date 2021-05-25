import { BasePage } from '../../pageobjects/base.page';

const basePage = new BasePage(),
	userFacebookEmail = process.env.FACEBOOK_USER_NAME,
	userFacebookPassword = process.env.FACEBOOK_USER_PASSWORD,
	personalUserInfoTitle = 'Особисті дані',
	userLastName = 'Мельник',
	userFirstName = 'Олег';

describe('Login to Facebook and Navigate to personal data', () => {
	it('Login into Facebook with valid credentials', () => {
		basePage.login({ type: 'facebook', email: userFacebookEmail, password: userFacebookPassword });
	});

	it('Click on Logged User name and Verify logged User Last Name and First Name is displayed', () => {
		basePage.loginPage.sideMenuBtn.waitForClickable({ timeout: timeouts.small });
		basePage.loginPage.sideMenuBtn.clickElement({});
		basePage.loginPage.loggedUserName.waitForClickable({ timeout: timeouts.small });
		basePage.loginPage.loggedUserName.clickElement({});
		expect(basePage.loginPage.personalInfoTitle.getElement({})).toHaveText(personalUserInfoTitle);
		basePage.waitForLoadingElements({ timeout: timeouts.small });
		expect(basePage.loginPage.personalSectionElements[0].getElement({ needWaitForElement: false })).toHaveText(
			userLastName
		);
		expect(basePage.loginPage.personalSectionElements[1].getElement({ needWaitForElement: false })).toHaveText(
			userFirstName
		);
	});
});

describe('Logout form personal account', () => {
	it('Log out from Facebook account', () => {
		basePage.logOut.logOutFromPersonalAccount({ allSteps: false });
	});
});
