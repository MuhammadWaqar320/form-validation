import validator from "validator";
const isReTypePasswordEmptyFun = (confirmPassword) => {
  const isconfirmPassEmpty = validator.isEmpty(confirmPassword);
  if (isconfirmPassEmpty) {
    return true;
  } else {
    return false;
  }
};
const isReTypeEmailEmptyFun = (confirmEmail) => {
  const isConfirmEmailEmpty = validator.isEmpty(confirmEmail);
  if (isConfirmEmailEmpty) {
    return true;
  } else {
    return false;
  }
};
const isAllFieldsEmptyFun = (
  name,
  surname,
  email,
  passport_no,
  password,
  reTypeEmail,
  reTypePassword
) => {
  const isNameEmpty = validator.isEmpty(name);
  const isSurnameEmpty = validator.isEmpty(surname);
  const isEmailEmpty = validator.isEmpty(email);
  const isPassportNoEmpty = validator.isEmpty(passport_no);
  const isPasswordEmpty = validator.isEmpty(password);
  const isReTypePassEmpty = isReTypePasswordEmptyFun(reTypePassword);
  const isReTypeEmailEmpty = isReTypeEmailEmptyFun(reTypeEmail);
  if (
    isNameEmpty &&
    isSurnameEmpty &&
    isEmailEmpty &&
    isPasswordEmpty &&
    isPassportNoEmpty &&
    isReTypePassEmpty &&
    isReTypeEmailEmpty
  ) {
    return true;
  } else {
    return false;
  }
};

export const validations = (req, res, next) => {
  const SpecialCharRegex = /[!@#$%^&*()_+=,./':;"\{}]|-]/;
  const LowerCaseRegex = /[a-z]/;
  const NumberRegex = /[0-9]/;
  const UpperCaseRegex = /[A-Z]/;
  let res_name = "";
  let res_email = "";
  let res_password = "";
  let res_passport_no = "";
  let res_surname = "";
  let res_reTypePassword = "";
  let res_reTypeEmail = "";
  let res_passMatched = "";
  let res_EmailMatched = "";
  let _isNameValid = false;
  let _isSurNameValid = false;
  let _isEmailValid = false;
  let _isPassportNoValid = false;
  let _isPasswordValid = false;
  let _ReTypePasswordValid = false;
  let _ReTypeEmailValid = false;

  const {
    name,
    surname,
    email,
    passport_no,
    password,
    reTypeEmail,
    reTypePassword,
  } = req.body;
  const isMatchedPassword = password.localeCompare(reTypePassword);
  const isMatchedEmail = email.localeCompare(reTypeEmail);
  const _isEmpty=isAllFieldsEmptyFun(
    name,
    surname,
    email,
    passport_no,
    password,
    reTypeEmail,
    reTypePassword
  )
  if (_isEmpty) {
    res.json({
      __name: "name is required",
      __surname: "surname is required",
      __email: "email is required",
      __passport_no: "passport no is required",
      __password: "password is required",
      __reTypePassword: "confirm password is required",
      __reTypeEmail: "confirm email is required",
    });
  } else {
    const firstChar = name.charAt(0);
    const isNameStartWithNo = validator.isNumeric(firstChar);
    const isNameStartWithSChar = SpecialCharRegex.test(firstChar);
    const nameLength = name.length;
    // ////////////////////////////////////////  name validation
    if (!validator.isEmpty(name)) {
      if (nameLength < 15) {
        if (!isNameStartWithNo && !isNameStartWithSChar) {
          _isNameValid = true;
        } else {
          res_name = "name can not start with number or special character";
        }
      } else {
        res_name = "name should be less then 15 char";
      }
    } else {
      res_name = "name is required";
    }
    // //////////////////////////////////////////// surname

    const firstCharSur = surname.charAt(0);
    const isSurNameStartWithNo = validator.isNumeric(firstCharSur);
    const isSurNameStartWithSChar = SpecialCharRegex.test(firstCharSur);
    const surNameLength = surname.length;
    if (!validator.isEmpty(surname)) {
      if (surNameLength < 15) {
        if (!isSurNameStartWithNo && !isSurNameStartWithSChar) {
          _isSurNameValid = true;
        } else {
          res_surname =
            "surname can not start with number or special character";
        }
      } else {
        res_surname = "surname should be less then 15 char";
      }
    } else {
      res_surname = "surname is required";
    }
    // /////////////////////////////////////////////////// password
    const passwordLength = password.length;
    if (!validator.isEmpty(password)) {
      if (passwordLength >= 8) {
        if (
          SpecialCharRegex.test(password) &&
          LowerCaseRegex.test(password) &&
          NumberRegex.test(password) &&
          UpperCaseRegex.test(password)
        ) {
          if (isMatchedPassword === 0) {
            _isPasswordValid = true;
          } else {
            res_passMatched = "pasword and confirm password must me same";
          }
        } else {
          res_password =
            "password must containt at least 1 lower and upper case letter,number and special character";
        }
      } else {
        res_password = "password length should be at least 8 char";
      }
    } else {
      res_password = "password is required";
    }
    // ////////////////////////////////////////////////////email
    if (!validator.isEmpty(email)) {
      const isEmail = validator.isEmail(email);
      if (isEmail) {
        if (!isMatchedEmail) {
          _isEmailValid = true;
        } else {
          res_EmailMatched = "email and confirm email must me same";
        }
      } else {
        res_email = "email is invalid @ is missing";
      }
    } else {
      res_email = "email is required";
    }

    // /////////////////////////////// passport//////////////////////////////////
    const isPassportNoAlphaNum = validator.isAlphanumeric(passport_no);
    if (!validator.isEmpty(passport_no)) {
      if (isPassportNoAlphaNum) {
        _isPassportNoValid = true;
      } else {
        res_passport_no = "only alphabets and numbers are allowed";
      }
    } else {
      res_passport_no = "passport no is required";
    }

    if (
      _isNameValid &&
      _isSurNameValid &&
      _isEmailValid &&
      _isPassportNoValid &&
      _isPasswordValid
    ) {
      next();
    } else {
      res.json({
        __name: res_name,
        __surname: res_surname,
        __email: res_email,
        __passport_no: res_passport_no,
        __password: res_password,
        __reTypePassword: reTypePassword?"":"field is required",
        __reTypeEmail: reTypeEmail?"":"field is required",
        __isPasswordMatched: res_passMatched,
        __isEmailMatched: res_EmailMatched,
      });
    }
  }
};
