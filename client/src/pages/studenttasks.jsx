import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentTasks() {
  let user = {};

  try {
    user =
      JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const [tasks, setTasks] = useState([]);
  const [links, setLinks] = useState({});

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      const mine = res.data.filter(
        (t) => t.assignedTo === user.email
      );

      setTasks(mine);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTask = async (id) => {
    try {
      if (!links[id]) {
        alert("Please enter submission link");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/tasks/submit/${id}`,
        {
          submission: links[id]
        }
      );

      alert("Task Submitted");
      loadTasks();
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
        My Tasks
      </h1>

      <br />

      {tasks.length === 0 && (
        <p>No Tasks Assigned</p>
      )}

      {tasks.map((t) => (
        <div
          key={t._id}
          style={card}
        >
          <h2>{t.title}</h2>

          <p>
            <b>Priority:</b>{" "}
            {t.priority || "Normal"}
          </p>

          <p>
            <b>Deadline:</b>{" "}
            {t.dueDate || t.deadline}
          </p>

          <p>
            <b>Status:</b>{" "}
            {t.status || "Pending"}
          </p>

          {t.status === "Submitted" ? (
            <p style={{ color: "#22c55e" }}>
              Submitted ✔
            </p>
          ) : (
            <>
              <input
                placeholder="Paste Drive / GitHub Link"
                value={links[t._id] || ""}
                onChange={(e) =>
                  setLinks({
                    ...links,
                    [t._id]: e.target.value
                  })
                }
                style={input}
              />

              <button
                style={btn}
                onClick={() =>
                  submitTask(t._id)
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