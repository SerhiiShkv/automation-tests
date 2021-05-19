import { WishList } from './wishList.page';

const wishList = new WishList(),
	userEmail = process.env.FACEBOOK_USER_NAME,
	password = process.env.FACEBOOK_USER_PASSWORD,
	loggedUserName = 'Олег Мельник',
	wishesTitle = 'Список бажань',
	enterTitle = 'Вхід',
	sonyProduct = 'Sony',
	rowentaProduct = 'Rowenta',
	xiaomiProduct = 'Xiaomi';

describe('Open the main page', () => {
	it('Go to rozetka url page', () => {
		wishList.openRozetkaHomePage({});
		expect(browser).toHaveUrl('https://rozetka.com.ua/ua/');
	});

	it('Login with valid credentials', () => {
		wishList.login({
			type: 'facebook',
			email: userEmail,
			password,
		});
	});
});

describe('Go to the Wish List and Verify it`s empty then Add 3 different products and Verify that products are added to the Wish List', () => {
	it('Verify logged User name', () => {
		wishList.loginPage.sideMenuBtn.waitForClickable({ timeout: timeouts.small });
		wishList.loginPage.sideMenuBtn.clickElement({});
		expect(wishList.loginPage.loggedUserName.getElement({})).toHaveText(loggedUserName);
	});

	it('Click on List of Wishes option and check if it`s empty', () => {
		wishList.waitForLoadingElements({ timeout: timeouts.large });
		wishList.goToWishList();
		wishList.changePositionOfCursor({ element: wishList.search.findBtn });
		expect(wishList.listOfWishesTitle.getElement({})).toBeDisplayed();
		expect(wishList.emptyListOfWishesTittle.getElement({})).toBeDisplayed();
		wishList.goToMainPageBtn[1].clickElement({ needWaitForElement: false });
	});

	it('Search for 3 different products and add then to the wish list', () => {
		for (const product of [sonyProduct, rowentaProduct, xiaomiProduct]) {
			wishList.addToWishList(product);
		}
		expect(getElement({ element: wishList.wishListAddedItem })).toHaveText('3');
	});

	it('Click on wish list button and verify that 3 products are displayed', () => {
		clickElement({ element: wishList.headerBtns[1] });
		expect(getElement({ element: wishList.listOfWishesTitle })).toHaveText(wishesTitle);
		const numberOfProduct = wishList.checkExactNumbersOfProduct({ number: 3 });
		expect(numberOfProduct).toEqual(3);
	});

	it('Remove product from Wish List', () => {
		wishList.removeProductsFromWishList();
	});
});

describe('Log out from personal account', () => {
	it('Log out from Facebook account', () => {
		wishList.logOut.logOutFromPersonalAccount({ allSteps: true });

		const isPersonalAccEnterTitle = wishList.loginPage.titleInPersonalAccount;
		if (!isPersonalAccEnterTitle.isDisplayed()) {
			wishList.loginPage.personalAccountBtn.clickElement({}); //check if clickElement works in async mode without 'if()'
		}
		expect(isPersonalAccEnterTitle).toHaveText(enterTitle);
	});
});
