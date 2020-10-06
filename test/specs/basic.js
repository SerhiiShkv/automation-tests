const assert = require("assert");
/*
describe("rozetka page", () => {
  it("should have the right title", () => {
    browser.url("https://rozetka.com.ua/");
    const title = browser.getTitle();
    assert.strictEqual(
      title,
      "Интернет-магазин ROZETKA™: официальный сайт самого популярного онлайн-гипермаркета в Украине"
    );
  });

  it("should open login model", () => {
    browser.url("https://rozetka.com.ua/");
    const link = $(".header-topline__user-link");
    link.click();
    browser.pause(3000);

    const notification = $(".modal__heading");
    expect(notification.getText().to.be.equal("Вход"));
  });
});

*/

/*
describe("rozetka page", () => {
  browser.url("https://rozetka.com.ua/");

  it("should have the right title", async () => {
    const searchInput = await $(".header-topline__user-link");
    searchInput.click();

    const loginModal = await $("single-modal-window");

    await browser.pause(5000);

    assert.strictEqual(await loginModal.isExisting(), true);
  });
});
*/

/*
describe("rozetka page", () => {
  browser.url("https://rozetka.com.ua/");
  //browser.pause(3000);

  it("should have the right title", () => {
    const searchInput = $(".header-topline__user-link");
    searchInput.click();

    const loginModal = $("single-modal-window");
    assert.strictEqual(loginModal.isExisting(), true);
  });
});

*/

describe("rozetka page", () => {
  browser.url("https://rozetka.com.ua/");
  //browser.pause(3000); //waitForDisplayed()

  it("user should be logged", () => {
    const searchInput = $(".header-topline__user-link");
    searchInput.click();

    $("single-modal-window").waitForDisplayed();

    $("#auth_email").setValue("enter your email");
    $("#auth_pass").setValue("enter your pass");

    const submit = $(".auth-modal__submit");
    submit.click();

    const logged = $("=Сергей");
    //expect(logged).to.have.property("=Сергей");
    expect(logged).toExist();
    //assert.strictEqual(logged.isExisting(), true);
    //browser.debug();
    const e;
  });
});
