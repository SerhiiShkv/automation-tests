import { LoginPage } from "./login.page";

const loginPage = new LoginPage(),
  userEmail = "test@gmail.com",
  password = "teststest";

describe("Login invalid credentials", () => {
  it("Go to rozetka page", () => {
    getElement({
      element: browser.url("https://www.google.com/"),
      needWaitForElement: false,
    });
    expect(browser).toHaveUrl("https://www.google.com/");
  });
});
