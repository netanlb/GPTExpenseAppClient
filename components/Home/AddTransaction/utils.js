function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSum() {
  // assuming the sum is a random number between 10 and 500
  return parseFloat((Math.random() * 490 + 10).toFixed(2));
}

function getRandomDate() {
  const start = new Date(2023, 4, 1); // May 1, 2023
  const end = new Date(2023, 6, 31); // July 31, 2023
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function generateExpenses(numExpenses) {
  const expenses = [];
  const categories = {
    Housing: ["mortgage", "rent", "New furniture", "real estate tax"],
    Utilities: ["Electricity bill", "Water bill", "Internet bill"],
    Food: ["Grocery shopping", "Restaurant", "Takeout"],
    Transportation: [
      "Filled up Gas tank",
      "Public transportation",
      "Car insurance",
      "Car repairs",
    ],
    Healthcare: ["Doctor", "Prescription medicine", "Health insurance"],
    Education: ["Tuition", "Textbooks", "Online course"],
    Entertainment: ["Movie theatre", "Video game", "Concert"],
    "Personal Care": ["Salon", "Skincare products", "Spa"],
    Clothing: ["New shirt", "New shoes", "New dress"],
    Other: ["Gift", "Charity donation", "Taxes"],
  };

  for (let i = 0; i < numExpenses; i++) {
    const category =
      Object.keys(categories)[
        getRandomInt(0, Object.keys(categories).length - 1)
      ];
    const description =
      categories[category][getRandomInt(0, categories[category].length - 1)];
    const sum = getRandomSum();
    const date = getRandomDate();

    expenses.push({
      category,
      sum,
      date,
      description,
    });
  }

  return expenses;
}
