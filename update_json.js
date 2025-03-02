const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'data/recipes_converted.json');

// Создаём папку, если её нет
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// Пример данных (замени на свои)
const formattedRecipes = {
    updated: new Date().toISOString(),
    recipes: [
        { name: "Каменный меч", ingredients: ["палка", "булыжник", "булыжник"] },
        { name: "Железный меч", ingredients: ["палка", "железный слиток", "железный слиток"] }
    ]
};

// Записываем JSON
fs.writeFileSync(outputPath, JSON.stringify(formattedRecipes, null, 4), 'utf-8');
console.log("✅ recipes_converted.json успешно создан!");