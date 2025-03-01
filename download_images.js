const fs = require('fs');
const path = require('path');
const axios = require('axios');

// ✅ Список предметов, которые нужно скачать (добавь нужные)
const items = ["stick", "cobblestone", "iron_ingot", "diamond_sword", "golden_apple"];

// ✅ Функция для загрузки изображения
const downloadImage = async (item) => {
    // Формируем URL на Minecraft Wiki
    const url = `https://minecraft.wiki/images/${item}.png`;
    const imagePath = path.join(__dirname, "images", `${item}.png`);

    try {
        console.log(`🔄 Загружаем: ${url}`);
        const response = await axios({ url, responseType: 'stream' });

        // Сохраняем изображение в папку images/
        response.data.pipe(fs.createWriteStream(imagePath));
        
        console.log(`✅ Изображение ${item}.png скачано!`);
    } catch (error) {
        console.error(`❌ Ошибка загрузки ${item}.png:`, error.message);
    }
};

// ✅ Создаём папку, если её нет
if (!fs.existsSync("images")) {
    fs.mkdirSync("images");
}

// ✅ Загружаем все изображения
items.forEach(downloadImage);
