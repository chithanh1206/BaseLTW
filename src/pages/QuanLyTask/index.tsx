import React, { useEffect, useState } from "react";
import { Button } from "antd";
import TongQuan from "./TongQuan";
import BangKanban from "./BangKanBan";
import BangTask from "./BangTask";
import FormTask from "./FormTask";
import { Task } from "./types";

const QuanLyTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<"dashboard" | "kanban" | "table">("dashboard");
  const [editing, setEditing] = useState<Task | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>QUẢN LÝ TASK</h2>

      <Button onClick={() => setView("dashboard")}>Tổng quan</Button>
      <Button onClick={() => setView("kanban")}>Kanban</Button>
      <Button onClick={() => setView("table")}>Danh sách</Button>

      <FormTask
        tasks={tasks}
        setTasks={setTasks}
        editing={editing}
        setEditing={setEditing}
      />

      {view === "dashboard" && <TongQuan tasks={tasks} />}
      {view === "kanban" && <BangKanban tasks={tasks} setTasks={setTasks} />}
      {view === "table" && (
        <BangTask tasks={tasks} setEditing={setEditing} deleteTask={deleteTask} />
      )}
    </div>
  );
};

export default QuanLyTask;