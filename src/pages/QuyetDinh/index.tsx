import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import { getData, setData } from '@/utils/storage';

export default () => {
  const [data, setList] = useState(getData('fields'));
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const submit = (values: any) => {
    const list = [...data, { id: Date.now(), ...values }];
    setList(list);
    setData('fields', list);
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Thêm</Button>

      <Table rowKey="id" dataSource={data} columns={[
        { title: 'Tên', dataIndex: 'tenTruong' },
        { title: 'Kiểu', dataIndex: 'kieuDuLieu' }
      ]} />

      <Modal open={open} onOk={() => form.submit()} onCancel={() => setOpen(false)}>
        <Form form={form} onFinish={submit}>
          <Form.Item name="tenTruong" label="Tên"><Input /></Form.Item>
          <Form.Item name="kieuDuLieu" label="Kiểu">
            <Select>
              <Select.Option value="string">String</Select.Option>
              <Select.Option value="number">Number</Select.Option>
              <Select.Option value="date">Date</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};