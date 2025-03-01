const fs = require('fs');

// Загружаем переведённые ID предметов
const itemIDs = JSON.parse(fs.readFileSync('item_ids.json', 'utf-8'));

// Загружаем исходный recipes.json (с ID)
const rawData = JSON.parse(fs.readFileSync('recipes.json', 'utf-8'));

const formattedRecipes = {};

for (const itemId in rawData) {
    const itemData = rawData[itemId][0]; // Берём первый рецепт предмета
    const resultId = itemData.result.id;

    // Получаем русское название предмета
    const resultName = itemIDs[resultId] || `id_${resultId}`;

    const ingredients = [];
    
    // Преобразуем `inShape` (матрицу рецепта) в список ингредиентов
    if (itemData.inShape) {
        itemData.inShape.flat().forEach(id => {
            if (id !== null) {
                ingredients.push(itemIDs[id] || `id_${id}`);
            }
        });
    }

    // Добавляем рецепт в новый JSON
    formattedRecipes[resultName] = {
        "ingredients": ingredients,
        "image": `images/${resultName}.png`
    };
}

// Записываем новый JSON (готов для бота)
fs.writeFileSync('recipes_converted.json', JSON.stringify(formattedRecipes, null, 4), 'utf-8');

console.log("✅ Файл recipes_converted.json успешно создан!");