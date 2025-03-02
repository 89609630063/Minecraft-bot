const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'recipes_converted.json');

// 📌 Создаем новый объект с рецептами
const newRecipes = {
    "Каменный меч": {
        "ingredients": ["палка", "булыжник", "булыжник"],
        "image": "images/stone_sword.png"
    },
    "Железный меч": {
        "ingredients": ["палка", "железный слиток", "железный слиток"],
        "image": "images/iron_sword.png"
    }
};

// ✅ Перезаписываем JSON-файл принудительно
fs.writeFileSync(jsonPath, JSON.stringify(newRecipes, null, 4), 'utf-8');
console.log("✅ JSON-файл успешно обновлен!");