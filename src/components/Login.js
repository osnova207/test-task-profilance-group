import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as cn from 'classnames';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import { validationSchema } from "../validation/login"
import { formErrorCheck } from '../utils/utils'
import { Button } from "react-bootstrap";

const Login = ({ onClose, onLogIn }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Modal
            show={true}
            centered={true}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Авторизация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="Login">
                    <Formik
                        initialValues={{login: '', password: ''}}
                        validationSchema={Yup.object(validationSchema)}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(false);
                            onLogIn(values);
                        }}>
                        {({errors, touched, handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
                                <label htmlFor="login"
                                       className='Login__label required'>Логин:</label>
                                <Field
                                    id='login'
                                    name="login"
                                    className={cn('Login__input', {'error-input': formErrorCheck(errors, touched, 'login' )})}/>
                                {formErrorCheck(errors, touched, 'login' ) ? (
                                    <div className='error-hint'>{errors.login}</div>) : null}

                                <label htmlFor="password"
                                       className='Login__label required'>Пароль:</label>
                                <Field
                                    id='password'
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className={cn('Login__input', {'error-input': formErrorCheck(errors, touched, 'password' )})}/>
                                <div className='password-show-icon' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword && <i className='material-icons'>visibility</i>}
                                    {!showPassword && <i className='material-icons'>visibility_off</i>}
                                </div>
                                {formErrorCheck(errors, touched, 'password' ) ? (
                                    <div className='error-hint'>{errors.password}</div>) : null}
                                <Button
                                    variant="outline-primary"
                                    disabled={formErrorCheck(errors, touched, 'login') ||
                                    formErrorCheck(errors, touched, 'password')}
                                    type="submit"
                                    className='Login__submit'>Войти</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default Login;