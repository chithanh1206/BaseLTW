import { Button } from "antd";
import { history } from "umi";

export default function TH02() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Bài thực hành 02</h1>

      <Button
        type="primary"
        onClick={() => history.push("/TH02/oantuti")}
        style={{ marginRight: 10 }}
      >
        Bài 1: Oẳn Tù Tì
      </Button>

      <Button
        type="primary"
        onClick={() => history.push("/TH02/cauhoi")}
      >
        Bài 2: Ngân hàng câu hỏi
      </Button>
    </div>
  );
}