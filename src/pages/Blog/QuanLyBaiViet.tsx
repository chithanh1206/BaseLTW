import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, Space } from 'antd';
import { getPosts, savePosts, getTags } from './data';

export default () => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setData(getPosts());
  }, []);

  const reload = () => setData(getPosts());

  const handleSave = (values: any) => {
    let list = getPosts();

    if (editing) {
      list = list.map(item =>
        item.id === editing.id ? { ...item, ...values } : item
      );
    } else {
      list.push({
        ...values,
        id: Date.now().toString(),
        views: 0,
        createdAt: new Date().toLocaleDateString(),
      });
    }

    savePosts(list);
    reload();
    setVisible(false);
    form.resetFields();
    setEditing(null);
  };

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title' },
    { title: 'Trạng thái', dataIndex: 'status' },
    {
      title: 'Tag',
      render: (_: any, record: any) => record.tags?.join(', ')
    },
    { title: 'Views', dataIndex: 'views' },
    { title: 'Ngày', dataIndex: 'createdAt' },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space>
          <Button onClick={() => {
            setEditing(record);
            form.setFieldsValue(record);
            setVisible(true);
          }}>Sửa</Button>

          <Popconfirm title="Xóa?" onConfirm={() => {
            savePosts(getPosts().filter(p => p.id !== record.id));
            reload();
          }}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm bài viết
      </Button>

      <Table rowKey="id" dataSource={data} columns={columns} />

      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item name="title" label="Tiêu đề"><Input /></Form.Item>
          <Form.Item name="slug" label="Slug"><Input /></Form.Item>
          <Form.Item name="summary" label="Tóm tắt"><Input /></Form.Item>
          <Form.Item name="thumbnail" label="Ảnh"><Input /></Form.Item>
          <Form.Item name="content" label="Nội dung">
            <Input.TextArea rows={6} />
          </Form.Item>

          <Form.Item name="tags" label="Tags">
            <Select mode="multiple">
              {getTags().map(tag => (
                <Select.Option key={tag.id} value={tag.name}>
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Select>
              <Select.Option value="draft">Nháp</Select.Option>
              <Select.Option value="published">Đã đăng</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};