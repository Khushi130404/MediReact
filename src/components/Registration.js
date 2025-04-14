import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";
import UserInfo from "../model/UserInfo";
import styles from "./Registration.module.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "male",
    address: "",
    contacts: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = new UserInfo(
      formData.name,
      formData.email,
      formData.password,
      parseInt(formData.age),
      formData.gender,
      formData.contacts,
      formData.address
    );

    try {
      const response = await registerUser(newUser);
      setError("");
      navigate("/home");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response ? err.response.data : "Something went wrong!");
    }
  };

  return (
    <div className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contacts</label>
            <input
              type="text"
              name="contacts"
              value={formData.contacts}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
        <a className={styles.loginLink} href="/login">
          <div>Already a user? Click here to Login...</div>
        </a>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Registration;
