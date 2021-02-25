import { Bag } from './bag.page';
import { LoginPage } from '../loginToPersonalAccount/login.page';

const bag = new Bag(),
	loginPage = new LoginPage(),
	lgProduct = 'LG OLED55C',
	lgPrice = '51 999 ₴',
	samsungProduct = 'Samsung QE85Q70',
	samsungPrice = '92 999 ₴',
	emptyBagTitle = 'Кошик порожній';

describe('Open the main page', () => {
	loginPage.openRozetkaHomePage({});
});

describe('Find and add searching product to the bag', () => {
	bag.searchProductsThenAddOrClick({ products: [lgProduct, samsungProduct] });
});

describe('Navigate to home page', () => {
	it('Click on home page', () => {
		clickElement({ element: bag.headerLogo });
		expect(getElement({ element: bag.bagCounter })).toHaveText('2');
	});
});

describe('Check if the bag contains recently added product', () => {
	bag.openBagAndCheckAmountOfProducts({ newProducts: [lgProduct, samsungProduct] });
});

describe('Check that the product contains the title and price', () => {
	bag.checkProductTitleAndPriceInBag({
		products: [
			{ title: lgProduct, price: lgPrice },
			{ title: samsungProduct, price: samsungPrice },
		],
	});
});

describe('Remove recently added products from the bag', () => {
	for (let i = 0; i < 2; i++) {
		it('Click on three dots button in the bag', () => {
			bag.waitUntilElementIsExisting({ element: bag.threeDotsBagBtn });
			clickElement({ element: bag.threeDotsBagBtn });
			expect(getElement({ element: bag.deleteThreeDotsBagBtn })).toBeDisplayed();
		});

		it('Click on delete button in the bag', () => {
			clickElement({ element: bag.deleteThreeDotsBagBtn });
			if (i === 1) {
				expect(getElement({ element: bag.emptyBagTitle })).toHaveText(emptyBagTitle);
			}
		});
	}

	it('Click close button in the bag', () => {
		clickElement({ element: bag.bagCloseBtn });
		expect(getElement({ element: bag.headerLogo })).toBeDisplayed();
	});
});
