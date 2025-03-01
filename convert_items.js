const fs = require('fs');

// Загружаем items.json
const rawData = JSON.parse(fs.readFileSync('items.json', 'utf-8'));

// Создаём пустой объект для ID → Название
const itemIDs = {};

// Преобразуем данные
rawData.forEach(item => {
    itemIDs[item.id] = item.displayName; // Берём читаемое название
});

// Сохраняем новый JSON
fs.writeFileSync('item_ids.json', JSON.stringify(itemIDs, null, 4), 'utf-8');
console.log("✅ Файл item_ids.json успешно создан!");