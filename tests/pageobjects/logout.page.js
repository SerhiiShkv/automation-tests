import { LoginPage } from '../specs/loginToPersonalAccount/login.page';

class LogOut extends LoginPage {
	get accountActionBtns() {
		return $$('.account-actions .button--medium');
	}

	logOutFromPersonalAccount() {
		it('Click on Side Menu button', () => {
			clickElement({ element: this.sideMenuBtn });
			expect(
				getElement({
					element: this.sideMenuUserName,
				})
			).toBeDisplayed();
		});

		it('Click on logged User Name', () => {
			clickElement({
				element: this.sideMenuUserName,
			});
			expect(getElement({ element: this.personalInfoTitle })).toHaveText('Особисті дані');
		});

		it('Click log out button', () => {
			clickElement({ element: this.accountActionBtns[1], needScrollPage: true });
			expect(getElement({ element: this.personalAccountBtn })).toBeDisplayed();
		});

		it('Verify that login button is displayed', () => {
			this.waitForLoadingElements({ timeout: timeOuts.small });
			clickElement({ element: this.personalAccountBtn });
			expect(getElement({ element: this.submitBtn })).toHaveText('Увійти');
		});
	}
}

export { LogOut };
