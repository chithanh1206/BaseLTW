import { Card, Button, Tag } from "antd";
import { Task } from "./types";

const BangKanban = ({
  tasks,
  setTasks
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const changeStatus = (id: string, status: Task["status"]) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status } : t)));
  };

  const mau = (p: string) =>
    p === "high" ? "red" : p === "medium" ? "orange" : "green";

  const cot = (key: Task["status"], title: string) => (
    <div style={{ width: 300 }}>
      <h3>{title}</h3>
      {tasks.filter(t => t.status === key).map(t => (
        <Card key={t.id} style={{ marginBottom: 10 }}>
          <b>{t.name}</b>
          <div>{t.description}</div>
          <Tag color={mau(t.priority)}>{t.priority}</Tag>
          {t.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}

          <div style={{ marginTop: 10 }}>
            <Button size="small" onClick={() => changeStatus(t.id, "todo")}>Cần làm</Button>
            <Button size="small" onClick={() => changeStatus(t.id, "inprogress")}>Đang làm</Button>
            <Button size="small" onClick={() => changeStatus(t.id, "done")}>Xong</Button>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
      {cot("todo", "Cần làm")}
      {cot("inprogress", "Đang làm")}
      {cot("done", "Hoàn thành")}
    </div>
  );
};

export default BangKanban;