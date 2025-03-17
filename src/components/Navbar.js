import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import DocList from "./DocList";

const Navbar = () => {
  const [showDocList, setShowDocList] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isDocLoggedIn, setIsDocLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
    const loggedDoctor = JSON.parse(localStorage.getItem("logged_doctor"));
    const loggedAdmin = JSON.parse(localStorage.getItem("logged_admin"));

    setIsUserLoggedIn(!!loggedUser);
    setIsDocLoggedIn(!!loggedDoctor);
    setIsAdminLoggedIn(!!loggedAdmin);
  }, []);

  const handleBookingClick = () => {
    if (isUserLoggedIn || isAdminLoggedIn) {
      console.log("Booking clicked");
      setShowDocList(true);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("logged_user");
    localStorage.removeItem("logged_doctor");
    localStorage.removeItem("logged_admin");
    setIsUserLoggedIn(false);
    setIsDocLoggedIn(false);
    setIsAdminLoggedIn(false);
    navigate("/home");
  };

  const handleNavigate = (path) => {
    if (isDocLoggedIn) navigate(`/doctor${path}`);
    else if (isUserLoggedIn) navigate(`/user${path}`);
    else if (isAdminLoggedIn) navigate(`/admin${path}`);
    else navigate(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <h1 className={styles.logo}>
          <div className={styles.logoContainer}>
            <img src="/image/logo.png" alt="Logo" />
            MediCure
          </div>
        </h1>
        <ul className={styles.navLinks}>
          <li>
            <button
              onClick={() => handleNavigate("/home")}
              className={styles.navItem}
            >
              Home
            </button>
          </li>

          {(isUserLoggedIn || isAdminLoggedIn) && (
            <>
              <li>
                <button
                  onClick={() => handleNavigate("/profile")}
                  className={styles.navItem}
                >
                  Profile
                </button>
              </li>
              <li>
                <button onClick={handleBookingClick} className={styles.navItem}>
                  Appointment
                </button>
              </li>
            </>
          )}

          {isDocLoggedIn && (
            <>
              <li>
                <button
                  onClick={() => handleNavigate("/profile")}
                  className={styles.navItem}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/schedule")}
                  className={styles.navItem}
                >
                  Schedule
                </button>
              </li>
            </>
          )}

          <li>
            <button
              onClick={() => handleNavigate("/about")}
              className={styles.navItem}
            >
              About Us
            </button>
          </li>

          {isUserLoggedIn || isDocLoggedIn || isAdminLoggedIn ? (
            <li>
              <button onClick={handleLogout} className={styles.navItem}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  onClick={() => navigate("/register")}
                  className={styles.navItem}
                >
                  Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className={styles.navItem}
                >
                  Login
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      {showDocList && <DocList onSelect={() => setShowDocList(false)} />}
    </nav>
  );
};

export default Navbar;
