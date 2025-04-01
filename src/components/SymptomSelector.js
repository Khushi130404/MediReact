import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showDoctor } from "../services/DoctorService";
import { predictSpecialist } from "../services/ModelService";

const symptomsList = [
  "abdominal pain",
  "acne",
  "agitation",
  "anxiety",
  "appendicitis",
  "arm pain",
  "back pain",
  "balance issues",
  "blue lips",
  "blurred vision",
  "bone fracture",
  "breast pain",
  "chest pain",
  "confusion",
  "cough",
  "crying",
  "depression",
  "diarrhea",
  "difficulty breathing",
  "difficulty swallowing",
  "discharge",
  "dizziness",
  "dry patches",
  "ear discharge",
  "ear pain",
  "ear ringing",
  "eczema",
  "fatigue",
  "fever",
  "flaky skin",
  "groin pain",
  "hair loss",
  "hallucinations",
  "headache",
  "hearing loss",
  "heartburn",
  "heavy bleeding",
  "hernia",
  "high blood pressure",
  "high fever",
  "hives",
  "hoarseness",
  "hot flashes",
  "infection",
  "insomnia",
  "internal bleeding",
  "irregular periods",
  "irritability",
  "itching",
  "joint pain",
  "knee pain",
  "leg swelling",
  "limited movement",
  "loss of appetite",
  "loss of interest",
  "low energy",
  "lumps",
  "memory loss",
  "menopause symptoms",
  "missed period",
  "mood swings",
  "morning sickness",
  "muscle cramps",
  "muscle stiffness",
  "nasal congestion",
  "nausea",
  "nipple discharge",
  "numb hands",
  "numbness",
  "oily skin",
  "pain",
  "painful periods",
  "palpitations",
  "panic attacks",
  "paranoia",
  "pelvic pain",
  "phobias",
  "pimples",
  "post-surgery pain",
  "pregnancy symptoms",
  "rapid heartbeat",
  "rash",
  "rashes",
  "red spots",
  "runny nose",
  "scalp rash",
  "seizures",
  "shortness of breath",
  "shoulder pain",
  "sinus pain",
  "skin dryness",
  "slow movements",
  "sore throat",
  "speech difficulty",
  "spinal pain",
  "stiff back",
  "stiffness",
  "stomach ache",
  "stomach pain",
  "suicidal thoughts",
  "sweating",
  "swelling",
  "swollen glands",
  "swollen joint",
  "swollen tonsils",
  "tonsillitis",
  "tremors",
  "vaginal itching",
  "vision problems",
  "vomiting",
  "weak limbs",
  "weakness",
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

    setResult(
      `You should consult a specialist in: ${setResult(
        `You should consult a specialist in: ${specialist}`
      )}`
    );
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
