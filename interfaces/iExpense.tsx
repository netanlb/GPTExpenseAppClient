export interface IExpense {
  id: string | null;
  cost: number | null;
  name: string;
  category: string;
  date: Date;
}
