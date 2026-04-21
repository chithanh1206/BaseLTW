import React, { useEffect, useState } from 'react';
import { Button, Tag, Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import { useParams, history } from 'umi';
import { getPosts, savePosts } from './data';

export default () => {
  const { slug }: any = useParams();
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    const list = getPosts();
    const found = list.find(item => item.slug === slug);

    if (found) {
      found.views += 1;
      savePosts([...list]);
      setPost(found);

      const sameTags = list.filter(item =>
        item.id !== found.id &&
        item.tags.some((tag: string) => found.tags.includes(tag))
      );

      setRelated(sameTags);
    }
  }, []);

  if (!post) return null;

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => history.push('/blog')}>Quay lại</Button>

      <h1>{post.title}</h1>
      <p>{post.author} - {post.createdAt}</p>
      <p>Lượt xem: {post.views}</p>

      {post.tags.map((tag: string) => (
        <Tag key={tag}>{tag}</Tag>
      ))}

      <img src={post.thumbnail} width="100%" />

      <ReactMarkdown>{post.content}</ReactMarkdown>

      <h3>Bài viết liên quan</h3>
      {related.map(item => (
        <Card
          key={item.id}
          style={{ marginBottom: 10 }}
          onClick={() => history.push(`/blog/${item.slug}`)}
        >
          {item.title}
        </Card>
      ))}
    </div>
  );
};