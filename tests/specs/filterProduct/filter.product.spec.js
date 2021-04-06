import { Filter } from './filter.page';

const filter = new Filter(),
	gamersChairTitle = 'Геймерські крісла',
	dxRacer = 'DXRacer',
	gtRacer = 'GT RACER',
	products = [dxRacer, gtRacer];

describe('Open the home page and Navigate to the chairs for gamers', () => {
	it('Go to rozetka url page', () => {
		filter.openRozetkaHomePage({});
		expect(browser).toHaveUrl('https://rozetka.com.ua/ua/');
	});

	it('Click on the product for gamers and select chairs', () => {
		filter.productsForGamers[2].clickElement({});
		filter.chairsForGamers.clickElement({});
		expect(filter.chairsForGamersTitle.getElement({})).toHaveText(gamersChairTitle);
	});
});

describe('Verify filter and Select two different models of chairs', () => {
	it(`Scroll to the DxRacer product and verify that searching product is displayed in the filter`, () => {
		filter.chairDxRacer.getElement({ needScrollPage: true });
		for (const element of products) {
			filter.filterSearchField.fillElement({ value: element });
			expect(filter.letterOfSearchingBrand.getElement({})).toHaveText(element.substring(0, 1));
			filter.searchClearBtn.clickElement({ timeout: timeouts.small });
		}
	});

	it('Select searching products', () => {
		for (const element of products) {
			filter.waitUntilElementIsExisting({ element: $(`[for='${element}']`) });
			const filterProductTitle = filter.checkboxProduct.find((item) => item.getText().includes(element));
			expect(filterProductTitle.getElement({ needWaitForElement: false })).toBeDisplayed();
			filterProductTitle.clickElement({});
		}
	});
});

describe('Sort from cheap to expensive', () => {
	it('Click on rating filed', () => {
		filter.waitForLoadingElements({ timeout: timeouts.small });
		filter.ratingField.clickElement({});
		filter.ratingField.selectByVisibleText('За рейтингом');
		filter.changePositionOfCursor({ element: filter.reviewCounts[0] });
	});

	it('Find most reviewed product in the list', () => {
		const mostReviewed = filter.getMostReviewed();
		const reviewNumber = parseInt(mostReviewed.getText());
		expect(mostReviewed.getElement({ needWaitForElement: false })).toBeDisplayed();
		mostReviewed.clickElement({});
		filter.waitForLoadingElements({ timeout: timeouts.small });
		const reviewTabsCount = filter.getTabCounts();
		expect(reviewTabsCount).toEqual(reviewNumber);
	});

	it('Click on Questions and Everything about product tabs', () => {
		filter.search.productTabs[3].clickElement({});
		filter.search.productTabs[0].clickElement({});
		expect(filter.search.inStockProduct.getElement({})).toBeDisplayed();
	});
});
