export type News = {
  id: number;
  name: string;
  description: string;
  type: string;
  date: string;
  viewsCount: number;
  commentsCount: number;
};

export type NewsState = {
  loadNews: boolean;
  page: number;
  display: number;
  type: string;
  articleNews: News;
  sortedNews: News[];
  newsData: News[];
};
