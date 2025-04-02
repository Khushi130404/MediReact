import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showDoctor } from "../services/DoctorService";
import { predictSpecialist } from "../services/ModelService";

const symptomsList = [
  "chest pain",
  "palpitations",
  "high blood pressure",
  "sweating",
  "shortness of breath",
  "acne",
  "rash",
  "itching",
  "eczema",
  "red spots",
  "joint pain",
  "back pain",
  "bone fracture",
  "muscle stiffness",
  "limited movement",
  "fever",
  "cough",
  "nausea",
  "vomiting",
  "runny nose",
  "headache",
  "dizziness",
  "memory loss",
  "seizures",
  "numbness",
  "abdominal pain",
  "internal bleeding",
  "hernia",
  "post-surgery pain",
  "infection",
  "menopause symptoms",
  "painful periods",
  "irregular periods",
  "heavy bleeding",
  "pregnancy symptoms",
  "anxiety",
  "depression",
  "hallucinations",
  "suicidal thoughts",
  "mood swings",
  "ear pain",
  "ear discharge",
  "sinus pain",
  "hoarseness",
  "hearing loss",
];

const SymptomSelector = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomClass, setSymptomClass] = useState({});
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleSymptomClick = (symptom) => {
    setSelectedSymptoms((prev) => {
      const updatedSelection = [...prev];
      if (updatedSelection.includes(symptom)) {
        updatedSelection.splice(updatedSelection.indexOf(symptom), 1);
      } else {
        updatedSelection.push(symptom);
      }
      return updatedSelection;
    });
  };

  const generateSymptomClass = () => {
    let classArray = [];
    symptomsList.forEach((symptom) => {
      classArray.push(selectedSymptoms.includes(symptom) ? 1 : 0);
    });
    setSymptomClass(classArray);
    return classArray;
  };

  const handleSubmit = async () => {
    const symptomClassArray = generateSymptomClass();
    const specialist = await predictSpecialist(symptomClassArray);
    setResult(`You should consult a specialist in: ${specialist}`);
  };

  return (
    <div>
      <h2>Select Symptoms</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {symptomsList.map((symptom, index) => (
          <button
            key={index}
            onClick={() => handleSymptomClick(symptom)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedSymptoms.includes(symptom)
                ? "lightgreen"
                : "lightgray",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {symptom}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Result</h3>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default SymptomSelector;
