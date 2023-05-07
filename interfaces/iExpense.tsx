export interface IExpense {
  expenseId: string | null;
  cost: number;
  name: string;
  category: string;
  date: Date;
}
