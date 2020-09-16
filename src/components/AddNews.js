import React from "react";
import Modal from "react-bootstrap/Modal";
import * as cn from 'classnames';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { validationSchema } from "../validation/add-news"
import { formErrorCheck } from '../utils/utils'
import { Button } from "react-bootstrap";

const AddNews = ({ onClose, onSave }) => {

    return (
        <Modal
            show={true}
            centered={true}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавление новости</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="AddNews">
                    <Formik
                        initialValues={{title: '', description: ''}}
                        validationSchema={Yup.object(validationSchema)}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(false);
                            onSave(values);
                        }}>
                        {({errors, touched, handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
                                <label htmlFor="title"
                                       className='AddNews__label required'>Заголовок новости:</label>
                                <Field
                                    id='title'
                                    name="title"
                                    className={cn('AddNews__input', {'error-input': formErrorCheck(errors, touched, 'title' )})}/>
                                {formErrorCheck(errors, touched, 'title' ) ? (
                                    <div className='error-hint'>{errors.title}</div>) : null}

                                <label htmlFor="description"
                                       className='AddNews__label required'>Описание новости:</label>
                                <Field
                                    id='description'
                                    name='description'
                                    className={cn('AddNews__input', {'error-input': formErrorCheck(errors, touched, 'description' )})}/>
                                {formErrorCheck(errors, touched, 'description' ) ? (
                                    <div className='error-hint'>{errors.description}</div>) : null}

                                    <Button
                                        variant="outline-primary"
                                        disabled={formErrorCheck(errors, touched, 'title') ||
                                            formErrorCheck(errors, touched, 'description')}
                                        type="submit"
                                        className='AddNews__save'>Сохранить
                                    </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default AddNews;