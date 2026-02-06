import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./auth.css";

const Signup = ({ switchToLogin }) => {
  const { signup } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handle = async () => {
    try {
      await signup(email, password);

      setMsg("Signup successful! Now login.");
      setError("");

      setTimeout(() => {
        switchToLogin();
      }, 1000);

    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="authContainer">
      <div className="authBox">
        <h2>Create Account</h2>

        {msg && <p className="successMsg">{msg}</p>}
        {error && <p className="errorMsg">{error}</p>}

        <input
          className="authInput"
          placeholder="Email address"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="authInput"
          placeholder="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="authBtn" onClick={handle}>
          Signup
        </button>

        <p className="switchText" onClick={switchToLogin}>
          Already have account? Login
        </p>
      </div>
    </div>
  );
};

export default Signup;
