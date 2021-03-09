import { BasePage } from '../../pageobjects/base.page';

const basePage = new BasePage(),
	searchingIphone = 'iPhone 11',
	includesPhoneTitle = 'iPhone 11 Pro Max 512GB Midnight Green',
	iphoneTitle = 'Мобільний телефон Apple iPhone 11 Pro Max 512GB Midnight Green Офіційна гарантія',
	goldIphoneTitle = 'Мобільний телефон Apple iPhone 11 Pro Max 512GB Gold Офіційна гарантія',
	inStockPhone = 'Є в наявності',
	seller = 'Продавець: Rozetka',
	guaranteeText = '12 місяців';

describe('Open the main page', () => {
	basePage.openRozetkaHomePage({});
});

describe('Search for phone', () => {
	basePage.search.searchFor({ value: searchingIphone });

	it('Find exact iphone and click', () => {
		basePage.search.findAndClick(includesPhoneTitle);
		expect(getElement({ element: basePage.search.productTittle })).toHaveText(iphoneTitle);
	});
});

describe('Change color of phone', () => {
	it('Move the mouse cursor to the everything about product tab', () => {
		basePage.search.changePositionOfCursor({
			element: basePage.search.productTabs[0],
		});
	});

	it('Click on Gold color', () => {
		clickElement({
			element: basePage.search.colorOfPhone[1],
			needWaitForElement: false,
		});
		expect(getElement({ element: basePage.search.productTittle })).toHaveText(goldIphoneTitle);
	});
});

describe('Verify if iphone is available', () => {
	it('Check if phone is In stock ', () => {
		expect(getElement({ element: basePage.search.inStockProduct })).toHaveText(inStockPhone);
	});

	it('Check if product seller is Rozetka', () => {
		expect(getElement({ element: basePage.search.productSeller, needScrollPage: true })).toHaveText(seller);
	});

	it('Check if Guarantee 12 month is available', () => {
		expect(getElement({ element: basePage.search.guaranteeProduct, needScrollPage: true })).toHaveTextContaining(
			guaranteeText
		);
	});
});
