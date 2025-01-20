import React from "react";
import styles from "./Login.module.css";

const Login = () => {

  
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.outer}>
          <div className={styles.inner}>
            <img src="image/login.png"></img>
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
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.element}>
                  <label className={styles.label}>Password</label>
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
            <a className={styles.registerLink} href="/register">
              Click here to Register...
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
