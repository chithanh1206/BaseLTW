import { Table, Button, Tag } from "antd";
import { Task } from "./types";

const BangTask = ({
  tasks,
  setEditing,
  deleteTask
}: {
  tasks: Task[];
  setEditing: (t: Task) => void;
  deleteTask: (id: string) => void;
}) => {
  const columns = [
    { title: "Tên", dataIndex: "name" },
    { title: "Deadline", dataIndex: "deadline" },
    {
      title: "Ưu tiên",
      render: (_: any, r: Task) => (
        <Tag color={r.priority === "high" ? "red" : r.priority === "medium" ? "orange" : "green"}>
          {r.priority}
        </Tag>
      )
    },
    {
      title: "Hành động",
      render: (_: any, r: Task) => (
        <>
          <Button onClick={() => setEditing(r)}>Sửa</Button>
          <Button danger onClick={() => deleteTask(r.id)}>Xóa</Button>
        </>
      )
    }
  ];

  return <Table dataSource={tasks} columns={columns} rowKey="id" />;
};

export default BangTask;