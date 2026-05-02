import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const registerUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role
        }
      );

      alert("Registration Successful");
      nav("/");

    } catch (error) {
      console.log(error);
      alert("Registration Failed");
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
        width:"350px"
      }}>

        <h1 style={{color:"white"}}>
          Register
        </h1>

        <input
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          style={input}
        />

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          style={input}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={registerUser}
          style={btn}
        >
          Register
        </button>

        <p style={{color:"white"}}>
          Already have account?{" "}
          <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

const input = {
  width:"100%",
  padding:"10px",
  marginTop:"15px"
};

const btn = {
  width:"100%",
  padding:"10px",
  marginTop:"20px",
  background:"#3b82f6",
  color:"white",
  border:"none",
  borderRadius:"8px",
  cursor:"pointer"
};