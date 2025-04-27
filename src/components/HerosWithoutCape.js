import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HerosWithoutCape.module.css";

const HerosWithoutCape = () => {
  const navigate = useNavigate();

  const logged_admin = localStorage.getItem("logged_admin");
  const logged_user = localStorage.getItem("logged_user");
  const logged_doctor = localStorage.getItem("logged_doctor");

  const handleMoreAboutUs = () => {
    if (logged_admin) {
      navigate("/admin/about");
    } else if (logged_user) {
      navigate("/user/about");
    } else if (logged_doctor) {
      navigate("/doctor/about");
    } else {
      navigate("/about"); // Fallback for non-logged-in users
    }
  };

  return (
    <div className={styles.about}>
      <div className={styles.content2}>
        {/* Image Section */}
        <div className={styles.img}>
          <div className={styles.image}>
            <img
              src="/image/heroes.jpg"
              alt="All Heroes Wear Capes"
              className={styles.allHeroesWear}
            />
          </div>
        </div>

        {/* Text Section */}
        <div className={styles.text}>
          <div className={styles.title}>
            <p className={styles.p}>
              We have the best doctors in the city to look after your health.
            </p>
            <p className={styles.textWrapper5}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea ut
              eum aliquid nemo ab adipisci debitis repellendus ducimus voluptas
              quae?
            </p>
            <p className={styles.textWrapper6}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, corrupti? Accusantium repellat ut magni quod
              dolorem, aliquid explicabo iusto deserunt dignissimos culpa
              impedit porro ullam ea odio vitae eligendi in!
            </p>
            <button className={styles.button} onClick={handleMoreAboutUs}>
              <div className={styles.getStartedNow}>More About Us</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerosWithoutCape;
