import React from 'react';
import { Card } from 'antd';

export default () => (
  <Card style={{ width: 500, margin: '20px auto' }}>
    <img
      src="https://i.pravatar.cc/150"
      width="120"
      style={{ borderRadius: '50%' }}
    />
    <h2>Lương Lê Chí Thanh</h2>
    <p>Frontend Developer</p>
    <p>Kỹ năng: ReactJS, TypeScript, Ant Design</p>
    <p>Facebook: Chi Thanh</p>
  </Card>
);