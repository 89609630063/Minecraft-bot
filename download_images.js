const fs = require('fs');
const path = require('path');
const axios = require('axios');

const items = ["stick", "cobblestone", "iron_ingot", "diamond_sword", "golden_apple"];

const downloadImage = async (item) => {
    const url = `https://minecraft.wiki/images/${item}.png`;
    const imagePath = path.join(__dirname, "images", `${item}.png`);

    try {
        console.log(`🔄 Загружаем: ${url}`);
        const response = await axios({ url, responseType: 'stream' });

        await new Promise((resolve, reject) => {
            const stream = response.data.pipe(fs.createWriteStream(imagePath));
            stream.on('finish', resolve);
            stream.on('error', reject);
        });

        console.log(`✅ Изображение ${item}.png скачано!`);
    } catch (error) {
        console.error(`❌ Ошибка загрузки ${item}.png:`, error.message);
    }
};

if (!fs.existsSync("images")) {
    fs.mkdirSync("images");
}

(async () => {
    for (const item of items) {
        await downloadImage(item);
    }
    console.log("🎉 Все изображения загружены!");
})();
