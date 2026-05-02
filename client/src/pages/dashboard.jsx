import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const nav = useNavigate();

  let user = {};

  try {
    user =
      JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const [stats, setStats] = useState({
    tasks: 0,
    completed: 0,
    pending: 0,
    projects: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const taskRes = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      const projectRes = await axios.get(
        "http://localhost:5000/api/projects"
      );

      let tasks = taskRes.data;
      let projects = projectRes.data;

      // Student sees only own data
      if (user.role !== "admin") {
        tasks = tasks.filter(
          (t) => t.assignedTo === user.email
        );

        projects = projects.filter(
          (p) => p.assignedTo === user.email
        );
      }

      const completed = tasks.filter(
        (t) =>
          t.status === "Completed" ||
          t.status === "Submitted"
      ).length;

      const pending = tasks.length - completed;

      setStats({
        tasks: tasks.length,
        completed,
        pending,
        projects: projects.length
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  if (!user.email) {
    nav("/");
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <h1 style={{ fontSize: "50px" }}>
            Welcome {user.name}
          </h1>

          <h2 style={{ marginTop: "10px" }}>
            Role: {user.role}
          </h2>
        </div>

        <button
          style={btn}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <br />
      <br />

      {/* Role Based Buttons */}
      {user.role === "admin" ? (
        <div>
          <button
            style={btn}
            onClick={() => nav("/tasks")}
          >
            Create Tasks
          </button>

          <button
            style={btn}
            onClick={() => nav("/projects")}
          >
            Create Projects
          </button>
        </div>
      ) : (
        <div>
          <button
            style={btn}
            onClick={() => nav("/studenttasks")}
          >
            My Tasks
          </button>

          <button
            style={btn}
            onClick={() => nav("/studentprojects")}
          >
            My Projects
          </button>
        </div>
      )}

      <br />
      <br />

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px"
        }}
      >
        <div style={card}>
          <h2>Total Tasks</h2>
          <p>{stats.tasks}</p>
        </div>

        <div style={card}>
          <h2>Completed</h2>
          <p>{stats.completed}</p>
        </div>

        <div style={card}>
          <h2>Pending</h2>
          <p>{stats.pending}</p>
        </div>

        <div style={card}>
          <h2>Projects</h2>
          <p>{stats.projects}</p>
        </div>
      </div>
    </div>
  );
}

const btn = {
  padding: "12px 22px",
  marginRight: "12px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px"
};

const card = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center"
};