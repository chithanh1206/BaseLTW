import { Card } from "antd";
import { Task } from "./types";

const TongQuan = ({ tasks }: { tasks: Task[] }) => {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  const overdue = tasks.filter(
    t => t.status !== "done" && new Date(t.deadline) < new Date()
  ).length;

  return (
    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
      <Card title="Tổng task">{total}</Card>
      <Card title="Hoàn thành">{done}</Card>
      <Card title="Quá hạn">{overdue}</Card>
    </div>
  );
};

export default TongQuan;