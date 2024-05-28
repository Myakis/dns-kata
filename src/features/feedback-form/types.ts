export type TForm = {
  chapter: string;
  theme: string;
  name: string;
  city: string;
  email: string;
  phone: number;
  message: string;
  photo: object | null;
  multipleErrorInput: string;
};

export interface IForm {
  dataThemes: { theme: string; sections: string[] }[];
  currentChapter: string;
}
