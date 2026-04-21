import { BlogPost, TagItem } from './types';

export const getPosts = (): BlogPost[] =>
  JSON.parse(localStorage.getItem('posts') || '[]');

export const savePosts = (data: BlogPost[]) =>
  localStorage.setItem('posts', JSON.stringify(data));

export const getTags = (): TagItem[] =>
  JSON.parse(localStorage.getItem('tags') || '[]');

export const saveTags = (data: TagItem[]) =>
  localStorage.setItem('tags', JSON.stringify(data));

export const initSampleData = () => {
  const oldPosts = localStorage.getItem('posts');

  if (!oldPosts) {
    const samplePosts: BlogPost[] = [
      {
        id: '1',
        title: 'Học React cơ bản',
        slug: 'hoc-react-co-ban',
        summary: 'Bắt đầu làm quen với ReactJS cho người mới.',
        content: '# React cơ bản\nReact là thư viện JavaScript phổ biến.',
        thumbnail: 'https://picsum.photos/400/200?1',
        author: 'Admin',
        tags: ['React', 'Frontend'],
        status: 'published',
        views: 0,
        createdAt: '21/04/2026',
      },
      {
        id: '2',
        title: 'TypeScript là gì?',
        slug: 'typescript-la-gi',
        summary: 'Tìm hiểu TypeScript trong React.',
        content: '# TypeScript\nTypeScript giúp code an toàn hơn.',
        thumbnail: 'https://picsum.photos/400/200?2',
        author: 'Admin',
        tags: ['TypeScript'],
        status: 'published',
        views: 0,
        createdAt: '21/04/2026',
      },
      {
        id: '3',
        title: 'State trong React',
        slug: 'state-trong-react',
        summary: 'Hiểu về useState trong React.',
        content: '# useState\nDùng để quản lý state.',
        thumbnail: 'https://picsum.photos/400/200?3',
        author: 'Admin',
        tags: ['React'],
        status: 'published',
        views: 0,
        createdAt: '21/04/2026',
      },
    ];

    const sampleTags: TagItem[] = [
      { id: '1', name: 'React' },
      { id: '2', name: 'Frontend' },
      { id: '3', name: 'TypeScript' },
    ];

    savePosts(samplePosts);
    saveTags(sampleTags);
  }
};