import { WishList } from './wishList.page';
import { LoginPage } from '../loginToPersonalAccount/login.page';

const wishList = new WishList(),
	loginPage = new LoginPage(),
	userEmail = 'test@mail.com',
	password = 'testPassword',
	loggedUserName = 'Вілл Сміт',
	wishesTitle = 'Список бажань',
	fillListProductsTitle = 'Наповніть його товарами',
	sonyProduct = 'Sony',
	rowentaProduct = 'Rowenta',
	xiaomiProduct = 'Xiaomi';

describe('Open the main page', () => {
	wishList.openRozetkaHomePage({});
});

describe('Login with valid credentials', () => {
	loginPage.loginToPersonalAccount({
		email: userEmail,
		password,
		loggedUserName,
	});
});

describe('Go to wish list', () => {
	it('Click on List of Wishes option', () => {
		clickElement({ element: wishList.sideMenuOptions[7] });
		expect(getElement({ element: wishList.listOfWishesTitle })).toBeDisplayed();
	});
});

describe('Verify wish list or delete recently added products if they added', () => {
	it('Check wish list for added products', () => {
		wishList.checkIfWishListEmpty({
			notEmptyWishes: wishList.searchingProductTitle,
			listIsEmptyTitle: fillListProductsTitle,
		});
	});
});

describe('Search for 3 different products and add them to the wish list', () => {
	wishList.searchAndAddProductsToWishList({
		productOne: sonyProduct,
		productTwo: rowentaProduct,
		productThree: xiaomiProduct,
	});

	describe('Verify that 3 recently added products are displayed near wish button', () => {
		it('Verify wish button', () => {
			expect(getElement({ element: wishList.wishListAddedItem })).toHaveText('3');
		});
	});
});

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
	wishList.logOutFromPersonalAccount();
});
