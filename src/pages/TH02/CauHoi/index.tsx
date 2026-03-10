import { Button, Card, Form, Input, Select, Table } from 'antd';
import React, { useState } from 'react';

export default function CauHoi(){

  const [form] = Form.useForm();

  const [ds, setDs] = useState<any[]>([]);
  const [tim, setTim] = useState('');
  const [locMucDo, setLocMucDo] = useState('');

  const themCauHoi = (values:any)=>{

    let item = {
      key: ds.length + 1,
      ma: values.ma,
      mon: values.mon,
      noiDung: values.noiDung,
      mucDo: values.mucDo,
      khoi: values.khoi
    }

    let data = [...ds];
    data.push(item);

    setDs(data);

    form.resetFields();
  }

  const xoa = (key:any)=>{

    let data = ds.filter(item => item.key != key);

    setDs(data);

  }

  const cot = [
    {title:'Mã câu hỏi', dataIndex:'ma'},
    {title:'Môn học', dataIndex:'mon'},
    {title:'Nội dung', dataIndex:'noiDung'},
    {title:'Mức độ', dataIndex:'mucDo'},
    {title:'Khối kiến thức', dataIndex:'khoi'},
    {
      title:'Xóa',
      render:(record:any)=>{
        return(
          <Button danger onClick={()=>xoa(record.key)}>
            Xóa
          </Button>
        )
      }
    }
  ]

  let dataHienThi = ds;

  if(tim != ''){
    dataHienThi = dataHienThi.filter(item =>
      item.mon.toLowerCase().includes(tim.toLowerCase())
    )
  }

  if(locMucDo != ''){
    dataHienThi = dataHienThi.filter(item =>
      item.mucDo == locMucDo
    )
  }

  return(

    <Card title="Quản lý câu hỏi">

      <Form
        form={form}
        layout="vertical"
        onFinish={themCauHoi}
      >

        <Form.Item name="ma" label="Mã câu hỏi">
          <Input />
        </Form.Item>

        <Form.Item name="mon" label="Môn học">
          <Input />
        </Form.Item>

        <Form.Item name="noiDung" label="Nội dung">
          <Input />
        </Form.Item>

        <Form.Item name="mucDo" label="Mức độ">
          <Select
            options={[
              {label:'Dễ',value:'Dễ'},
              {label:'Trung bình',value:'Trung bình'},
              {label:'Khó',value:'Khó'},
              {label:'Rất khó',value:'Rất khó'}
            ]}
          />
        </Form.Item>

        <Form.Item name="khoi" label="Khối kiến thức">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm câu hỏi
        </Button>

      </Form>

      <Input
        placeholder="Tìm theo môn học"
        style={{marginTop:20}}
        onChange={(e)=>setTim(e.target.value)}
      />

      <Select
        placeholder="Lọc theo mức độ"
        style={{width:200, marginTop:10}}
        onChange={(value)=>setLocMucDo(value)}
        options={[
          {label:'Dễ',value:'Dễ'},
          {label:'Trung bình',value:'Trung bình'},
          {label:'Khó',value:'Khó'},
          {label:'Rất khó',value:'Rất khó'}
        ]}
      />

      <Table
        columns={cot}
        dataSource={dataHienThi}
        style={{marginTop:20}}
      />

    </Card>

  )
}