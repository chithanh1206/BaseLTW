import { useState } from "react";
import { Card, Input, Button, Table, InputNumber, Space, message } from "antd";
import { nhanVien } from "@/services/data";

export default function TrangNhanVien() {
  const [ds, setDs] = useState<any[]>([...nhanVien]);

  const [ten, setTen] = useState("");
  const [max, setMax] = useState<number | null>(null);
  const [bd, setBd] = useState<number | null>(null);
  const [kt, setKt] = useState<number | null>(null);

  const [edit, setEdit] = useState<any>(null);

  const handleEdit = (r: any) => {
    setEdit(r);
    setTen(r.ten);
    setMax(r.max);
    setBd(r.bd);
    setKt(r.kt);
  };

  const resetForm = () => {
    setTen("");
    setMax(1);
    setBd(9);
    setKt(17);
    setEdit(null);
  };

  const save = () => {
    if (!ten || max === null || bd === null || kt === null) {
      message.error("Nhập đầy đủ dữ liệu");
      return;
    }

    if (bd >= kt) {
      message.error("Giờ bắt đầu phải nhỏ hơn giờ kết thúc");
      return;
    }

    if (edit) {
      edit.ten = ten;
      edit.max = max;
      edit.bd = bd;
      edit.kt = kt;
    } else {
      nhanVien.push({
        id: Date.now(),
        ten,
        max,
        bd,
        kt,
      });
    }

    setDs([...nhanVien]);
    resetForm();
  };

  const del = (id: number) => {
    const index = nhanVien.findIndex((x) => x.id === id);
    if (index !== -1) {
      nhanVien.splice(index, 1);
      setDs([...nhanVien]);
    }
  };

  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "ten",
    },
    {
      title: "Số khách tối đa/ngày",
      dataIndex: "max",
    },
    {
      title: "Giờ làm",
      render: (r: any) => `${r.bd}h - ${r.kt}h`,
    },
    {
      title: "Hành động",
      render: (_: any, r: any) => (
        <Space>
          <Button onClick={() => handleEdit(r)}>Sửa</Button>
          <Button danger onClick={() => del(r.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Quản lý nhân viên">
      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="Tên nhân viên"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          style={{ width: 200 }}
        />

        <InputNumber
          min={1}
          value={max}
          onChange={(v) => setMax(v ?? 1)}
          placeholder="Max/ngày"
        />

        <InputNumber
          min={0}
          max={23}
          value={bd}
          onChange={(v) => setBd(v ?? 0)}
          placeholder="Giờ bắt đầu"
        />

        <InputNumber
          min={0}
          max={23}
          value={kt}
          onChange={(v) => setKt(v ?? 0)}
          placeholder="Giờ kết thúc"
        />

        <Button type="primary" onClick={save}>
          {edit ? "Cập nhật" : "Thêm"}
        </Button>

        <Button onClick={resetForm}>Reset</Button>
      </Space>

      <Table dataSource={ds} columns={columns} rowKey="id" />
    </Card>
  );
}