export const formErrorCheck = (errors, touched, formName) => {
    return !!(errors[formName] && touched[formName]);
};