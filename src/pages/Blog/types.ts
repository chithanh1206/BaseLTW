export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail: string;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  createdAt: string;
}

export interface TagItem {
  id: string;
  name: string;
}