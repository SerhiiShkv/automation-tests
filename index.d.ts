interface BaseOptions {
	needWaitForElement?: boolean;
	timeout?: number;
}
interface ElementActionOptions extends BaseOptions {
	needScrollPage?: boolean;
}

interface FillElementOptions extends BaseOptions {
	value: string | number;
	needClearField?: boolean;
}

declare namespace WebdriverIO {
	interface Element {
		clickElement(options: ElementActionOptions): void;
		fillElement(options: FillElementOptions): void;
		getElement(options: ElementActionOptions): void;
	}
}
