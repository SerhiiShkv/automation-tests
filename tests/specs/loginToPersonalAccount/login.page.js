import BasePage from "../../pageobjects/base.page";

class LoginPage extends BasePage {
  get personalAccountBtn() {
    return $(".header-topline__user-link.button--link");
  }
  get inputEmailField() {
    return $("#auth_email");
  }
  get inputPasswordField() {
    return $("#auth_pass");
  }
  get submitBtn() {
    return $(".button--green.auth-modal__submit");
  }
  get incorrectPasswordMessage() {
    return $(".form__hint_type_warning");
  }
  get titleInPersonalAccount() {
    return $("h3.modal__heading");
  }
  get errorMessage() {
    return $(".error-message");
  }
  get loggedUserName() {
    return $(".js-rz-auth .header-topline__user-link");
  }
  get loggedUserIcon() {
    return $(".header-topline__user-link .header-topline__user-icon");
  }

  get headerDropDownOptions() {
    return $$(".header-dropdown__list-item .header-dropdown__list-link");
  }

  get listOfWishesTittle() {
    return $(".cabinet-dummy .cabinet-dummy__heading");
  }

  get sidebarUserDetails() {
    return $(".cabinet-user .cabinet-navigation__link");
  }

  get personalSectionElements() {
    return $$(".personal-data__item .personal-data__value")[7];
  }

  get personalInfo() {
    return $(".cabinet-content .cabinet__heading");
  }

  loginToPersonalAccount({ email, password }) {
    it("CLick on Personal Account button", () => {
      clickElement({ element: this.personalAccountBtn });
      expect(getElement({ element: this.titleInPersonalAccount })).toHaveText(
        "Вхід"
      );
    });

    it("Fill email address", () => {
      fillElement({ element: this.inputEmailField, value: email });
    });

    it("Enter password", () => {
      fillElement({ element: this.inputPasswordField, value: password });
    });

    it("Click submit button", () => {
      clickElement({ element: this.submitBtn });
    });
  }

  chooseCorrectErrorMessage({ userNotExists, wrongPassword, email }) {
    browser.waitUntil(
      () => userNotExists.isExisting() || wrongPassword.isExisting(),
      {
        timeout: 6000,
        timeoutMsg: "Expected error message to be displayed",
      }
    );

    if (userNotExists.isDisplayed()) {
      expect(userNotExists).toHaveText(
        `Користувач з логіном ${email} не зареєстрований`
      );
    } else if (wrongPassword.isDisplayed()) {
      expect(wrongPassword).toHaveText(
        "Введено невірний пароль!" +
          "\n" +
          "Перевірте розкладку клавіатури і Caps Lock" +
          "\n" +
          "Надішліть мені тимчасовий пароль на вказану адресу електронної пошти"
      );
    } else {
      setTimeout(() => {
        this.chooseCorrectErrorMessage({ userNotExists, wrongPassword, email });
      }, 400);
    }
  }
}

export { LoginPage };
