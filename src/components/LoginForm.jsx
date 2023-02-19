import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/LoginForm.css";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email es requerido"),
    password: Yup.string().required("Contraseña es requerida"),
  });

  const handleSubmit = (values) => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (values.email === email && values.password === password) {
      toast.success("¡Bienvenido de nuevo!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.error("Correo electrónico o contraseña incorrectos.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <h1>👋 Bienvenido 👋</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <h2>Iniciar sesión</h2>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Iniciar sesión
            </button>
          </Form>
        )}
      </Formik>
      <p>
        ¿No tienes una cuenta? <a href="/register">Regístrate</a>
      </p>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
