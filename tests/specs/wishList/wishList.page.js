import { BasePage } from '../../pageobjects/base.page';

export class WishList extends BasePage {
	get wishProductBtn() {
		return $('.wish-button.js-wish-button');
	}

	get wishListAddedItem() {
		return $('.header__button .counter--gray');
	}

	get checkBoxOfAddedProduct() {
		return $$('.goods-tile__actions .tile-checkbox');
	}
	get checkBoxOfOneProduct() {
		return $('.goods-tile__actions .tile-checkbox');
	}

	get emptyListOfWishesTittle() {
		return $('.cabinet-dummy .cabinet-dummy__heading');
	}
	get fillItWithProductsTitle() {
		return $('.cabinet-dummy .cabinet-dummy__caption');
	}

	get listOfWishesTitle() {
		return $('.content .cabinet__heading');
	}

	get wishListDeleteBtn() {
		return $('.button.js-goods-delete');
	}

	get goToMainPageBtn() {
		return $$('.button.button_color_green');
	}

	get productsInWishList() {
		return $$('.ng-untouched .goods-tile');
	}

	get checkAllInWishListBtn() {
		return $('.wish-details__actions .js-check-all-goods');
	}

	get wishListSideMenuOption() {
		return $('[href="https://rozetka.com.ua/ua/cabinet/wishlist/"]');
	}

	get wishListDropDown() {
		return $('.wish-details__actions.ng-star-inserted');
	}

	removeProductsFromWishList() {
		if (this.checkAllInWishListBtn.isDisplayed()) {
			let arrCheckBoxes = this.checkBoxOfAddedProduct;
			for (let item of arrCheckBoxes) {
				if (item.isDisplayed()) {
					item.click();
				}
			}
			this.wishListDeleteBtn.clickElement({});
		}

		this.goToMainPageBtn[1].clickElement({ needWaitForElement: true });
	}

	addToWishList(product) {
		const foundProduct = this.search.getSearchingProduct(product);
		const wishIcon = foundProduct.$('.goods-tile .js-wish-button');
		wishIcon.clickElement({});
	}

	goToWishList() {
		const wishListOption = this.getSideMenuOptions('Списки бажань');
		if (!wishListOption) {
			const openOption = this.getSideMenuOptions('Розкрити');
			this.waitElementUntilClickable({ element: openOption });
			openOption.clickElement({});
			this.waitElementUntilExist({ element: this.loginPage.sideMenuOptions[7] });
			const wishListOtherOption = this.getSideMenuOptions('Списки бажань');
			this.waitElementUntilClickable({ element: wishListOtherOption });
			wishListOtherOption.clickElement({});
		} else {
			wishListOption.clickElement({});
		}
	}

	getSideMenuOptions(option) {
		return this.loginPage.sideMenuOptions.find((item) => item.getText().includes(option));
	}

	checkExactNumbersOfProduct({ number }) {
		this.waitForLoadingElements({ timeout: timeouts.mini });
		let products = this.productsInWishList;
		if (products.length === number) {
			return products.length;
		} else {
			throw new Error(
				`Expected result: 3 products should be displayed in Wish List` +
					`\n` +
					`Actual result: ${number} products are not displayed in Wish List`
			);
		}
	}
}
