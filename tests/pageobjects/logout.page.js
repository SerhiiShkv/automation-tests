import { LoginPage } from '../specs/loginToPersonalAccount/login.page';

export class LogOut extends LoginPage {
	get accountActionBtns() {
		return $$('.account-actions .button--medium');
	}

	logOutFromPersonalAccount({ allSteps = true }) {
		if (allSteps) {
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
		}

		it('Click log out button', () => {
			clickElement({ element: this.accountActionBtns[1], needScrollPage: true });
			expect(getElement({ element: this.personalAccountBtn })).toBeDisplayed();
		});

		it('Click on side menu button', () => {
			clickElement({ element: this.sideMenuBtn });
			this.waitForLoadingElements({ timeout: timeOuts.mini });
			expect(getElement({ element: this.sideMenuEnterBtn[0], needWaitForElement: false })).toHaveText('Вхід');
		});

		it('Click Enter button on side menu', () => {
			clickElement({ element: this.sideMenuEnterBtn[0] });
			expect(getElement({ element: this.submitBtn })).toHaveText('Увійти');
		});
	}
}
