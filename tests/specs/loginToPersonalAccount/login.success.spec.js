import { LoginPage } from './login.page';
import { LogOut } from '../../pageobjects/logout.page';

const loginPage = new LoginPage(),
	logOut = new LogOut(),
	userEmail = 'testMail',
	password = 'testPassword',
	loggedUserName = 'Вілл Сміт',
	personalUserInfo = 'Особисті дані';

describe('Open the main page', () => {
	loginPage.openRozetkaHomePage({ customSizePage: true, mainPage: false });

	it('Verify Personal Account button is displayed', () => {
		expect(getElement({ element: loginPage.personalAccountBtn })).toBeDisplayed();
	});
});

describe('Login with valid credentials', () => {
	loginPage.loginToPersonalAccount({
		email: userEmail,
		password,
		loggedUserName,
	});
});

describe('Go to personal account', () => {
	it('Click on logged User name', () => {
		clickElement({ element: loginPage.loggedUserName });
		expect(
			getElement({
				element: loginPage.personalInfoTitle,
			})
		).toHaveText(personalUserInfo);
	});

	it('Wait for loading all elements in personal account', () => {
		loginPage.waitForLoadingElements({ timeout: 200 });
	});

	it('Verify logged User email is displayed', () => {
		loginPage.waitUntilElementIsExisting({
			element: loginPage.personalSectionElements[7],
		});
		expect(
			getElement({
				element: loginPage.personalSectionElements[7],
				needWaitForElement: false,
			})
		).toHaveText(userEmail);
	});
});

describe('Logout form personal account', () => {
	logOut.logOutFromPersonalAccount({});
});
