import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showDoctor } from "../services/DoctorService";
import { predictSpecialist } from "../services/ModelService";
import styles from "./SymptomSelector.module.css"; // Import CSS module

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
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleSymptomClick = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const generateSymptomClass = () =>
    symptomsList.map((symptom) => (selectedSymptoms.includes(symptom) ? 1 : 0));

  const handleSubmit = async () => {
    const symptomClassArray = generateSymptomClass();
    const specialist = await predictSpecialist(symptomClassArray);
    setResult(`You should consult a specialist in: ${specialist}`);
  };

  return (
    <div>
      <div className={styles.container}>
        <h2>Select Symptoms</h2>
        <div className={styles.symptomGrid}>
          {symptomsList.map((symptom, index) => (
            <button
              key={index}
              onClick={() => handleSymptomClick(symptom)}
              className={`${styles.symptomButton} ${
                selectedSymptoms.includes(symptom) ? styles.selected : ""
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>

        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>

        <div className={styles.result}>
          <h3>Result</h3>
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
};

export default SymptomSelector;
