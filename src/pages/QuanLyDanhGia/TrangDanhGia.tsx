import { useState } from "react";
import { Card, Input, Button, Table, Rate, Space } from "antd";
import { lichHen, danhGia } from "@/services/data";

export default function TrangDanhGia() {

  const [ds, setDs] = useState(danhGia);
  const [id, setId] = useState(0);
  const [d, setD] = useState(5);
  const [ph, setPh] = useState("");

  const add = () => {
    const l = lichHen.find(x => x.id === id);

    if (!l || l.tt !== "xong") {
      alert("Chưa xong");
      return;
    }

    danhGia.push({ id: Date.now(), lichId: id, d, ph });
    setDs([...danhGia]);
  };

  return (
    <Card title="Đánh giá">

      <Space>
        <Input onChange={e=>setId(+e.target.value)} placeholder="ID lịch" />
        <Rate onChange={setD} />
        <Input onChange={e=>setPh(e.target.value)} placeholder="Phản hồi" />
        <Button type="primary" onClick={add}>Gửi</Button>
      </Space>

      <Table
        dataSource={ds}
        rowKey="id"
        style={{ marginTop: 20 }}
        columns={[
          { title: "Lịch", dataIndex: "lichId" },
          { title: "Điểm", render:(r:any)=><Rate disabled defaultValue={r.d}/> },
          { title: "Phản hồi", dataIndex: "ph" }
        ]}
      />

    </Card>
  );
}