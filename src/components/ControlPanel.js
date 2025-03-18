import React, { useState, useEffect } from "react";
import { showDoctor } from "../services/DoctorService";

const ControlPanel = ({ doctor }) => {
  const [doctorInfoList, setDoctorInfoList] = useState({});

  const fetchDoctorInfo = async () => {
    try {
      const response = await showDoctor();
      setDoctorInfoList(response);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, []);

  return (
    <>
      <h3>Doctor Info</h3>
      <div>
        {doctorInfoList.map((doc) => (
          <div key={doc.doctorId}>
            <h4>{doc.doctorName}</h4>
            <p>{doc.doctorEmail}</p>
            <p>{doc.doctorPhone}</p>
            <p>{doc.doctorSpecialization}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ControlPanel;
