import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentProjects() {
  let user = {};

  try {
    user =
      JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const [projects, setProjects] = useState([]);
  const [links, setLinks] = useState({});

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      const mine = res.data.filter(
        (p) => p.assignedTo === user.email
      );

      setProjects(mine);
    } catch (error) {
      console.log(error);
    }
  };

  const submitProject = async (id) => {
    try {
      if (!links[id]) {
        alert("Please enter submission link");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/projects/submit/${id}`,
        {
          submission: links[id]
        }
      );

      alert("Project Submitted");
      loadProjects();
    } catch (error) {
      console.log(error);
      alert("Submission Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px"
      }}
    >
      <h1 style={{ fontSize: "50px" }}>
        My Projects
      </h1>

      <br />

      {projects.length === 0 && (
        <p>No Projects Assigned</p>
      )}

      {projects.map((p) => (
        <div
          key={p._id}
          style={card}
        >
          <h2>{p.title}</h2>

          <p>
            <b>Description:</b>{" "}
            {p.description}
          </p>

          <p>
            <b>Deadline:</b>{" "}
            {p.deadline || p.dueDate}
          </p>

          <p>
            <b>Status:</b>{" "}
            {p.status || "Pending"}
          </p>

          {p.status === "Submitted" ? (
            <p style={{ color: "#22c55e" }}>
              Submitted ✔
            </p>
          ) : (
            <>
              <input
                placeholder="Paste Drive / GitHub Link"
                value={links[p._id] || ""}
                onChange={(e) =>
                  setLinks({
                    ...links,
                    [p._id]: e.target.value
                  })
                }
                style={input}
              />

              <button
                style={btn}
                onClick={() =>
                  submitProject(p._id)
                }
              >
                Submit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px"
};

const input = {
  width: "70%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  marginRight: "10px"
};

const btn = {
  padding: "10px 18px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};