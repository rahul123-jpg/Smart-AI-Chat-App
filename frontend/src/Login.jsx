import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./auth.css";
import Loader from "./Loader";

const Login = ({ switchToSignup }) => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);  

  const handle = async () => {
    try {
         setLoading(true); 
      await login(email, password);
    } catch (err) {
      setError("Invalid email or password");
    }finally{
         setLoading(false);
    }
  };

  return (
    <div className="authContainer">
      {loading && <Loader />}

      <div className="authBox">
        <h2>Welcome Back</h2>

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
          Login
        </button>

        <p className="switchText" onClick={switchToSignup}>
          Create new account
        </p>
      </div>
    </div>
  );
};

export default Login;
