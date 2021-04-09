import { Core } from '../../core/core';

export class Bag extends Core {

	get bagBtn() {
		return $('.header__button--active');
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

	getBagElement(product) {
		return this.bagProductAll.find((item) => item.getText().includes(product));
	}
}
