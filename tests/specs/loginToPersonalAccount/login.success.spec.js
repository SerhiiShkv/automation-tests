import { BasePage } from '../../pageobjects/base.page';

const basePage = new BasePage(),
	userEmail = 'testMail',
	password = 'testPassword',
	loggedUserName = 'Вілл Сміт',
	personalUserInfo = 'Особисті дані';

describe('Open the main page', () => {
	basePage.openRozetkaHomePage({ customSizePage: true, mainPage: false });

	it('Verify Personal Account button is displayed', () => {
		expect(getElement({ element: basePage.loginPage.personalAccountBtn })).toBeDisplayed();
	});
});

describe('Login with valid credentials', () => {
	basePage.login({ email: userEmail, password, loggedUserName });
});

describe('Go to personal account', () => {
	it('Click on logged User name', () => {
		clickElement({ element: basePage.loginPage.loggedUserName });
		expect(
			getElement({
				element: basePage.loginPage.personalInfoTitle,
			})
		).toHaveText(personalUserInfo);
	});

	it('Wait for loading all elements in personal account', () => {
		basePage.waitForLoadingElements({ timeout: 200 });
	});

	it('Verify logged User email is displayed', () => {
		basePage.waitElementUntilExist({
			element: basePage.loginPage.personalSectionElements[7],
		});
		expect(
			getElement({
				element: basePage.loginPage.personalSectionElements[7],
				needWaitForElement: false,
			})
		).toHaveText(userEmail);
	});
});

describe('Logout form personal account', () => {
	basePage.logOut.logOutFromPersonalAccount({});
});
