import * as Yup from "yup";

export const validationSchema = {
    title: Yup.string()
        .min(3, 'Заголовок слишком короткий')
        .required('Необходимо заполнить'),
    description: Yup.string()
        .min(3, 'Описание новости слишком короткое')
        .required('Необходимо заполнить'),
};

