const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'recipes_converted.json'); // Файл хранится ЛОКАЛЬНО

// ✅ Если папки нет — создаём её
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// ✅ Добавляем тестовые рецепты (замени на реальные)
const formattedRecipes = {
    updated: new Date().toISOString(),
    recipes: [
        { name: "Каменный меч", ingredients: ["палка", "булыжник", "булыжник"] },
        { name: "Железный меч", ingredients: ["палка", "железный слиток", "железный слиток"] },
        { name: "Деревянная кирка", ingredients: ["палка", "палка", "доски", "доски", "доски"] }
    ]
};

// ✅ Записываем JSON-файл локально
fs.writeFileSync(outputPath, JSON.stringify(formattedRecipes, null, 4), 'utf-8');
console.log("✅ recipes_converted.json УСПЕШНО обновлён!");