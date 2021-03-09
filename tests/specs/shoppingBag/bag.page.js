import { Core } from '../../core/core';

export class Bag extends Core {
	get buyOnProductBtn() {
		return $$('.toOrder .goods-tile__buy-button');
	}

	get amountOfAddedProductsInBag() {
		return $('.header__button .counter--green');
	}

	get bagBtn() {
		return $('.header__button--active');
	}

	get bagProducts() {
		return $$('.cart-list__item .cart-product');
	}

	get bagProductsTitle() {
		return $$('.cart-list__item .cart-product__title');
	}

	get buyBtn() {
		return $('.toOrder .button_with_icon.button_size_large');
	}

	get bagTitle() {
		return $('.modal__header .modal__heading');
	}

	get continueShoppingBtn() {
		return $('.cart-footer .cart-footer__continue');
	}

	get productPrice() {
		return $('.product-prices__big.product-prices__big_color_red');
	}

	get bagProductPrice() {
		return $$('.cart-product__coast .cart-product__price');
	}

	get bagCounter() {
		return $('.counter.counter--green');
	}

	get bagProductAll() {
		return $$('.cart-list .cart-list__item');
	}

	get threeDotsBagBtn() {
		return $('#cartProductActions0');
	}

	get deleteThreeDotsBagBtn() {
		return $('.context-menu__item');
	}

	get emptyBagTitle() {
		return $('.cart-dummy .cart-dummy__heading');
	}

	get bagCloseBtn() {
		return $('.modal__header .modal__close');
	}

	openBagAndCheckAmountOfProducts({ newProducts, bagTitle = 'Кошик' }) {
		describe('Verify that bag contains recently added products', () => {
			it('Click on bag button in the header', () => {
				clickElement({ element: this.bagBtn });
				expect(getElement({ element: this.bagTitle })).toHaveText(bagTitle);
			});

			for (let bagProduct of newProducts) {
				it(`Verify that ${bagProduct} products is displayed in the bag`, () => {
					const bagProductTitle = this.bagProductsTitle.find((item) => item.getText().includes(bagProduct));
					expect(getElement({ element: bagProductTitle })).toBeDisplayed();
				});
			}
		});
	}

	/**
	 *
	 * @param {Array<{title: string, price: string }>} products
	 */
	checkProductTitleAndPriceInBag({ products }) {
		describe('Verify product title and price are displayed in the bag', () => {
			for (let product of products) {
				it(`Verity  title ${product.title} of product is displayed`, () => {
					const bagProduct = this.bagProductAll.find((elementOfProduct) =>
						elementOfProduct.getText().includes(product.title)
					);

					const productPrice = bagProduct.$('.cart-product__coast .cart-product__price');

					expect(getElement({ element: bagProduct, needWaitForElement: false })).toHaveTextContaining(
						product.title
					);
					expect(getElement({ element: productPrice, needWaitForElement: false })).toHaveText(product.price);
				});
			}
		});
	}
}
