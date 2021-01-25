import BasePage from "../../pageObjects/base.page";

class LoginPage extends BasePage {
  get personalAccountBtn() {
    return $(".header-topline__user-link.button--link");
  }
  get inputUsername() {
    return $("#auth_email");
  }
  get inputPassword() {
    return $("#auth_pass");
  }
  get submitBtn() {
    return $(".button--green.auth-modal__submit");
  }
  get wrongPasswordMessage() {
    return $(".form__hint_type_warning");
  }

  login(userEmail, password) {
    clickElement({ element: this.personalAccountBtn });
    fillElement({ element: this.inputUsername, value: userEmail });
    fillElement({ element: this.inputPassword, value: password });
    clickElement({ element: this.submitBtn });
  }
}
export { LoginPage };
