import { useEffect, useState } from "react";
import axios from "axios";

export default function Task() {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      if (
        !title ||
        !assignedTo ||
        !priority ||
        !dueDate
      ) {
        alert("Fill all fields");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/tasks/create",
        {
          title,
          assignedTo,
          priority,
          dueDate
        }
      );

      alert("Task Created");

      setTitle("");
      setAssignedTo("");
      setPriority("");
      setDueDate("");

      loadTasks();
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
        Create Tasks
      </h1>

      <br />

      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
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
        placeholder="Priority"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        style={input}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
        style={input}
      />

      <button
        style={btn}
        onClick={createTask}
      >
        Create Task
      </button>

      <br />
      <br />

      <h2>All Tasks</h2>

      {tasks.map((t) => (
        <div
          key={t._id}
          style={card}
        >
          <h3>{t.title}</h3>

          <p>
            <b>Assigned To:</b>{" "}
            {t.assignedTo}
          </p>

          <p>
            <b>Priority:</b>{" "}
            {t.priority}
          </p>

          <p>
            <b>Deadline:</b>{" "}
            {t.dueDate}
          </p>

          <p>
            <b>Status:</b>{" "}
            {t.status || "Pending"}
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