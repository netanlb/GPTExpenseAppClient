import { IExpense } from "./interfaces/iExpense";

export function generateExpenses(): IExpense[] {
  function getRandomCategory() {
    const categories = [
      "Clothing",
      "Electronics",
      "Groceries",
      "Entertainment",
      "Utilities",
      "Travel",
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  }
  function getRandomName(category: string) {
    const names: { [key: string]: string[] } = {
      Clothing: ["New shirt", "New pants", "New shoes"],
      Electronics: ["New laptop", "New phone", "New headphones"],
      Groceries: ["Milk", "Bread", "Eggs"],
      Entertainment: ["Movie ticket", "Concert ticket", "Theater ticket"],
      Utilities: ["Electricity bill", "Water bill", "Gas bill"],
      Travel: ["Flight ticket", "Train ticket", "Bus ticket"],
    };

    return names[category][Math.floor(Math.random() * names[category].length)];
  }

  function getRandomCost(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const items = [];

  for (let i = 1; i <= 100; i++) {
    const category = getRandomCategory();
    const name = getRandomName(category);
    const cost = getRandomCost(1, 500); // You can adjust the range for the random cost here

    items.push({
      expenseId: i.toString(),
      cost: cost,
      name: name,
      category: category,
      date: new Date(),
    });
  }

  return items;
}
