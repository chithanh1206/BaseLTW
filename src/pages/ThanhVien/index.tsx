import React, { useState } from "react";
import { Table, Button, Modal, Select } from "antd";
import { getData, setData } from "@/utils/storage";

export default function ThanhVien() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const clb = getData("clb") as any[];
  const don = getData("don") as any[];

  const members = don.filter((i: any) => i.trangThai === "Approved");

  const handleChange = (clbId: any) => {
    const newData = don.map((i: any) =>
      selectedRowKeys.includes(i.id) ? { ...i, clbId } : i
    );
    setData("don", newData);
    window.location.reload();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Đổi CLB ({selectedRowKeys.length})
      </Button>

      <Table
        rowKey="id"
        dataSource={members}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys as any[]),
        }}
        columns={[
          { title: "Tên", dataIndex: "hoTen" },
          { title: "Email", dataIndex: "email" },
        ]}
      />

      <Modal visible={open} footer={null} onCancel={() => setOpen(false)}>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange}
          options={clb.map((c: any) => ({
            label: c.ten,
            value: c.id,
          }))}
        />
      </Modal>
    </>
  );
}