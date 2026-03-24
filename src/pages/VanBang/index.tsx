import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { getData, setData } from '@/utils/storage';

export default () => {
  const [data, setList] = useState(getData('vanbang') || []);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const submit = (values: any) => {
    const soVanBang = getData('sovanbang') || [];

    if (!soVanBang.length) {
      message.error("Chưa có sổ văn bằng!");
      return;
    }

    const so = soVanBang[0];

    const newSo = (so.soHienTai || 0) + 1;
    so.soHienTai = newSo;

    const newData = {
      id: Date.now(),
      soVaoSo: newSo,
      ...values,
    };

    const list = [...data, newData];

    setList(list);
    setData('vanbang', list);
    setData('sovanbang', [so]);

    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Thêm</Button>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: 'Số vào sổ', dataIndex: 'soVaoSo' },
          { title: 'MSV', dataIndex: 'msv' },
          { title: 'Họ tên', dataIndex: 'hoTen' }
        ]}
      />

      <Modal
        open={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} onFinish={submit}>
          <Form.Item
            name="msv"
            label="MSV"
            rules={[{ required: true, message: 'Nhập MSV' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="hoTen"
            label="Họ tên"
            rules={[{ required: true, message: 'Nhập họ tên' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};