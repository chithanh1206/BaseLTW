// @ts-nocheck
import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Switch } from "antd";
import { getData, setData } from "@/utils/storage";
import { history } from "umi";

export default function CauLacBo() {
  const [data, setList] = useState(getData("clb"));
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [form] = Form.useForm();

  const filtered = data.filter((i: any) =>
    String(i.ten || "").toLowerCase().includes(keyword.toLowerCase())
  );

  const handleSubmit = async () => {
    const values = await form.validateFields();

    let newData;

    if (editing) {
      newData = data.map((i: any) =>
        i.id === editing.id ? { ...i, ...values } : i
      );
    } else {
      newData = [...data, { id: Date.now(), ...values }];
    }

    setList(newData);
    setData("clb", newData);
    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  return (
    <>
      <Input
        placeholder="Tìm kiếm CLB"
        onChange={(e) => setKeyword(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm CLB
      </Button>

      <Table
        rowKey="id"
        dataSource={filtered}
        columns={[
          { title: "Tên CLB", dataIndex: "ten" },
          { title: "Chủ nhiệm", dataIndex: "chuNhiem" },
          {
            title: "Hoạt động",
            render: (_: any, r: any) => (r.hoatDong ? "Có" : "Không"),
          },
          {
            title: "Thao tác",
            render: (_: any, r: any) => (
              <>
                <Button
                  onClick={() => {
                    setEditing(r);
                    form.setFieldsValue(r);
                    setOpen(true);
                  }}
                >
                  Sửa
                </Button>

                <Button
                  danger
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    const newData = data.filter((i: any) => i.id !== r.id);
                    setList(newData);
                    setData("clb", newData);
                  }}
                >
                  Xóa
                </Button>

                <Button
                  style={{ marginLeft: 8 }}
                  onClick={() =>
                    history.push(`/thanh-vien?clbId=${r.id}`)
                  }
                >
                  Thành viên
                </Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        visible={open}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="ten"
            label="Tên CLB"
            rules={[{ required: true, message: "Nhập tên CLB" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="chuNhiem" label="Chủ nhiệm">
            <Input />
          </Form.Item>

          <Form.Item name="hoatDong" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}