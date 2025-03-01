const fs = require('fs');

const recipesPath = 'recipes.json';
const itemsPath = 'item_ids.json';
const outputPath = 'recipes_converted.json';

// Проверяем, существуют ли файлы
if (!fs.existsSync(recipesPath)) {
    console.error("❌ Ошибка: Файл recipes.json отсутствует!");
    process.exit(1);
}

if (!fs.existsSync(itemsPath)) {
    console.error("❌ Ошибка: Файл item_ids.json отсутствует!");
    process.exit(1);
}

// Загружаем JSON
const itemIDs = JSON.parse(fs.readFileSync(itemsPath, 'utf-8'));
const rawRecipes = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));

const formattedRecipes = {};

// Обрабатываем рецепты
for (const itemId in rawRecipes) {
    const itemData = rawRecipes[itemId][0];
    if (!itemData || !itemData.result) continue;

    const resultId = itemData.result.id;
    const resultName = itemIDs[resultId] || `id_${resultId}`;

    const ingredients = [];
    if (itemData.inShape) {
        itemData.inShape.flat().forEach(id => {
            if (id !== null) {
                ingredients.push(itemIDs[id] || `id_${id}`);
            }
        });
    }

    if (ingredients.length > 0) {
        formattedRecipes[resultName] = {
            "ingredients": ingredients,
            "image": `images/${resultName}.png`
        };
    }
}

// Проверяем, записались ли данные
if (Object.keys(formattedRecipes).length === 0) {
    console.error("❌ Ошибка: recipes_converted.json пуст!");
    process.exit(1);
}

// Записываем в файл
fs.writeFileSync(outputPath, JSON.stringify(formattedRecipes, null, 4), 'utf-8');
console.log("✅ recipes_converted.json успешно создан!");