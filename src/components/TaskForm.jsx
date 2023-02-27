import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import useList from "../components/hooks/useList";
import LEVELS from "../models/levels.enum";

const TaskForm = () => {

  const TaskSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });

  const tasks = useList([]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Task List</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          level: LEVELS.NORMAL,
          done: false,
        }}
       
        onSubmit={(values, actions) => {
          setTimeout(() => {
            tasks.push(values);
            actions.resetForm({});
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={TaskSchema}
      >
        {({ errors }) => (
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
              <label style={{ marginBottom: "5px" }}>Task Name</label>
              <Field name="name" placeholder="Task Name" style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              {errors && errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
              <label style={{ marginBottom: "5px" }}>Task Description</label>
              <Field name="description" placeholder="Task Description" style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              {errors && errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
              <label style={{ marginBottom: "5px" }}>Task Level</label>
              <Field as="select" name="level" style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <option value={LEVELS.NORMAL}>Normal</option>
                <option value={LEVELS.URGENT}>Urgent</option>
                <option value={LEVELS.BLOCKING}>Blocking</option>
              </Field>
            </div>
            
            <button type="submit" style={{ backgroundColor: "#4285f4", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Submit</button>
          </Form>
        )}
      </Formik>
      {tasks.isEmpty() ? (
        <p style={{ marginTop: "20px" }}>Task List is Empty</p>
      ) : (
        tasks.value.map((task, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              type="checkbox"
              onChange={() => tasks.remove(index)}
              checked={false}
              style={{ marginRight: "10px" }}
            />
            <p style={{ fontWeight: "bold", marginRight: "5px" }}>
              {task.name}
            </p>
            <p>{task.description}</p>
          </li>
        ))
      )}
    </div>
  );
};

export default TaskForm;
