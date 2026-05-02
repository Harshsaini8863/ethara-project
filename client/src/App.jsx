import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Task from "./pages/task";
import Projects from "./pages/projects";
import StudentTasks from "./pages/studenttasks";
import StudentProjects from "./pages/studentprojects";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/tasks" element={<Task />} />
        <Route path="/projects" element={<Projects />} />

        <Route path="/studenttasks" element={<StudentTasks />} />
        <Route path="/studentprojects" element={<StudentProjects />} />
      </Routes>
    </BrowserRouter>
  );
}