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
  page: number;
  display: number;
  type: string;
  sortedNews: News[];
  newsData: News[];
};
