import { useState } from "react";
import { Card, Input, Button, Select, Table, Tag, Space } from "antd";
import { nhanVien, dichVu, lichHen } from "@/services/data";

export default function TrangLichHen() {

  const [ds, setDs] = useState(lichHen);
  const [ten, setTen] = useState("");
  const [nv, setNv] = useState<any>();
  const [dv, setDv] = useState<any>();
  const [gio, setGio] = useState(9);

  const add = () => {
    const d = dichVu.find(x => x.id === dv);
    const n = nhanVien.find(x => x.id === nv);

    const kt = gio + (d?.tg || 0)/60;

    if (gio < n?.bd || kt > n?.kt) {
      alert("Ngoài giờ");
      return;
    }

    const trung = lichHen.some(i =>
      i.nv === nv && (gio < i.kt && kt > i.bd)
    );

    if (trung) {
      alert("Trùng");
      return;
    }

    const sl = lichHen.filter(i => i.nv === nv).length;

    if (sl >= (n?.max || 0)) {
      alert("Full");
      return;
    }

    lichHen.push({
      id: Date.now(),
      ten,
      nv,
      dv,
      bd: gio,
      kt,
      tt: "cho"
    });

    setDs([...lichHen]);
  };

  const upd = (id:number, tt:string) => {
    lichHen.forEach(i => {
      if (i.id === id) i.tt = tt;
    });
    setDs([...lichHen]);
  };

  return (
    <Card title="Lịch hẹn">

      <Space>
        <Input placeholder="Tên" onChange={e=>setTen(e.target.value)} />

        <Select style={{ width: 120 }} onChange={setNv}>
          {nhanVien.map(i => <Select.Option value={i.id}>{i.ten}</Select.Option>)}
        </Select>

        <Select style={{ width: 120 }} onChange={setDv}>
          {dichVu.map(i => <Select.Option value={i.id}>{i.ten}</Select.Option>)}
        </Select>

        <Input type="number" onChange={e=>setGio(+e.target.value)} />

        <Button type="primary" onClick={add}>Đặt</Button>
      </Space>

      <Table
        dataSource={ds}
        rowKey="id"
        style={{ marginTop: 20 }}
        columns={[
          { title: "Khách", dataIndex: "ten" },
          { title: "Giờ", render:(r:any)=>`${r.bd}-${r.kt}` },
          { title: "TT", render:(r:any)=><Tag>{r.tt}</Tag> },
          {
            title: "Action",
            render:(r:any)=>(
              <Space>
                <Button onClick={()=>upd(r.id,"xac_nhan")}>Xác nhận</Button>
                <Button onClick={()=>upd(r.id,"xong")}>Xong</Button>
                <Button danger onClick={()=>upd(r.id,"huy")}>Hủy</Button>
              </Space>
            )
          }
        ]}
      />

    </Card>
  );
}