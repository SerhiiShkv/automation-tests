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

	checkIfWishListEmpty() {
		if (this.checkBoxOfOneProduct.isDisplayed()) {
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

	searchProductsThenAddOrClick({ products, addingWishList = false }) {
		for (let elementOfArray of products) {
			describe(`Fill product name ${elementOfArray} in the search field`, () => {
				it(`Search for product`, () => {
					fillElement({
						element: this.search.searchField,
						value: elementOfArray,
					});
				});

				it('Click find button', () => {
					clickElement({ element: this.search.findBtn });
					expect(
						getElement({
							element: this.search.searchingProducts,
							needWaitForElement: false,
						})
					).toBeDisplayed();
				});
				if (addingWishList) {
					it('Add any product to the wish list', () => {
						clickElement({ element: finded.$('.wish-button.js-wish-button') });
					});
				} else {
					it('Click on product', () => {
						const product = this.search.searchingProductTitle.find((element) =>
							element.getText().includes(elementOfArray)
						);
						clickElement({ element: product });
						expect(getElement({ element: this.search.productTittle })).toHaveTextContaining(elementOfArray);
					});

					it('Move cursor to product tab', () => {
						this.changePositionOfCursor({ element: this.search.productTabs[0] });
					});

					it('Click buy button', () => {
						clickElement({ element: this.bag.buyBtn });
						for (let addedProducts of this.bag.bagProductsTitle) {
							expect(getElement({ element: addedProducts })).toHaveTextContaining(elementOfArray);
						}
					});

					it('Click continue shopping button', () => {
						clickElement({ element: this.bag.continueShoppingBtn });
						expect(getElement({ element: this.search.searchField })).toBeDisplayed();
					});
				}
			});
		}
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
			const wishListOtherOption = this.getSideMenuOptions('Списки бажань');
			this.waitElementUntilClickable({ element: wishListOtherOption });
			wishListOtherOption.clickElement({});
		} else {
			wishListOption.clickElement({});
		}

		// console.log('this.loginPage.sideMenuOptions2 ------', this.loginPage.sideMenuOptions);
		// const waitForOpenOption = new Promise((resolve) => {
		// 	const openOption = this.getSideMenuOptions('Розкрити');
		// 	resolve(openOption);
		// });
		// const waitForWishListOption = new Promise((resolve) => {
		// 	const wishListOption = this.getSideMenuOptions('Списки бажань');
		// 	resolve(wishListOption);
		// });
		//
		// return waitForOpenOption
		// 	.then((otherOption) => {
		// 		otherOption.clickElement({});
		// 	})
		// 	.then(() => {
		// 		return waitForWishListOption.then((wishList) => {
		// 			wishList.clickElement({});
		// 		});
		// 	});
		//
	}

	getSideMenuOptions(option) {
		console.log(this.loginPage.sideMenuOptions.find((item) => item.getText().includes(option))?.getText());
		return this.loginPage.sideMenuOptions.find((item) => item.getText().includes(option));
	}

	checkExactNumbersOfProduct({ number }) {
		it('Check if exact number of products are displayed in wish list', () => {
			this.waitForLoadingElements({ timeout: timeouts.mini });
			let products = this.productsInWishList;
			if (products.length === number) {
				expect(products).toBeDisplayed();
			} else {
				throw new Error(
					`Expected result: 3 products should be displayed in Wish List` +
						`\n` +
						`Actual result: ${number} products are displayed in Wish List`
				);
			}
		});
	}
}
