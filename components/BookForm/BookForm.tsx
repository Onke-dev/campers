'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBookingRequest } from '@/app/lib/api/clientApi';
import css from './BookForm.module.css';

type Props = {
  camperId: string;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[\p{L}][\p{L}\s'-]*$/u, 'Please enter your name.')
    .required('Please enter your name.'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email.')
    .required('Please enter your email.'),
});

const BookForm = ({ camperId }: Props) => {
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: { name: '', email: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSubmitError('');
      setSuccessMessage('');

      try {
        const response = await createBookingRequest(camperId, values);
        resetForm();
        setSuccessMessage(response.message);
      } catch {
        setSubmitError('Unable to send your request. Please try again.');
      }
    },
  });

  const hasError = (field: 'name' | 'email') =>
    Boolean(formik.touched[field] && formik.errors[field]);

  return (
    <section className={css.form_card} aria-labelledby="booking-title">
      <h2 id="booking-title" className={css.title}>
        Book your campervan now
      </h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={formik.handleSubmit} noValidate>
        <label className={`${css.field} ${css.indent}`}>
          {hasError('name') && <span className={css.label}>Name*</span>}
          <input
            className={hasError('name') ? css.input_error : css.input}
            id="name"
            name="name"
            type="text"
            placeholder="Name*"
            autoComplete="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={hasError('name')}
            aria-describedby={hasError('name') ? 'name-error' : undefined}
          />
        </label>
        {hasError('name') && (
          <p id="name-error" className={css.error}>
            {formik.errors.name}
          </p>
        )}

        <label className={css.field}>
          {hasError('email') && <span className={css.label}>Email*</span>}
          <input
            className={hasError('email') ? css.input_error : css.input}
            id="email"
            name="email"
            placeholder="Email*"
            type="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={hasError('email')}
            aria-describedby={hasError('email') ? 'email-error' : undefined}
          />
        </label>
        {hasError('email') && (
          <p id="email-error" className={css.error}>
            {formik.errors.email}
          </p>
        )}

        <button
          className={css.submit}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Sending…' : 'Send'}
        </button>
      </form>

      {successMessage && (
        <p className={css.success} role="status">
          {successMessage}
        </p>
      )}
      {submitError && (
        <p className={css.error} role="alert">
          {submitError}
        </p>
      )}
    </section>
  );
};

export default BookForm;
