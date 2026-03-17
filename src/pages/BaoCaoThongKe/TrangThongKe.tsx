import { Card, Table } from "antd";
import { lichHen, dichVu, nhanVien } from "@/services/data";

export default function TrangThongKe() {

  const theoNgay = () => {
    const map:any = {};

    lichHen.forEach(l => {
      map[l.bd] = (map[l.bd] || 0) + 1;
    });

    return Object.keys(map).map(k => ({
      ngay: k,
      sl: map[k]
    }));
  };

  const doanhThu = () => {
    return nhanVien.map(n => {
      let total = 0;

      lichHen.forEach(l => {
        if (l.nv === n.id && l.tt === "xong") {
          const dv = dichVu.find(d => d.id === l.dv);
          total += dv?.gia || 0;
        }
      });

      return { ten: n.ten, tien: total };
    });
  };

  return (
    <div>
      <Card title="Theo ngày">
        <Table dataSource={theoNgay()} rowKey="ngay"
          columns={[
            { title: "Ngày", dataIndex: "ngay" },
            { title: "SL", dataIndex: "sl" }
          ]}
        />
      </Card>

      <Card title="Doanh thu" style={{ marginTop: 20 }}>
        <Table dataSource={doanhThu()} rowKey="ten"
          columns={[
            { title: "Nhân viên", dataIndex: "ten" },
            { title: "Tiền", dataIndex: "tien" }
          ]}
        />
      </Card>
    </div>
  );
}