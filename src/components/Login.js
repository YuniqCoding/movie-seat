// src/components/Login.js

class Login {
    constructor(emailInput, passwordInput) {
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.render();
    }

    checkRequiredValueIsEnteredInField() {
        return [this.emailInput, this.passwordInput].every(
            (input) => input.value.trim() !== ""
        );
    }

    checkEmailFormat() {
        const re = /^[a-zA-Z0-9\.]+@[a-z0-9-_\.]+\.co$/;
        const email = this.emailInput.value;
        return re.test(email.trim());
    }

    checkPasswordInputLength(minLength, maxLength) {
        const passwordLength = this.passwordInput.value.length;
        return !(passwordLength < minLength || passwordLength > maxLength);
    }

    checkPasswordCombinationValidation() {
        const re = /^(?=.*[a-zA-Z])(?=.*[!@~])(?=.*[0-9])[a-zA-Z0-9!@~]{8,20}$/;
        const password = this.passwordInput.value;
        return re.test(password);
    }

    render() {
        const validations = [
            {
                fn: this.checkRequiredValueIsEnteredInField,
                errMsg: "아이디 혹은 비밀번호가 입력되지 않았습니다.",
            },
                { fn: this.checkEmailFormat,
                errMsg: "이메일 형식이 올바르지 않습니다."
            },
            {
                fn: () => this.checkPasswordInputLength(8, 20),
                errMsg: "비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다.",
            },
            {
                fn: this.checkPasswordCombinationValidation,
                errMsg: "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.",
            },
        ];

        for (let validation of validations) {
            if (!validation.fn.call(this)) {
                alert(validation.errMsg);
                return;
            }
        }

        alert("로그인 성공!");
        location.reload();
    }
}
export default Login;