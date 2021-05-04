import { BasePage } from '../../pageobjects/base.page';

const basePage = new BasePage();
const lgProduct = 'LG OLED55C';
const lgPrice = '47 999 ₴';
const samsungProduct = 'Samsung QE85Q70';
const samsungPrice = '93 499 ₴';
const emptyBagTitle = 'Кошик порожній';
const bagTitle = 'Кошик';
const products = [
	{ title: lgProduct, price: lgPrice },
	{ title: samsungProduct, price: samsungPrice },
];

describe('Open the main page', () => {
	it('Go to rozetka url page', () => {
		basePage.openRozetkaHomePage({});
		expect(browser).toHaveUrl('https://rozetka.com.ua/ua/');
	});
});

describe('Find and add searching product to the bag', () => {
	it('Find two products and them to the bag', () => {
		for (const element of [lgProduct, samsungProduct]) {
			const product = basePage.search.getSearchingProduct(element);
			product.clickElement({});
			basePage.bag.changePositionOfCursor({ element: basePage.search.productTabs[0] });
			basePage.bag.buyBtn.clickElement({});
			const bagProduct = basePage.bag.getBagElement(element);
			expect(bagProduct).toHaveTextContaining(element);
			basePage.bag.continueShoppingBtn.clickElement({});
		}
	});
});

describe('Navigate to home page and Check if the bag contains recently added product', () => {
	it('Click on home page', () => {
		basePage.loginPage.headerLogo.clickElement({});
		expect(basePage.bag.bagCounter.getElement({})).toHaveText('2');
	});

	it('Click on bag button in the header', () => {
		basePage.bag.bagBtn.clickElement({});
		expect(basePage.bag.bagTitle.getElement({})).toHaveText(bagTitle);
	});

	for (let bagProduct of [lgProduct, samsungProduct]) {
		it(`Verify that ${bagProduct} products is displayed in the bag`, () => {
			const bagProductTitle = basePage.bag.bagProductsTitle.find((item) => item.getText().includes(bagProduct));
			expect(bagProductTitle.getElement({})).toBeDisplayed();
		});
	}
});

describe('Check that the product contains the title and price', () => {
	for (const product of products) {
		it(`Verity  title ${product.title} of product is displayed`, () => {
			const bagProduct = basePage.bag.bagProductAll.find((elementOfProduct) =>
				elementOfProduct.getText().includes(product.title)
			);

			const productPrice = bagProduct.$('.cart-product__coast .cart-product__price');

			expect(bagProduct.getElement({ needWaitForElement: false })).toHaveTextContaining(product.title);
			expect(productPrice.getElement({ needWaitForElement: false })).toHaveText(product.price);
		});
	}
});

describe('Remove recently added products from the bag', () => {
	for (let i = 0; i < 2; i++) {
		it('Click on three dots button in the bag', () => {
			basePage.bag.waitElementUntilExist({ element: basePage.bag.threeDotsBagBtn });
			basePage.bag.threeDotsBagBtn.clickElement({});
			expect(basePage.bag.deleteThreeDotsBagBtn.getElement({})).toBeDisplayed();
		});

		it('Click on delete button in the bag', () => {
			basePage.bag.deleteThreeDotsBagBtn.clickElement({});
			if (i === 1) {
				expect(basePage.bag.emptyBagTitle.getElement({})).toHaveText(emptyBagTitle);
			}
		});
	}

	it('Click close button in the bag', () => {
		basePage.bag.bagCloseBtn.clickElement({});
		expect(basePage.loginPage.headerLogo.getElement({})).toBeDisplayed();
	});
});
