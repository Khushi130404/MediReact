import React, { useState, useEffect } from "react";
import { showDoctor } from "../services/DoctorService";
import DocCard from "./DocCard";

const ControlPanel = () => {
  const [doctorInfoList, setDoctorInfoList] = useState([]);

  const fetchDoctorInfo = async () => {
    try {
      const response = await showDoctor();
      console.log("API Response:", response);

      if (Array.isArray(response)) {
        setDoctorInfoList(response); // ✅ Correct way to set state
      } else {
        console.error("Unexpected response format:", response);
        setDoctorInfoList([]); // Handle invalid data
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, []);

  useEffect(() => {
    console.log("Updated doctorInfoList:", doctorInfoList);
  }, [doctorInfoList]);

  return (
    <>
      <h3>Doctor Info</h3>
      <div>
        {doctorInfoList.length > 0 ? (
          doctorInfoList.map((doc, index) => (
            <DocCard key={index} doctor={doc} />
          ))
        ) : (
          <p>No doctors available.</p>
        )}
      </div>
    </>
  );
};

export default ControlPanel;
