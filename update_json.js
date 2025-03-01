const fs = require('fs');

const outputPath = 'recipes_converted.json';

// Пример формата данных (замени на свои данные)
const formattedRecipes = {
    updated: new Date().toISOString(),
    recipes: [
        { name: "Каменный меч", ingredients: ["палка", "булыжник", "булыжник"] },
        { name: "Железный меч", ingredients: ["палка", "железный слиток", "железный слиток"] }
    ]
};

// Проверка прав доступа перед записью
fs.access(outputPath, fs.constants.W_OK, (err) => {
    if (err) {
        console.error(`❌ Ошибка: Нет прав на запись в ${outputPath}`);
        process.exit(1); // Прерываем выполнение скрипта
    } else {
        console.log(`✅ Доступ на запись в ${outputPath} есть`);
        
        // Записываем данные в JSON
        fs.writeFileSync(outputPath, JSON.stringify(formattedRecipes, null, 4), 'utf-8');
        console.log("✅ recipes_converted.json успешно создан!");
    }
});