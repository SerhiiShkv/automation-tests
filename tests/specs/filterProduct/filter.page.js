import { BasePage } from '../../pageobjects/base.page';

export class Filter extends BasePage {
	get productsForGamers() {
		return $$('.menu-categories_type_main .menu-categories__link');
	}
	get chairsForGamers() {
		return $('[href="https://rozetka.com.ua/ua/geymerskie-kresla/c4657827/"]');
	}

	get chairsForGamersTitle() {
		return $('.layout .catalog-heading');
	}

	get filterSearchField() {
		return $('[name="searchline"]');
	}

	get chairDxRacer() {
		return $('[for="DXRacer"]');
	}

	get checkboxProduct() {
		return $$('.checkbox-filter .checkbox-filter__item');
	}

	get searchClearBtn() {
		return $('[name="searchline"] + .sidebar-search__clear');
	}
	get letterOfSearchingBrand() {
		return $('.checkbox-filter .checkbox-filter__glyph');
	}

	get ratingField() {
		return $('.select-css');
	}

	get reviewCounts() {
		return $$('.goods-tile__stars .goods-tile__reviews-link');
	}

	get reviewQuestionCount() {
		return $$('.tabs__item .tabs__link-text');
	}

	getMostReviewed() {
		let popularProduct = this.reviewCounts.map((item) => parseInt(item.getText()) || 0);
		let max = Math.max(...popularProduct);
		return this.reviewCounts.find((item) => parseInt(item.getText()) === max);
	}

	getTabCounts() {
		return this.reviewQuestionCount.reduce((sum, current) => sum + (parseInt(current.getText()) || 0), 0);
	}
}
