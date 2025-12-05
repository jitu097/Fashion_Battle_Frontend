// frontend/src/pages/Auth/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../../api/axiosConfig";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Step 1 fields
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2 fields
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  // OTP (commented out)
  // const [otp, setOtp] = useState("");
  // const [otpSent, setOtpSent] = useState(false);
  // const [otpVerified, setOtpVerified] = useState(false);
  // const [sendingOtp, setSendingOtp] = useState(false);

  const [loading, setLoading] = useState(false);

  const normalizePhone = (value) => value?.toString().replace(/\s+/g, "").trim();

  // const handleSendOtp = async () => {
  //   const payloadPhone = normalizePhone(phone);
  //
  //   if (!payloadPhone) return alert("Please enter phone number");
  //   if (!password || !confirmPassword) return alert("Please enter a password");
  //   if (password !== confirmPassword) return alert("Passwords do not match");
  //   if (password.length < 6) return alert("Password must be min 6 chars");
  //
  //   try {
  //     setSendingOtp(true);
  //     const res = await API.post("/auth/send-otp", { phone: payloadPhone });
  //     setOtpSent(true);
  //     alert(res.data.message || "OTP sent successfully");
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Failed to send OTP");
  //   } finally {
  //     setSendingOtp(false);
  //   }
  // };

  // const handleVerifyOtp = async () => {
  //   try {
  //     const res = await API.post("/auth/verify-otp", {
  //       phone: normalizePhone(phone),
  //       otp,
  //     });
  //
  //     if (res.data.success) {
  //       setOtpVerified(true);
  //       setStep(2);
  //     }
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Invalid or expired OTP");
  //   }
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username) return alert("Username required");
    if (!name) return alert("Name required");
    if (!gender) return alert("Select gender");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("phone", normalizePhone(phone));
      formData.append("password", password);
      formData.append("username", username);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("gender", gender);
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);

      const res = await API.post("/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAuthToken(res.data.token);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-root">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Create your account</h1>

          <form className="auth-form" onSubmit={handleSignup}>

            {step === 1 && (
              <>
                <div className="auth-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="auth-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <label>Password</label>
                  <input
                    type="password"
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="auth-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="auth-button primary"
                  disabled={
                    !phone ||
                    !password ||
                    !confirmPassword ||
                    password.length < 6 ||
                    password !== confirmPassword
                  }
                  onClick={() => setStep(2)}
                >
                  Continue
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="auth-field">
                  <label>Username</label>
                  <input
                    className="auth-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <label>Full Name</label>
                  <input
                    className="auth-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <label>Email (optional)</label>
                  <input
                    className="auth-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <label>Gender</label>
                  <select
                    className="auth-input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="auth-field">
                  <label>Profile Photo (optional)</label>
                  <input
                    className="auth-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                  />
                </div>

                <button type="submit" className="auth-button primary">
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </>
            )}

            <div className="auth-footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
