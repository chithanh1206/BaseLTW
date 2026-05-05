import { Form, Input, Button, Select, DatePicker } from "antd";
import { Task } from "./types";

const FormTask = ({
  tasks,
  setTasks,
  editing,
  setEditing
}: any) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newTask: Task = {
      id: editing ? editing.id : Date.now().toString(),
      name: values.name,
      description: values.description,
      deadline: values.deadline.format("YYYY-MM-DD"),
      priority: values.priority,
      status: editing ? editing.status : "todo",
      tags: values.tags || []
    };

    if (editing) {
      setTasks(tasks.map((t: Task) => (t.id === editing.id ? newTask : t)));
    } else {
      setTasks([...tasks, newTask]);
    }

    form.resetFields();
    setEditing(null);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="inline" style={{ marginTop: 20 }}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Tên task" />
      </Form.Item>

      <Form.Item name="description">
        <Input placeholder="Mô tả" />
      </Form.Item>

      <Form.Item name="deadline" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item name="priority">
        <Select style={{ width: 120 }}>
          <Select.Option value="high">Cao</Select.Option>
          <Select.Option value="medium">Trung bình</Select.Option>
          <Select.Option value="low">Thấp</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="tags">
        <Select mode="tags" style={{ width: 150 }} />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {editing ? "Cập nhật" : "Thêm"}
      </Button>
    </Form>
  );
};

export default FormTask;