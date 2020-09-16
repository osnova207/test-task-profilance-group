import * as Yup from "yup";

export const validationSchema = {
    login: Yup.string()
        .min(3, 'Логин слишком короткий')
        .required('Необходимо заполнить'),
    password: Yup.string()
        .min(3, 'Пароль слишком короткий')
        .required('Необходимо заполнить'),
};

