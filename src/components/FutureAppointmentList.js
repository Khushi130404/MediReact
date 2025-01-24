import { useEffect, useState } from "react";
import { getAppointment } from "../services/AppointmentService";
import FutureAppointment from "./FutureAppointment";

const FutureAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const allAppointments = await getAppointment();
        const today = new Date();

        const futureAppointments = allAppointments.filter((appointment) => {
          const appointmentDate = parseDate(appointment.date);

          return (
            appointment.userId === loggedUser.userId &&
            appointmentDate &&
            appointmentDate > today
          );
        });

        setAppointments(futureAppointments);
        console.log(futureAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [loggedUser.userId]);

  return (
    <div>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <FutureAppointment
            key={appointment.appId}
            appointment={appointment}
          />
        ))
      ) : (
        <p>No future appointments found.</p>
      )}
    </div>
  );
};

export default FutureAppointmentList;
