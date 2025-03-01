const fs = require('fs');
const translate = require('@vitalets/google-translate-api');

async function translateItems() {
    const rawData = JSON.parse(fs.readFileSync('items.json', 'utf-8'));
    const translatedItems = {};

    for (let item of rawData) {
        const englishName = item.displayName;
        try {
            // Переводим название на русский
            const translated = await translate(englishName, { from: 'en', to: 'ru' });

            // Сохраняем в новый JSON
            translatedItems[item.id] = translated.text;
            console.log(`✅ ${englishName} → ${translated.text}`);
        } catch (error) {
            console.log(`❌ Ошибка перевода ${englishName}`);
            translatedItems[item.id] = englishName; // Если ошибка, оставляем английский
        }
    }

    // Сохраняем переведённые названия
    fs.writeFileSync('item_ids.json', JSON.stringify(translatedItems, null, 4), 'utf-8');
    console.log("✅ Файл item_ids.json успешно создан!");
}

// Запускаем перевод
translateItems();