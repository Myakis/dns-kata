export type rateListStyles = {
  star: string;
  halfStar: string;
  emptyStar: string;
};

export type productData = {
  code: string | number;
  photo?: string;
  name?: string;
  vobler?: {
    text: string;
    color?: string;
  };
  statistic?: {
    rate: number;
    reviews: number;
    comments: number;
  };
  price?: {
    price: number;
    sale?: number;
  };
  avails?: {
    shops: number;
    pvz?: boolean;
    delivery?: string;
  };
};
