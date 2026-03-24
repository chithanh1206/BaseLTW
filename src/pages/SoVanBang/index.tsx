import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputNumber } from 'antd';
import { getData, setData } from '@/utils/storage';

export default () => {
  const [data, setList] = useState(getData('sovanbang'));
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const submit = (values: any) => {
    const list = [
      ...data,
      { id: Date.now(), nam: values.nam, soHienTai: 0 }
    ];

    setList(list);
    setData('sovanbang', list);
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Thêm</Button>

      <Table rowKey="id" dataSource={data} columns={[
        { title: 'Năm', dataIndex: 'nam' },
        { title: 'Số hiện tại', dataIndex: 'soHienTai' }
      ]} />

      <Modal open={open} onOk={() => form.submit()} onCancel={() => setOpen(false)}>
        <Form form={form} onFinish={submit}>
          <Form.Item name="nam" label="Năm" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};