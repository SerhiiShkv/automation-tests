import { LoginPage } from '../specs/loginToPersonalAccount/login.page';

export class LogOut extends LoginPage {
	get accountActionBtns() {
		return $$('.account-actions .button--medium');
	}

	logOutFromPersonalAccount({ allSteps = true }) {
		if (allSteps) {
			this.sideMenuBtn.clickElement({});
			this.sideMenuUserName.clickElement({});
		}
		this.accountActionBtns[1].clickElement({ needScrollPage: true, needWaitForElement: false });
	}
}
