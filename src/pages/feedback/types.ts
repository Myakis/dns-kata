export type TFeedbackForm = {
  theme: string;
  name: string;
  email: string;
  phone: number;
  message: string;
  city: string;
  photo: any;
};

export interface IFeedbackForm {
  data: { theme: string; sections: string[] }[];
  currentChapter: string;
}
