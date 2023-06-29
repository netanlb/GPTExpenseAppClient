export interface IExpense {
  _id?: string;
  sum: number | null;
  description: string;
  category: string;
  date: Date;
}
