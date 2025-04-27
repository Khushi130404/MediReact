import React from "react";
import styles from "./Menu.module.css";

const Menu = () => {
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doctor"));
  const loggedAdmin = JSON.parse(localStorage.getItem("logged_admin"));

  return (
    <div className={styles.menu}>
      <div className={styles.content3}>
        {/* Quick Access Title */}
        <div className={styles.title2}>
          <div className={styles.textWrapper9}>Quick Access Menu</div>
        </div>
        <div className={styles.card}>
          {/* Login Section */}
          <div className={styles.divWrapper}>
            <div className={styles.text2}>
              <div className={styles.icon}>
                <div className={styles.overlapGroup2}>
                  <div className={styles.ellipse}></div>
                  <img
                    className={styles.img2}
                    src="/image/login.svg"
                    alt="Login Icon"
                  />
                </div>
              </div>
              <div className={styles.text3}>
                <div className={styles.textWrapper7}>Login</div>
                <p className={styles.textWrapper8}>
                  Login Page for existing users
                  <br />
                  New users need to Register first.
                </p>
              </div>
              <div className={styles.buttonBase}>
                <div className={styles.pageLink}>Click Here to Login</div>
              </div>
            </div>
          </div>

          <div className={styles.divWrapper}>
            <div className={styles.text2}>
              <div className={styles.icon}>
                <div className={styles.overlapGroup2}>
                  <div className={styles.ellipse}></div>
                  <img
                    className={styles.addUserMale}
                    src="/image/addUser.svg"
                    alt="Register Icon"
                  />
                </div>
              </div>
              <div className={styles.text3}>
                <div className={styles.textWrapper7}>Register</div>
                <p className={styles.textWrapper8}>
                  New Users can register themselves here easily
                </p>
              </div>
              <div className={styles.buttonBase}>
                <button className={styles.pageLink}>
                  Click Here to Register
                </button>
              </div>
            </div>
          </div>

          <div className={styles.divWrapper}>
            <div className={styles.text2}>
              <div className={styles.icon}>
                <div className={styles.overlapGroup2}>
                  <div className={styles.ellipse}></div>
                  <img
                    className={styles.img2}
                    src="/image/access.svg"
                    alt="Profile Icon"
                  />
                </div>
              </div>
              <div className={styles.text3}>
                <div className={styles.textWrapper7}>Profile</div>
                <p className={styles.textWrapper8}>
                  Visit your profile, View &amp; edit your information.
                </p>
              </div>
              <div className={styles.buttonBase}>
                <button className={styles.pageLink}>Your Profile Page</button>
              </div>
            </div>
          </div>

          {loggedUser && (
            <div className={styles.divWrapper}>
              <div className={styles.text2}>
                <div className={styles.icon}>
                  <div className={styles.overlapGroup2}>
                    <div className={styles.ellipse}></div>
                    <img
                      className={styles.timesheet}
                      src="/image/schedule.svg"
                      alt="App"
                    />
                  </div>
                </div>
                <div className={styles.text3}>
                  <div className={styles.textWrapper7}>Appointment</div>
                  <p className={styles.textWrapper8}>
                    Not feeling well?&nbsp;&nbsp;Don’t worry, Book an
                    appointment now!
                  </p>
                </div>
                <div className={styles.buttonBase}>
                  <button className={styles.pageLink}>
                    Book An Appointment
                  </button>
                </div>
              </div>
            </div>
          )}
          {(loggedDoc || loggedAdmin) && (
            <div className={styles.divWrapper}>
              <div className={styles.text2}>
                <div className={styles.icon}>
                  <div className={styles.overlapGroup2}>
                    <div className={styles.ellipse}></div>
                    <img
                      className={styles.timesheet}
                      src="/image/schedule.svg"
                      alt="Appointment Icon"
                    />
                  </div>
                </div>
                <div className={styles.text3}>
                  <div className={styles.textWrapper7}>Schedule</div>
                  <p className={styles.textWrapper8}>
                    Not feeling well?&nbsp;&nbsp;Don’t worry, Book an
                    appointment now!
                  </p>
                </div>
                <div className={styles.buttonBase}>
                  <button className={styles.pageLink}>Doctor's Schedule</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
