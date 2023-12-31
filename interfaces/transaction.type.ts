export interface Transaction {
  _id?: string;
  sum: number | null;
  description: string;
  category: string;
  date: Date | null;
  transactionType: "income" | "expense" | "saving";
}
