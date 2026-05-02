import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async () => {
    try {
      if (
        !title ||
        !description ||
        !assignedTo ||
        !deadline
      ) {
        alert("Fill all fields");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/projects/create",
        {
          title,
          description,
          assignedTo,
          deadline
        }
      );

      alert("Project Created");

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setDeadline("");

      loadProjects();
    } catch (error) {
      console.log(error);
      alert("Failed");
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
        Create Projects
      </h1>

      <br />

      <input
        placeholder="Project Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        style={input}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        style={input}
      />

      <input
        placeholder="Assign To Email"
        value={assignedTo}
        onChange={(e) =>
          setAssignedTo(e.target.value)
        }
        style={input}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) =>
          setDeadline(e.target.value)
        }
        style={input}
      />

      <button
        style={btn}
        onClick={createProject}
      >
        Create Project
      </button>

      <br />
      <br />

      <h2>All Projects</h2>

      {projects.map((p) => (
        <div
          key={p._id}
          style={card}
        >
          <h3>{p.title}</h3>

          <p>
            <b>Description:</b>{" "}
            {p.description}
          </p>

          <p>
            <b>Assigned To:</b>{" "}
            {p.assignedTo}
          </p>

          <p>
            <b>Deadline:</b>{" "}
            {p.deadline}
          </p>

          <p>
            <b>Status:</b>{" "}
            {p.status || "Pending"}
          </p>
        </div>
      ))}
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none"
};

const btn = {
  padding: "12px 20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const card = {
  background: "#1e293b",
  padding: "18px",
  borderRadius: "10px",
  marginBottom: "12px"
};