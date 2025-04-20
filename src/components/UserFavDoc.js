import { useEffect, useState } from "react";
import { findFavDocByUserId } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import styles from "./UserFavDoc.module.css";

const UseFavDoc = () => {
  const navigate = useNavigate();
  const [favoriteDoctors, setFavoriteDoctors] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const [autoSlide, setAutoSlide] = useState(null);

  const nextSlide = () => {
    if (favoriteDoctors.length > 0) {
      setStartIndex((prevIndex) => (prevIndex + 1) % favoriteDoctors.length);
      resetAutoSlide();
    }
  };

  const prevSlide = () => {
    if (favoriteDoctors.length > 0) {
      setStartIndex(
        (prevIndex) =>
          (prevIndex - 1 + favoriteDoctors.length) % favoriteDoctors.length
      );
      resetAutoSlide();
    }
  };

  const handleNavigate = (path) => {
    navigate(`${path}`);
  };

  const resetAutoSlide = () => {
    if (autoSlide) clearInterval(autoSlide);
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % favoriteDoctors.length);
    }, 7000);
    setAutoSlide(interval);
  };

  useEffect(() => {
    const fetchFavoriteDoctors = async () => {
      try {
        const allDoctors = await findFavDocByUserId(loggedUser.userId);
        setFavoriteDoctors(allDoctors);
      } catch (error) {
        console.error("Error fetching favorite doctors:", error);
      }
    };

    fetchFavoriteDoctors();
  }, [loggedUser.userId]);

  useEffect(() => {
    if (favoriteDoctors.length > 1) {
      resetAutoSlide();
    }
    return () => {
      if (autoSlide) clearInterval(autoSlide);
    };
  }, [favoriteDoctors]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Trusted Doctors</h2>
      {favoriteDoctors.length > 0 ? (
        <div className={styles.doctorsWrapper}>
          <button
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.prevButton}`}
          >
            <img src="/image/prev.svg" alt="Previous" />
          </button>

          {[...Array(visibleCount)].map((_, i) => {
            const actualIndex = (startIndex + i) % favoriteDoctors.length;
            const doctor = favoriteDoctors[actualIndex];

            return (
              <div key={doctor.id} className={styles.doctorCard}>
                <p>
                  {actualIndex + 1} - {doctor}
                </p>
              </div>
            );
          })}

          <button
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.nextButton}`}
          >
            <img src="/image/next.svg" alt="Next" />
          </button>
        </div>
      ) : (
        <p className={styles.noDoctors}>No favorite doctors found.</p>
      )}
    </div>
  );
};

export default UseFavDoc;
