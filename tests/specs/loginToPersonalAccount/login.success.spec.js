import { LoginPage } from "./login.page";
import { LogOut } from "../../pageobjects/logout.page";

const loginPage = new LoginPage(),
  logOut = new LogOut(),
  userEmail = "test@mail.com",
  password = "testPassword",
  loggedUserName = "Вілл Сміт",
  listOfWishesOption = "Списки бажань",
  wishesTitle = "У вас ще немає списків бажань",
  personalUserInfo = "Особисті дані";

describe("Open the main page", () => {
  loginPage.openRozetkaHomePage({ customSizePage: true, mainPage: false });

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
      loggedUserName
    );
  });

  it("Click on logged User name", () => {
    clickElement({ element: loginPage.loggedUserIcon });
    expect(
      getElement({
        element: loginPage.headerDropDownOptions[0],
      })
    ).toHaveText(listOfWishesOption);
  });

  it("Click on List of wishes", () => {
    clickElement({ element: loginPage.headerDropDownOptions[0] });
    expect(getElement({ element: loginPage.listOfWishesTittle })).toHaveText(
      wishesTitle
    );
  });

  it("Click on User details in sidebar", () => {
    clickElement({
      element: loginPage.sidebarUserDetails,
    });
    expect(getElement({ element: loginPage.personalInfo })).toHaveText(
      personalUserInfo
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
