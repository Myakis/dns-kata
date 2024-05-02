export interface StatTypes {
  fullConfig?: boolean;
  stat: {
    date: string;
    viewsCount: number;
    commentsCount?: number | null;
  };
}
