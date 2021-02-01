import { LoginPage } from "./login.page";
import * as faker from "faker";

const loginPage = new LoginPage();
let email = faker.internet.email(),
  password = faker.internet.password();

describe("Open main page", () => {
  it("Go to rozetka page", () => {
    getElement({
      element: loginPage.openMainPage(),
      needWaitForElement: false,
    });
    expect(browser).toHaveUrl("https://rozetka.com.ua/ua/");
  });

  it("Verify Personal Account button is displayed", () => {
    getElement({ element: loginPage.personalAccountBtn });
    expect(
      getElement({ element: loginPage.personalAccountBtn })
    ).toBeDisplayed();
  });
});

describe("Login with invalid credentials", () => {
  loginPage.loginToPersonalAccount({ email, password });
});

describe("Verify one of the error messages should be displayed", () => {
  it("Verify error message is displayed", () => {
    loginPage.chooseCorrectErrorMessage({
      userNotExists: loginPage.errorMessage,
      wrongPassword: loginPage.incorrectPasswordMessage,
      email,
    });
  });
});
