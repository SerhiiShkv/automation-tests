import { WishList } from './wishList.page';

const wishList = new WishList(),
	userEmail = 'test@test',
	password = 'testPass',
	loggedUserName = 'Олег Мельник',
	wishesTitle = 'Список бажань',
	fillListProductsTitle = 'Наповніть його товарами',
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

describe('Go to wish list', () => {
	it('Verify logged User name', () => {
		wishList.loginPage.sideMenuBtn.waitForClickable({ timeout: timeouts.small });
		wishList.loginPage.sideMenuBtn.clickElement({});
		expect(wishList.loginPage.loggedUserName.getElement({})).toHaveText(loggedUserName);
	});

	it('Click on List of Wishes option', () => {
		wishList.waitForLoadingElements({ timeout: timeouts.large });
		wishList.goToWishList();
		expect(wishList.listOfWishesTitle.getElement({})).toBeDisplayed();
	});

	it('Check wish list for added products', () => {
		wishList.checkIfWishListEmpty();
	});
});

describe('Verify wish list or delete recently added products if they added', () => {
	// it('Check wish list for added products', () => {
	// 	wishList.checkIfWishListEmpty();
	// 	browser.pause(50000);
	// });

	it('Search for 3 different products and add then to the wish list', () => {
		for (const product of [sonyProduct, rowentaProduct, xiaomiProduct]) {
			wishList.addToWishList(product);
		}
		expect(getElement({ element: wishList.wishListAddedItem })).toHaveText('3');
	});
});

describe('Search for 3 different products and add then to the wish list', () => {
	// wishList.search.searchProductsThenAddOrClick({
	// 	products: [sonyProduct, rowentaProduct, xiaomiProduct],
	// 	addingWishList: true,
	// });
	// describe('Verify that 3 recently added products are displayed near wish button', () => {
	// 	it('Verify wish button', () => {
	//
	// 	});
	// });
});

/*
describe('Navigate to wish list and verify that 3 products are added', () => {
	it('Click on wish list button', () => {
		clickElement({ element: wishList.headerBtns[1] });
		expect(getElement({ element: wishList.listOfWishesTitle })).toHaveText(wishesTitle);
	});

	wishList.checkExactNumbersOfProduct({ number: 3 });

	it('Click on select all products in wish list', () => {
		clickElement({ element: wishList.checkAllInWishListBtn });
		expect(getElement({ element: wishList.wishListDeleteBtn })).toBeDisplayed();
	});

	it('Click delete button', () => {
		clickElement({ element: wishList.wishListDeleteBtn });
		expect(getElement({ element: wishList.emptyListOfWishesTittle })).toBeDisplayed();
	});
});

describe('Log out from personal account', () => {
	wishList.logOut.logOutFromPersonalAccount({ allSteps: true });
});

 */
