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
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
                  <div className={styles.passwordWrapper}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={styles.input}
                      value={password}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                      src={
                        showPassword
                          ? "/image/hidden.svg"
                          : "/image/visible.svg"
                      }
                      alt={showPassword ? "Hide password" : "Show password"}
                      className={styles.passwordToggleIcon}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
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
              <a
                className={styles.registerLink}
                onClick={() => setShowPopup(true)}
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </a>
            </p>
          </div>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <h3 className={styles.popupTitle}>Recover Password</h3>
            <p className={styles.popupText}>
              Choose a method to recover your account:
            </p>
            <div className={styles.popupOptions}>
              <button
                className={styles.popupButton}
                onClick={() => {
                  setShowPopup(false);
                  navigate("/forgot/gmail");
                }}
              >
                Login via Gmail
              </button>
              <button
                className={styles.popupButton}
                onClick={() => {
                  setShowPopup(false);
                  navigate("/forgot/sms");
                }}
              >
                Login via SMS
              </button>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
