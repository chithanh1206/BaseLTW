import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Space } from 'antd';
import { getTags, saveTags, getPosts } from './data';

export default () => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    setData(getTags());
  }, []);

  const reload = () => setData(getTags());

  const handleSave = () => {
    let list = getTags();

    if (editing) {
      list = list.map(item =>
        item.id === editing.id ? { ...item, name } : item
      );
    } else {
      list.push({
        id: Date.now().toString(),
        name
      });
    }

    saveTags(list);
    reload();
    setVisible(false);
    setName('');
    setEditing(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => setVisible(true)}>Thêm tag</Button>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: 'Tên tag', dataIndex: 'name' },
          {
            title: 'Số bài',
            render: (_: any, record: any) =>
              getPosts().filter(post => post.tags.includes(record.name)).length
          },
          {
            title: 'Action',
            render: (_: any, record: any) => (
              <Space>
                <Button onClick={() => {
                  setEditing(record);
                  setName(record.name);
                  setVisible(true);
                }}>Sửa</Button>

                <Button danger onClick={() => {
                  saveTags(getTags().filter(t => t.id !== record.id));
                  reload();
                }}>Xóa</Button>
              </Space>
            )
          }
        ]}
      />

      <Modal
        visible={visible}
        onOk={handleSave}
        onCancel={() => setVisible(false)}
      >
        <Input value={name} onChange={e => setName(e.target.value)} />
      </Modal>
    </div>
  );
};