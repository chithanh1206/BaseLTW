import { useState } from "react";
import { Card, Input, Button, Table, InputNumber, Space } from "antd";
import { dichVu } from "@/services/data";

export default function TrangDichVu() {

  const [ds, setDs] = useState(dichVu);
  const [ten, setTen] = useState("");
  const [gia, setGia] = useState(0);
  const [tg, setTg] = useState(30);

  const add = () => {
    dichVu.push({ id: Date.now(), ten, gia, tg });
    setDs([...dichVu]);
  };

  return (
    <Card title="Dịch vụ">
      <Space>
        <Input onChange={e=>setTen(e.target.value)} />
        <InputNumber onChange={(v:any)=>setGia(v)} />
        <InputNumber onChange={(v:any)=>setTg(v)} />
        <Button type="primary" onClick={add}>Thêm</Button>
      </Space>

      <Table dataSource={ds} rowKey="id" columns={[
        { title: "Tên", dataIndex: "ten" },
        { title: "Giá", dataIndex: "gia" },
        { title: "TG", dataIndex: "tg" }
      ]} style={{ marginTop: 20 }} />
    </Card>
  );
}