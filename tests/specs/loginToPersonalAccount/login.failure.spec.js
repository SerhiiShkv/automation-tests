import { LoginPage } from "./login.page";

const loginPage = new LoginPage(),
  userEmail = "test@gmail.com",
  password = "teststest";

describe("Login invalid credentials", () => {
  it("Go to rozetka page", () => {
    getElement({
      element: loginPage.openMainPage(),
      needWaitForElement: false,
    });
    expect(browser).toHaveUrl("https://rozetka.com.ua/ua/");
  });

  it("Verify Personal Account button is displayed", () => {
    getElement({ element: loginPage.personalAccountBtn });
    expect(loginPage.personalAccountBtn).toBeDisplayed();
  });

  it("Click on Personal Account button and login with invalid credentials", () => {
    loginPage.login(userEmail, password);
    expect(loginPage.wrongPasswordMessage).toHaveText(
      "Введено невірний пароль!" +
        "\n" +
        "Перевірте розкладку клавіатури і Caps Lock" +
        "\n" +
        "Надішліть мені тимчасовий пароль на вказану адресу електронної пошти"
    );
  });
});
