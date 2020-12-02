"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    const checkLogin = ApiConnector.login((data), response => {
        if (response.success === true) {
            location.reload();
        }
        else {
            userForm.setLoginErrorMessage(response.error);
        }
    });
};

userForm.registerFormCallback = (data) => {
    const checkLogin = ApiConnector.login((data), response => {
        if (response.success === true) {
            location.reload();
        }
        else {
            userForm.setRegisterErrorMessage(response.error);
        }
    });
};

