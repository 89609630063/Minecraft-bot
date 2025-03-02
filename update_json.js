const fs = require('fs');

const inputPath = 'recipes.json'; // Исходный файл
const outputPath = 'recipes_converted.json'; // Файл, который бот использует

// Читаем `recipes.json`
try {
    const rawData = fs.readFileSync(inputPath, 'utf-8');
    const recipes = JSON.parse(rawData);

    console.log("🔄 Конвертируем `recipes.json` → `recipes_converted.json`...");

    // Новый формат JSON
    let formattedRecipes = [];

    // Обходим все рецепты
    for (let key in recipes) {
        if (recipes.hasOwnProperty(key)) {
            const recipe = recipes[key];

            // Проверяем, есть ли у рецепта ингредиенты
            if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
                formattedRecipes.push({
                    name: key,
                    ingredients: recipe.ingredients.map(i => i.item) // Достаём названия предметов
                });
            }
        }
    }

    // Проверяем права перед записью
    fs.access(outputPath, fs.constants.W_OK, (err) => {
        if (err) {
            console.error(`❌ Ошибка: Нет прав на запись в ${outputPath}`);
            process.exit(1);
        } else {
            console.log(`✅ Доступ на запись в ${outputPath} есть`);

            // Записываем в `recipes_converted.json`
            fs.writeFileSync(outputPath, JSON.stringify(formattedRecipes, null, 4), 'utf-8');
            console.log("✅ recipes_converted.json успешно обновлён!");
        }
    });

} catch (error) {
    console.error("❌ Ошибка обработки JSON:", error.message);
}