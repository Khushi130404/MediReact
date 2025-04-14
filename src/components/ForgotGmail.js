import React, { useState, useEffect } from "react";
import styles from "./ForgotGmail.module.css";
import { sendMail } from "../services/MailService";

const ForgotGmail = () => {
  const [username, setUsername] = useState("");
  const [stage, setStage] = useState("input");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    let countdown;
    if (stage === "otp" && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [stage, timer]);

  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSendOtp = async () => {
    const otpToSend = generateOtp();
    setGeneratedOtp(otpToSend);
    setTimer(120);
    setStage("otp");

    try {
      const emailDto = {
        to: user?.userMail,
        subject: "Medicure - OTP Verification",
        text: `Your OTP is ${otpToSend}. It is valid for 2 minutes.`,
      };
      await sendMail(emailDto);
      console.log("Email notification sent successfully!");
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp && timer > 0) {
      setStage("success");
    } else {
      alert("Invalid OTP or OTP expired");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Forgot Gmail</h1>

      {stage === "input" && (
        <>
          <p className={styles.description}>
            Please enter your username to receive an OTP.
          </p>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <button
            onClick={handleSendOtp}
            disabled={!username}
            className={styles.button}
          >
            Send OTP
          </button>
        </>
      )}

      {stage === "otp" && (
        <>
          <p className={styles.description}>
            Enter the OTP sent to your email. Time left:{" "}
            <strong>{formatTime(timer)}</strong>
          </p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.input}
          />
          <button
            onClick={handleVerifyOtp}
            disabled={!otp}
            className={styles.button}
          >
            Verify OTP
          </button>
          <p className={timer === 0 ? styles.expired : styles.timer}>
            {timer === 0 ? "OTP expired. Please try again." : ""}
          </p>
        </>
      )}

      {stage === "success" && (
        <p className={styles.success}>
          OTP verified successfully! You are now logged in.
        </p>
      )}
    </div>
  );
};

export default ForgotGmail;
