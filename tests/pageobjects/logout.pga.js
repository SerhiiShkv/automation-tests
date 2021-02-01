import { LoginPage } from "../specs/loginToPersonalAccount/login.page";

class LogOut extends LoginPage {
  get logOutDropDownOptions() {
    return $$(".header-dropdown__list-item .header-dropdown__list-link")[9];
  }

  logOutFromPersonalAccount() {
    it("Click on logged User", () => {
      clickElement({ element: this.loggedUserIcon });
      expect(
        getElement({
          element: this.logOutDropDownOptions,
        })
      ).toBeDisplayed();
    });

    it("Click on Logout option", () => {
      clickElement({
        element: this.logOutDropDownOptions,
      });
      expect(getElement({ element: this.personalAccountBtn })).toHaveText(
        "увійдіть в особистий кабінет"
      );
    });
  }
}

export { LogOut };
