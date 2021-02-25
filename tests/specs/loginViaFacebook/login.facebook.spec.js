import { LoginPage } from '../loginToPersonalAccount/login.page';
import { LogOut } from '../../pageobjects/logout.page';
import { FacebookLogin } from './facebook.page';

const facebookLogin = new FacebookLogin(),
	loginPage = new LoginPage(),
	logOut = new LogOut(),
	userFacebookEmail = 'testMail',
	userFacebookPassword = 'testPassword',
	loggedUserName = 'Олег Мельник',
	personalUserInfoTitle = 'Особисті дані',
	userLastName = 'Мельник',
	userFirstName = 'Олег';

describe('Open the main page', () => {
	loginPage.openRozetkaHomePage({});

	it('Verify Personal Account button is displayed', () => {
		expect(getElement({ element: loginPage.personalAccountBtn })).toBeDisplayed();
	});
});

describe('Login with valid credentials', () => {
	facebookLogin.loginViaFacebook({
		email: userFacebookEmail,
		password: userFacebookPassword,
		loggedUserName,
	});
});

describe('Navigate to personal data', () => {
	it('Click on Logged User name', () => {
		clickElement({ element: loginPage.loggedUserName });
		expect(
			getElement({
				element: loginPage.personalInfoTitle,
			})
		).toHaveText(personalUserInfoTitle);
	});

	it('Wait for loading all elements in personal account', () => {
		loginPage.waitForLoadingElements({ timeout: 200 });
	});

	it('Verify logged User Last Name is displayed', () => {
		expect(
			getElement({
				element: loginPage.personalSectionElements[0],
				needWaitForElement: false,
			})
		).toHaveText(userLastName);
	});

	it('Verify logged User First Name is displayed', () => {
		expect(
			getElement({
				element: loginPage.personalSectionElements[1],
				needWaitForElement: false,
			})
		).toHaveText(userFirstName);
	});
});

describe('Logout form personal account', () => {
	logOut.logOutFromPersonalAccount({ allSteps: false });
});
