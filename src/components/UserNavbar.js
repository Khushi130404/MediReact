import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UserNavbar.module.css";
import DocList from "./DocList";

const UserNavbar = () => {
  const [showDocList, setShowDocList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
    setIsLoggedIn(!!loggedUser);
  }, []);

  const handleBookingClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShowDocList(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("logged_user");
    setIsLoggedIn(false);
    navigate("/home");
  };

  const getPath = (path) => (isLoggedIn ? `/user${path}` : path);

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

          {isLoggedIn && (
            <>
              <li>
                <Link to={getPath("/profile")} className={styles.navItem}>
                  Profile
                </Link>
              </li>
              <li onClick={handleBookingClick}>
                <Link className={styles.navItem}>Appointment</Link>
              </li>
            </>
          )}
          <li>
            <Link to={getPath("/about")} className={styles.navItem}>
              About Us
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link onClick={handleLogout} className={styles.navItem}>
                Logout
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link to={getPath("/register")} className={styles.navItem}>
                  Register
                </Link>
              </li>
              <li>
                <Link to={getPath("/login")} className={styles.navItem}>
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

export default UserNavbar;
