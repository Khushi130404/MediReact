import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import DocList from "./DocList";

const Navbar = () => {
  const [showDocList, setShowDocList] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isDocLoggedIn, setIsDocLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
    const loggedDoctor = JSON.parse(localStorage.getItem("logged_doctor"));

    setIsUserLoggedIn(!!loggedUser);
    setIsDocLoggedIn(!!loggedDoctor);
  }, []);

  const handleBookingClick = () => {
    if (!isUserLoggedIn) {
      navigate("/login");
    } else {
      setShowDocList(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("logged_user");
    localStorage.removeItem("logged_doctor");
    setIsUserLoggedIn(false);
    setIsDocLoggedIn(false);
    navigate("/home");
  };

  const getPath = (path) => {
    if (isDocLoggedIn) return `/doctor${path}`;
    if (isUserLoggedIn) return `/user${path}`;
    return path;
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
            <Link to={getPath("/home")} className={styles.navItem}>
              Home
            </Link>
          </li>

          {isUserLoggedIn && (
            <>
              <li>
                <Link to={getPath("/profile")} className={styles.navItem}>
                  Profile
                </Link>
              </li>
              <li>
                <Link onClick={handleBookingClick} className={styles.navItem}>
                  Appointment
                </Link>
              </li>
            </>
          )}

          {isDocLoggedIn && (
            <>
              <li>
                <Link to={getPath("/profile")} className={styles.navItem}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to={getPath("/schedule")} className={styles.navItem}>
                  Schedule
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to={getPath("/about")} className={styles.navItem}>
              About Us
            </Link>
          </li>

          {isUserLoggedIn || isDocLoggedIn ? (
            <li>
              <Link onClick={handleLogout} className={styles.navItem}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register" className={styles.navItem}>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className={styles.navItem}>
                  Login
                </Link>
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
