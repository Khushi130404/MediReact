import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";
import { loginDoctor } from "../services/DoctorService";
import { sendMail } from "../services/MailService";
import { checkAdminLogin } from "../services/AdminService";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const admin = await checkAdminLogin(email, password);
      if (admin) {
        localStorage.setItem(
          "logged_admin",
          JSON.stringify({ email: email, password: password })
        );
        console.log("Admin logged in successfully");
        const emailDto = {
          to: "khushipatel134040@gmail.com",
          subject: "Admin Login Notification",
          text: "The admin has logged in successfully. If this was not you, please change your password.",
        };
        try {
          await sendMail(emailDto);
          console.log("Email notification sent successfully!");
        } catch (error) {
          console.error("Failed to send email notification:", error);
        }
        navigate("/admin/home");
        return;
      }
      const doctor = await loginDoctor(email, password);
      if (doctor) {
        localStorage.setItem("logged_doctor", JSON.stringify(doctor));
        setError("");
        navigate("/doctor/home");
        return;
      }
      const user = await loginUser(email, password);
      if (user) {
        localStorage.setItem("logged_user", JSON.stringify(user));
        setError("");
        navigate("/user/home");
        return;
      }
      setError("Invalid credentials");
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.outer}>
          <div className={styles.inner}>
            <img src="image/login.png" alt="Login" />
          </div>
          <div className={styles.boxWrapper}>
            <h2>Login</h2>
            <div className={styles.box}>
              <div className={styles.row}>
                <div className={styles.element}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.element}>
                  <label className={styles.label}>Password</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
            <p className={styles.linkPara}>
              <a className={styles.registerLink} href="/register">
                Don't have any account?
              </a>
              &nbsp;&nbsp;or&nbsp;&nbsp;
              <a className={styles.registerLink} href="/forgot">
                Forgot Password?
              </a>
            </p>
          </div>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
