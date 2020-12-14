const LoginPage = require('../pageobjects/login.page');



let userEmail = 'test@gmail.com',
    password = 'teststest';

describe('My Login application', () => {
    it('should Not login with invalid credentials', () => {
        LoginPage.chooseUaLang();
        expect(browser).toHaveUrl('https://rozetka.com.ua/ua/')

        LoginPage.logInToPersonalAccount.waitForDisplayed();
        LoginPage.logInToPersonalAccount.click();
        LoginPage.login(userEmail, password);
        expect(LoginPage.wrongPasswordMessage).toHaveText('Введено невірний пароль!' + '\n' + 'Перевірте розкладку клавіатури і Caps Lock' + '\n' + 'Надішліть мені тимчасовий пароль на вказану адресу електронної пошти')
    });
});


