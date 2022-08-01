"use strict"
const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response)=>{
        console.log(response);
        if (!response.success) {
            return  userForm.setLoginErrorMessage(response.error); 
        }
        document.location.reload();
    });
}

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response)=>{
        console.log(response);
        if (!response.success) {
            return  userForm.setRegisterErrorMessage(response.error); 
        }
        document.location.reload();
    });
}
    