const Page = require('./page');


class LoginPage extends Page {
    get logInToPersonalAccount () {
        return $('.header-topline__user-link.button--link');
    }
    get inputUsername () {
        return $('#auth_email')
    }
    get inputPassword () {
        return $('#auth_pass')
    }
    get btnSubmit () {
        return $('.button--green.auth-modal__submit')
    }
    get wrongPasswordMessage() {
        return $('.form__hint_type_warning')
    }

    login (userEmail, password) {
        this.inputUsername.setValue(userEmail);
        this.inputPassword.setValue(password);
        this.btnSubmit.click(); 
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    // open () {
    //     return super.open('login');
    // }
}

module.exports = new LoginPage();
