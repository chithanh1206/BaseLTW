import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { getData, setData } from '@/utils/storage';

export default () => {
  const [data, setList] = useState(getData('vanbang'));
  const soVanBang = getData('sovanbang');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const submit = (values:any)=>{
    const so = soVanBang[0];
    if(!so) return;

    const newSo = so.soHienTai + 1;
    so.soHienTai = newSo;

    const newData = {
      id: Date.now(),
      soVaoSo: newSo,
      ...values
    };

    const list = [...data, newData];
    setList(list);

    setData('vanbang', list);
    setData('sovanbang', [so]);

    setOpen(false);
  };

  return (
    <>
      <Button onClick={()=>setOpen(true)}>Thêm</Button>

      <Table rowKey="id" dataSource={data} columns={[
        {title:'Số vào sổ', dataIndex:'soVaoSo'},
        {title:'MSV', dataIndex:'msv'},
        {title:'Họ tên', dataIndex:'hoTen'}
      ]}/>

      <Modal open={open} onOk={()=>form.submit()} onCancel={()=>setOpen(false)}>
        <Form form={form} onFinish={submit}>
          <Form.Item name="msv" label="MSV"><Input/></Form.Item>
          <Form.Item name="hoTen" label="Họ tên"><Input/></Form.Item>
        </Form>
      </Modal>
    </>
  );
};