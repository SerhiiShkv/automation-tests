import { Search } from '../search/search.page';

class WishList extends Search {
	get wishProductBtn() {
		return $$('.wish-button.js-wish-button');
	}

	get wishListAddedItem() {
		return $('.header__button .counter--gray');
	}

	get checkBoxOfAddedProduct() {
		return $$('.goods-tile__actions .tile-checkbox');
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

	checkIfWishListEmpty({ notEmptyWishes, listIsEmptyTitle }) {
		if (notEmptyWishes.isDisplayed()) {
			let arrCheckBoxes = this.checkBoxOfAddedProduct;
			for (let item of arrCheckBoxes) {
				if (item.isDisplayed()) {
					item.click();
				}
			}
			clickElement({ element: this.wishListDeleteBtn });
			expect(
				getElement({
					element: this.fillItWithProductsTitle,
					needScrollPage: true,
				})
			).toHaveText(listIsEmptyTitle);
		}
		clickElement({ element: this.goToMainPageBtn[1] });
		expect(getElement({ element: this.searchField, needWaitForElement: false })).toBeDisplayed();
	}

	searchProductsThenAddOrClick({ products, addingWishList = false, index = 0 }) {
		for (let elementOfArray of products) {
			describe(`Fill product name ${elementOfArray} in the search field`, () => {
				it(`Search for product`, () => {
					fillElement({
						element: this.searchField,
						value: elementOfArray,
					});
				});

				it('Click find button', () => {
					clickElement({ element: this.findBtn });
					expect(
						getElement({
							element: this.searchingProducts,
							needWaitForElement: false,
						})
					).toBeDisplayed();
				});
				if (addingWishList) {
					it('Add any product to the wish list', () => {
						clickElement({ element: this.wishProductBtn[1] });
					});
				} else {
					it('Click on product', () => {
						clickElement({ element: this.searchingProductTitle[index] });
						expect(getElement({ element: this.productTittle })).toHaveTextContaining(elementOfArray);
					});

					it('Move cursor to product tab', () => {
						this.changePositionOfCursor({ element: this.productTabs[0] });
					});

					it('Click buy button', () => {
						clickElement({ element: this.buyBtn });
						for (let addedProducts of this.bagProductsTitle) {
							expect(getElement({ element: addedProducts })).toHaveTextContaining(elementOfArray);
						}
					});

					it('Click continue shopping button', () => {
						clickElement({ element: this.continueShoppingBtn });
						expect(getElement({ element: this.searchField })).toBeDisplayed();
					});
				}
			});
		}
	}

	checkExactNumbersOfProduct({ number }) {
		it('Check if exact number of products are displayed in wish list', () => {
			this.waitForLoadingElements({ timeout: timeOuts.mini });
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

export { WishList };
