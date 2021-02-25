import { LogOut } from '../../pageobjects/logout.page';

class Search extends LogOut {
	get searchField() {
		return $('.search-form__inner .search-form__input');
	}

	get findBtn() {
		return $('.search-form .search-form__submit');
	}

	get searchingProductTitle() {
		return $$('.goods-tile__heading .goods-tile__title');
	}

	get searchingProducts() {
		return $$('.catalog-grid__cell');
	}

	get productTittle() {
		return $('.product__heading .product__title');
	}

	get colorOfPhone() {
		return $$('.var-options__color .var-options__color-preview');
	}

	get productTabs() {
		return $$('.tabs__item .tabs__link');
	}

	get inStockProduct() {
		return $('.product__status.product__status_color_green');
	}

	get guaranteeProduct() {
		return $('.product-about__block-body.text');
	}

	get productSeller() {
		return $('.product-seller .product-seller__title');
	}

	searchFor({ value }) {
		it(`Search for ${value}`, () => {
			fillElement({ element: this.searchField, value });
		});

		it('Click find button', () => {
			clickElement({ element: this.findBtn });
			for (let item of this.searchingProductTitle) {
				expect(getElement({ element: item })).toHaveTextContaining(value);
			}
		});
	}

	findAndClick(phoneTitle) {
		let arr = this.searchingProducts;
		for (let item of arr) {
			const titleElement = item.$('.goods-tile__heading .goods-tile__title');
			const title = titleElement.getText();
			if (title.includes(phoneTitle)) {
				titleElement.click();
				break;
			}
		}
	}
}

export { Search };
