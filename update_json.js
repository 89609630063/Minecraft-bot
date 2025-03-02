const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, "data"); // Локальная папка
const outputPath = path.join(outputDir, "recipes_converted.json");

// ✅ Проверяем, есть ли папка "data", если нет — создаём её
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 🔄 Данные для сохранения (замени на свои)
const formattedRecipes = {
    updated: new Date().toISOString(),
    recipes: [
        { name: "Каменный меч", ingredients: ["палка", "булыжник", "булыжник"] },
        { name: "Железный меч", ingredients: ["палка", "железный слиток", "железный слиток"] }
    ]
};

// ✅ Записываем JSON в локальную папку
fs.writeFileSync(outputPath, JSON.stringify(formattedRecipes, null, 4), 'utf-8');
console.log(`✅ JSON обновлён и сохранён локально: ${outputPath}`);