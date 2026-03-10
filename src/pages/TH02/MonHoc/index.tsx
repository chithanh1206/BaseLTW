import { Button, Card, Form, Input, Table } from 'antd';
import React, { useState } from 'react';

export default function MonHoc(){

  const [form] = Form.useForm();
  const [ds, setDs] = useState<any[]>([]);

  const themMon = (values:any)=>{

    let item = {
      key: ds.length + 1,
      ma: values.ma,
      ten: values.ten,
      tinchi: values.tinchi
    }

    let data = [...ds];
    data.push(item);

    setDs(data);

    form.resetFields();

  }

  const cot = [
    {title:'Mã môn', dataIndex:'ma'},
    {title:'Tên môn', dataIndex:'ten'},
    {title:'Số tín chỉ', dataIndex:'tinchi'}
  ]

  return(

    <Card title="Quản lý môn học">

      <Form
        form={form}
        layout="vertical"
        onFinish={themMon}
      >

        <Form.Item name="ma" label="Mã môn">
          <Input />
        </Form.Item>

        <Form.Item name="ten" label="Tên môn">
          <Input />
        </Form.Item>

        <Form.Item name="tinchi" label="Số tín chỉ">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm môn học
        </Button>

      </Form>

      <Table
        columns={cot}
        dataSource={ds}
        style={{marginTop:30}}
      />

    </Card>

  )
}