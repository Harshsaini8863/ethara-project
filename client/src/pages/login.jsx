import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      if (res.data.token) {
        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("Login Successful");

        nav("/dashboard");
      } else {
        alert(res.data.message || "Login Failed");
      }

    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  return (
    <div style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#0f172a"
    }}>

      <div style={{
        background:"#1e293b",
        padding:"40px",
        borderRadius:"15px",
        width:"380px"
      }}>

        <h1 style={{
          color:"white",
          textAlign:"center"
        }}>
          Login
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={input}
        />

        <button
          onClick={loginUser}
          style={btn}
        >
          Login
        </button>

        <p style={{
          color:"white",
          textAlign:"center"
        }}>
          No account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

const input = {
  width:"100%",
  padding:"12px",
  marginTop:"15px"
};

const btn = {
  width:"100%",
  padding:"12px",
  marginTop:"20px",
  background:"#3b82f6",
  color:"white",
  border:"none",
  borderRadius:"8px",
  cursor:"pointer"
};