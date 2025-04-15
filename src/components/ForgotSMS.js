import React, { useState, useEffect } from "react";
import styles from "./ForgotSMS.module.css";
import { sendSMS } from "../services/SmsService";
import { findUserBySMS } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ForgotSMS = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stage, setStage] = useState("input");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (stage === "otp" && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [stage, timer]);

  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  const handleSendOtp = async () => {
    try {
      const foundUser = await findUserBySMS(phoneNumber);
      if (!foundUser) {
        setMessage({ text: "User doesn't exist.", type: "error" });
        return;
      }

      const otpToSend = generateOtp();
      setGeneratedOtp(otpToSend);
      setTimer(120);
      setStage("otp");
      setOtp("");
      setMessage({ text: "", type: "success" });
      setUser(foundUser);

      const esmsDto = {
        to: phoneNumber,
        subject: "Medicure - OTP Verification",
        text: `Your OTP is ${otpToSend}. It is valid for 2 minutes.`,
      };

      await sendSMS(esmsDto);
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        text: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  const handleVerifyOtp = () => {
    if (timer <= 0) {
      setMessage({
        text: "OTP has expired. Please request a new one.",
        type: "error",
      });
    } else if (otp !== generatedOtp) {
      setMessage({
        text: "The OTP you entered is incorrect. Please try again.",
        type: "error",
      });
    } else {
      localStorage.setItem("logged_user", JSON.stringify(user));
      setStage("success");
      setMessage({
        text: "OTP verified successfully! Redirecting...",
        type: "success",
      });

      setTimeout(() => navigate("/user/home"), 2000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Navbar />
      <div className={styles.containerOuter}>
        <div className={styles.container}>
          <h1 className={styles.heading}>SMS OTP Verification</h1>

          {stage === "input" && (
            <>
              <p className={styles.description}>
                Enter your phone number to receive an OTP via SMS.
              </p>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={styles.input}
              />
              <button
                onClick={handleSendOtp}
                disabled={!phoneNumber}
                className={styles.button}
              >
                Send OTP
              </button>
            </>
          )}

          {stage === "otp" && (
            <>
              <p className={styles.description}>
                Time left: <strong>{formatTime(timer)}</strong>
                <br />
                Enter the OTP sent to your phone via SMS.
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
              <button onClick={handleSendOtp} className={styles.retryButton}>
                Resend OTP
              </button>
            </>
          )}

          {stage === "success" && (
            <p className={styles.success}>OTP verified successfully!</p>
          )}

          {message.text && (
            <div
              className={`${styles.messagePopup} ${
                message.type === "error" ? styles.error : styles.successMsg
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotSMS;
