// @ts-nocheck
import React, { useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import { getData, setData } from "@/utils/storage";

export default function DonDangKy() {
  const [data, setList] = useState(getData("don"));
  const clb = getData("clb");

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openReject, setOpenReject] = useState(false);
  const [reason, setReason] = useState("");

  const updateStatus = (status: string) => {
    const newData = data.map((i: any) => {
      if (selectedRowKeys.includes(i.id)) {
        return {
          ...i,
          trangThai: status,
          ghiChu: status === "Rejected" ? reason : "",
          history: [
            ...(i.history || []),
            `${status} - ${new Date().toLocaleString()}`
          ],
        };
      }
      return i;
    });

    setList(newData);
    setData("don", newData);
    setSelectedRowKeys([]);
    setReason("");
    setOpenReject(false);
  };

  return (
    <>
      <Button onClick={() => updateStatus("Approved")}>
        Duyệt ({selectedRowKeys.length})
      </Button>

      <Button danger onClick={() => setOpenReject(true)}>
        Từ chối ({selectedRowKeys.length})
      </Button>

      <Table
        rowKey="id"
        dataSource={data}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        columns={[
          { title: "Họ tên", dataIndex: "hoTen" },
          { title: "Email", dataIndex: "email" },
          { title: "SĐT", dataIndex: "sdt" },
          {
            title: "CLB",
            render: (_: any, r: any) => {
              const found = clb.find((c: any) => c.id === r.clbId);
              return found ? found.ten : "";
            },
          },
          { title: "Trạng thái", dataIndex: "trangThai" },
          {
            title: "Lịch sử",
            render: (_: any, r: any) => (
              <Button
                onClick={() =>
                  Modal.info({
                    title: "Lịch sử thao tác",
                    content: (
                      <div>
                        {(r.history || []).map((h: string, i: number) => (
                          <div key={i}>{h}</div>
                        ))}
                      </div>
                    ),
                  })
                }
              >
                Xem
              </Button>
            ),
          },
        ]}
      />

      <Modal
        visible={openReject}
        onOk={() => {
          if (!reason) return message.error("Nhập lý do");
          updateStatus("Rejected");
        }}
        onCancel={() => setOpenReject(false)}
      >
        <Input
          placeholder="Nhập lý do từ chối"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
    </>
  );
}