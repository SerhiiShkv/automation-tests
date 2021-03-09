import { BasePage } from '../../pageobjects/base.page';
import { WishList } from '../wishList/wishList.page';

const basePage = new BasePage(),
	wishList = new WishList(),
	lgProduct = 'LG OLED55C',
	lgPrice = '51 999 ₴',
	samsungProduct = 'Samsung QE85Q70',
	samsungPrice = '92 999 ₴',
	emptyBagTitle = 'Кошик порожній';

describe('Open the main page', () => {
	basePage.openRozetkaHomePage({});
});

describe('Find and add searching product to the bag', () => {
	wishList.searchProductsThenAddOrClick({ products: [lgProduct, samsungProduct] });
});

describe('Navigate to home page', () => {
	it('Click on home page', () => {
		clickElement({ element: basePage.loginPage.headerLogo });
		expect(getElement({ element: basePage.bag.bagCounter })).toHaveText('2');
	});
});

describe('Check if the bag contains recently added product', () => {
	basePage.bag.openBagAndCheckAmountOfProducts({ newProducts: [lgProduct, samsungProduct] });
});

describe('Check that the product contains the title and price', () => {
	basePage.bag.checkProductTitleAndPriceInBag({
		products: [
			{ title: lgProduct, price: lgPrice },
			{ title: samsungProduct, price: samsungPrice },
		],
	});
});

describe('Remove recently added products from the bag', () => {
	for (let i = 0; i < 2; i++) {
		it('Click on three dots button in the bag', () => {
			basePage.bag.waitUntilElementIsExisting({ element: basePage.bag.threeDotsBagBtn });
			clickElement({ element: basePage.bag.threeDotsBagBtn });
			expect(getElement({ element: basePage.bag.deleteThreeDotsBagBtn })).toBeDisplayed();
		});

		it('Click on delete button in the bag', () => {
			clickElement({ element: basePage.bag.deleteThreeDotsBagBtn });
			if (i === 1) {
				expect(getElement({ element: basePage.bag.emptyBagTitle })).toHaveText(emptyBagTitle);
			}
		});
	}

	it('Click close button in the bag', () => {
		clickElement({ element: basePage.bag.bagCloseBtn });
		expect(getElement({ element: basePage.loginPage.headerLogo })).toBeDisplayed();
	});
});
