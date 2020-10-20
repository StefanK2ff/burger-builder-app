export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.contains) {
      isValid = value.indexOf(rules.contains) !== -1 && isValid;
    }
    if (rules.isEmail) {
      isValid = value.indexOf("@") !== -1 && isValid;
    }
    return isValid;
  };