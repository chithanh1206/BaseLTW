import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space } from 'antd';

interface KhoaHoc {
  id: string;
  ten: string;
  giangVien: string;
  soLuong: number;
  moTa: string;
  trangThai: 'dang_mo' | 'tam_dung' | 'da_ket_thuc';
}
const getData = (): KhoaHoc[] =>
  JSON.parse(localStorage.getItem('khoahoc') || '[]');

const setData = (data: KhoaHoc[]) =>
  localStorage.setItem('khoahoc', JSON.stringify(data));

const KhoaHocPage = () => {
  const [data, setDataState] = useState<KhoaHoc[]>([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<KhoaHoc | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setDataState(getData());
  }, []);
const columns = [
    {
      title: 'Tên khóa học',
      dataIndex: 'ten',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'giangVien',
    },
    {
      title: 'Số lượng',
      dataIndex: 'soLuong',
      sorter: (a: KhoaHoc, b: KhoaHoc) => a.soLuong - b.soLuong,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      render: (val: string) => {
        if (val === 'dang_mo') return 'Đang mở';
        if (val === 'tam_dung') return 'Tạm dừng';
        return 'Đã kết thúc';
      },
    },
    {
      title: 'Hành động',
      render: (_: any, record: KhoaHoc) => (
        <Space>
          <Button
            onClick={() => {
              setEditing(record);
              form.setFieldsValue(record);
              setVisible(true);
            }}
          >
            Sửa
          </Button>

          <Button danger onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
const handleDelete = (record: KhoaHoc) => {
    if (record.soLuong > 0) {
      message.error('Không thể xóa vì đã có học viên');
      return;
    }

    Modal.confirm({
      title: 'Bạn chắc chắn muốn xóa?',
      onOk: () => {
        const list = getData().filter((item) => item.id !== record.id);
        setData(list);
        setDataState(list);
        message.success('Xóa thành công');
      },
    });
  };
const handleSubmit = (values: any) => {
    if (!values.ten) {
      message.error('Tên không được để trống');
      return;
    }

    let list = getData();

    if (editing) {
      list = list.map((item) =>
        item.id === editing.id ? { ...item, ...values } : item
      );
      message.success('Cập nhật thành công');
    } else {
      const newItem = {
        ...values,
        id: Date.now().toString(),
      };
      list.push(newItem);
      message.success('Thêm thành công');
    }

    setData(list);
    setDataState(list);
    setVisible(false);
    setEditing(null);
    form.resetFields();
  };
 const handleSearch = (value: string) => {
    const list = getData().filter((item) =>
      item.ten.toLowerCase().includes(value.toLowerCase())
    );
    setDataState(list);
  };

  const handleFilterGV = (value: string) => {
    const list = getData().filter((item) => item.giangVien === value);
    setDataState(list);
  };

  const handleFilterStatus = (value: string) => {
    const list = getData().filter((item) => item.trangThai === value);
    setDataState(list);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý khóa học</h2>

      {/* TOOLBAR */}
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm khóa học"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />

        <Select
          placeholder="Giảng viên"
          style={{ width: 150 }}
          onChange={handleFilterGV}
          allowClear
        >
          <Select.Option value="GV1">GV1</Select.Option>
          <Select.Option value="GV2">GV2</Select.Option>
        </Select>

        <Select
          placeholder="Trạng thái"
          style={{ width: 150 }}
          onChange={handleFilterStatus}
          allowClear
        >
          <Select.Option value="dang_mo">Đang mở</Select.Option>
          <Select.Option value="tam_dung">Tạm dừng</Select.Option>
          <Select.Option value="da_ket_thuc">Đã kết thúc</Select.Option>
        </Select>

        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
            setEditing(null);
            form.resetFields();
          }}
        >
          Thêm khóa học
        </Button>

        <Button
          onClick={() => {
            setDataState(getData());
          }}
        >
          Reset
        </Button>
      </Space>

      {/* TABLE */}
      <Table dataSource={data} columns={columns} rowKey="id" />

      {/* MODAL */}
      <Modal
        title={editing ? 'Sửa khóa học' : 'Thêm khóa học'}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setEditing(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="ten"
            label="Tên khóa học"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input maxLength={100} />
          </Form.Item>

          <Form.Item name="giangVien" label="Giảng viên">
            <Select>
              <Select.Option value="GV1">GV1</Select.Option>
              <Select.Option value="GV2">GV2</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="soLuong" label="Số lượng học viên">
            <Input type="number" min={0} />
          </Form.Item>

          <Form.Item name="moTa" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="trangThai" label="Trạng thái">
            <Select>
              <Select.Option value="dang_mo">Đang mở</Select.Option>
              <Select.Option value="tam_dung">Tạm dừng</Select.Option>
              <Select.Option value="da_ket_thuc">Đã kết thúc</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KhoaHocPage;