import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterForm.css";

const RegisterForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("Contraseña es requerida"),
  });

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    localStorage.setItem("email", values.email);
    localStorage.setItem("password", values.password);
    navigate("/");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <h2>Registro</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <Field
              type="email"
              name="email"
              id="email"
              className="form-control"
            />
            {errors.email && touched.email && (
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <Field
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
           {errors.password && touched.password && (
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              )}
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
