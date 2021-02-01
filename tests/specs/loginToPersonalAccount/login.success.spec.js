import { LoginPage } from "./login.page";
import { LogOut } from "../../pageobjects/logout.pga";

const loginPage = new LoginPage(),
  logOut = new LogOut(),
  userEmail = "test@email",
  password = "testPassword";

describe("Open the main page", () => {
  it("Go to rozetka url page with custom window size", () => {
    getElement({
      element: loginPage.mainPageWithCustomWindowSize(),
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

describe("Login with valid credentials", () => {
  loginPage.loginToPersonalAccount({ email: userEmail, password });

  it("Verify logged  User is displayed", () => {
    expect(getElement({ element: loginPage.loggedUserName })).toHaveText(
      "Вілл Сміт"
    );
  });

  it("Click on logged User name", () => {
    clickElement({ element: loginPage.loggedUserIcon });
    expect(
      getElement({
        element: loginPage.headerDropDownOptions,
      })
    ).toHaveText("Списки бажань");
  });

  it("Click on List of wishes", () => {
    clickElement({ element: loginPage.headerDropDownOptions });
    expect(getElement({ element: loginPage.listOfWishesTittle })).toHaveText(
      "У вас ще немає списків бажань"
    );
  });

  it("Click on User details in sidebar", () => {
    clickElement({
      element: loginPage.sidebarUserDetails,
    });
    expect(getElement({ element: loginPage.personalInfo })).toHaveText(
      "Особисті дані"
    );
  });

  it("Wait for loading all elements in personal account", () => {
    loginPage.waitForLoadingElements({ timeout: 200 });
  });

  it("Verify logged User email is displayed", () => {
    loginPage.waitUntilElementIsExisting({
      element: loginPage.personalSectionElements,
    });
    expect(
      getElement({
        element: loginPage.personalSectionElements,
        needWaitForElement: false,
      })
    ).toHaveText(userEmail);
  });
});

describe("Logout form personal account", () => {
  logOut.logOutFromPersonalAccount();
});
