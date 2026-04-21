import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Tag, Input, Pagination } from 'antd';
import { history } from 'umi';
import { getPosts, initSampleData } from './data';
import { BlogPost } from './types';

const BlogHome = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filtered, setFiltered] = useState<BlogPost[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    initSampleData();
    const data = getPosts().filter(p => p.status === 'published');
    setPosts(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      let result = posts;

      if (keyword) {
        result = result.filter(item =>
          item.title.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      if (selectedTag) {
        result = result.filter(item =>
          item.tags.includes(selectedTag)
        );
      }

      setFiltered(result);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, selectedTag, posts]);

  const pageData = filtered.slice((page - 1) * 9, page * 9);

  return (
    <div style={{ padding: 20 }}>
      <Input
        placeholder="Tìm bài viết"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      <Row gutter={[16, 16]}>
        {pageData.map(item => (
          <Col span={8} key={item.id}>
            <Card
              hoverable
              cover={<img src={item.thumbnail} height={200} />}
              onClick={() => history.push(`/blog/${item.slug}`)}
            >
              <Card.Meta
                title={item.title}
                description={item.summary}
              />

              <p>{item.author} - {item.createdAt}</p>

              {item.tags.map(tag => (
                <Tag key={tag} onClick={() => setSelectedTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={page}
        total={filtered.length}
        pageSize={9}
        onChange={setPage}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default BlogHome;